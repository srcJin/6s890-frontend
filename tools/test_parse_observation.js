// Quick Node script to test parseObservationForBoard sanitization
const path = require('path');
const fs = require('fs');

// This test POSTs to the local inference server /step endpoint,
// extracts the first agent's observation, runs a sanitizing parser
// (same heuristics as in src/components/Utils.js), and prints a
// compact board summary so we can verify frontend parsing.
const { execSync } = require('child_process');

const buildingNames = {"0":"Empty","1":"Water","2":"Land","3":"House","4":"Shop","5":"GreenPark","6":"CommunityHub","7":"SolarGrid","8":"FloodBarrier"};

function fetchStep() {
  try {
    const out = execSync("curl -s -X POST -H \"Content-Type: application/json\" -d '{}' http://127.0.0.1:5888/step", { timeout: 15000 });
    return JSON.parse(out.toString());
  } catch (e) {
    console.error('Failed to call /step:', e.message);
    process.exit(1);
  }
}

const isKnownId = (v) => Object.keys(buildingNames).map(Number).includes(Number(v));

const sanitizeProjectId = (v) => {
  if (typeof v !== 'number') return v;
  if (isKnownId(v) || v === 0) return v;
  if (Math.abs(v) > 100) {
    const cand = Math.floor(v / 10);
    if (isKnownId(cand)) {
      console.warn(`Sanitized grid id ${v} -> ${cand}`);
      return cand;
    }
  }
  if (v < -1) {
    const cand = Math.sign(v) * Math.floor(Math.abs(v) / 10);
    if (cand === -1 || isKnownId(cand)) {
      console.warn(`Sanitized negative id ${v} -> ${cand}`);
      return cand;
    }
    console.warn(`Normalized unexpected negative id ${v} -> -1`);
    return -1;
  }
  console.warn(`Unknown grid id ${v} (no sanitization applied)`);
  return v;
};

const sanitizeBuilderVal = (v) => {
  if (typeof v !== 'number') return v;
  if (v === -1) return -1;
  if (v >= 0 && Number.isFinite(v)) return v;
  if (v < -1) {
    const cand = Math.sign(v) * Math.floor(Math.abs(v) / 10);
    if (cand === -1) {
      console.warn(`Sanitized builder val ${v} -> -1`);
      return -1;
    }
  }
  console.warn(`Normalized unexpected builder val ${v} -> -1`);
  return -1;
};

function parseObservationForBoard(observation) {
  const gridSize = 12 * 12;
  const gridDataSize = gridSize; // simplified
  const resourcesSize = 2;

  const buildersStart = gridDataSize + resourcesSize;
  const buildersEnd = buildersStart + gridSize;
  const buildingTypesStart = buildersEnd;
  const buildingTypesEnd = buildingTypesStart + gridSize;
  const gridLayoutStart = buildingTypesEnd;

  const buildersFlat = observation.slice(buildersStart, buildersEnd);
  const buildingTypesFlat = observation.slice(buildingTypesStart, buildingTypesEnd);
  const gridLayoutFlat = observation.slice(gridLayoutStart, gridLayoutStart + gridSize);

  // ORIGINAL (unsanitized) parsing logic used by the frontend before
  // we added any defensive heuristics. This mirrors exactly what the
  // UI does: it trusts gridLayout as authoritative and falls back to
  // buildingTypes; builder owner is derived plainly from the builder
  // index values.
  const board = [];
  let nonZeroCount = 0;
  for (let i = 0; i < 12; i++) {
    const row = [];
    for (let j = 0; j < 12; j++) {
      const builderVal = buildersFlat[i * 12 + j];
      const bType = buildingTypesFlat[i * 12 + j];
      const gridVal = gridLayoutFlat[i * 12 + j];

      // No sanitization here — use values directly
      const cellType = (gridVal || bType || 0);
      const cellOwner = builderVal === -1 ? null : `P${builderVal + 1}`;
      if (cellType !== 0) nonZeroCount += 1;
      row.push({ type: cellType, owner: cellOwner });
    }
    board.push(row);
  }

  return { board, nonZeroCount };
}

// Run
const res = fetchStep();

// Try to find an observation array in the returned JSON
let obsArray = null;
if (res && res.observation) {
  // case: response directly includes observation
  obsArray = res.observation[0] && res.observation[0][0] && res.observation[0][0][0] ? res.observation[0][0][0] : null;
}
if (!obsArray && res.episode_records && res.episode_records.length > 0) {
  const er = res.episode_records[0];
  obsArray = er.observation && er.observation[0] && er.observation[0][0] && er.observation[0][0][0] ? er.observation[0][0][0] : null;
}
if (!obsArray) {
  console.error('Could not locate first-agent observation in /step response');
  process.exit(1);
}

console.log('Observation length:', obsArray.length);
const parsed = parseObservationForBoard(obsArray);
console.log('Parsed board non-empty cells:', parsed.nonZeroCount);
console.log('Top-left cell:', parsed.board[0][0]);
console.log('Sample 3x3 corner:');
for (let i = 0; i < 3; i++) console.log(parsed.board[i].slice(0, 3));

// Create malformed observation: length ~1298 with chunks
const obs = new Array(1298).fill(0);
// Set builders slice to have -11 at position 0
const gridSize = 144;
const gridDataSize = gridSize; // simplified
const resourcesSize = 2;
const buildersStart = gridDataSize + resourcesSize;
obs[buildersStart + 0] = -11;
// Set building types slice to weird 1032
const buildingTypesStart = buildersStart + gridSize;
obs[buildingTypesStart + 0] = 1032;
// Set grid layout slice to 1033
const gridLayoutStart = buildingTypesStart + gridSize;
obs[gridLayoutStart + 0] = 1033;

console.log('Running parseObservationForBoard on malformed observation...');
const board = parseObservationForBoard(obs);
console.log('Top-left cell:', board[0][0]);
