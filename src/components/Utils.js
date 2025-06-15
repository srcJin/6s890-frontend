// src/components/Utils.js

// Initial dummy board (8x8 grid for scaled-up environment)
export const initialDummyBoard = [
  [
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
    { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 }, { owner: null, type: -1 },
  ],
];

// Mapping from building type to colors for urban resilience buildings
export const buildingColorMap = {
  [-1]: "bg-gray-100",      // Empty
  0: "bg-green-300",        // GreenPark - vibrant green for sustainability
  1: "bg-blue-300",         // ResilientHouse - blue for resilient housing
  2: "bg-orange-300",       // CommunityHub - orange for community gathering
  3: "bg-yellow-300",       // SolarGrid - yellow for solar energy
  4: "bg-purple-300",       // FloodBarrier - purple for protective infrastructure
  
  // Special terrain and infrastructure colors
  "terrain": "bg-gray-400", // Non-buildable terrain
  "infrastructure": "bg-red-400", // Pre-built infrastructure
};

// Building type names for display (urban resilience focused)
export const buildingNames = {
  0: "Green Park",
  1: "Resilient House", 
  2: "Community Hub",
  3: "Solar Grid",
  4: "Flood Barrier",
  "-1": "Empty",
};

// Terrain type symbols and descriptions
export const terrainTypes = {
  "River": { symbol: "~", color: "bg-blue-500", description: "Natural water body" },
  "Mountain": { symbol: "^", color: "bg-gray-600", description: "High elevation terrain" },
  "Lake": { symbol: "o", color: "bg-blue-400", description: "Water body" },
  "Highway": { symbol: "=", color: "bg-gray-500", description: "Major transportation" },
  "Railway": { symbol: "||", color: "bg-yellow-600", description: "Rail transportation" },
};

// Infrastructure type symbols and descriptions  
export const infrastructureTypes = {
  "Hospital": { symbol: "H", color: "bg-red-300", description: "Healthcare facility" },
  "School": { symbol: "E", color: "bg-green-400", description: "Educational institution" },
  "FireStation": { symbol: "F", color: "bg-red-500", description: "Emergency response" },
  "PowerPlant": { symbol: "P", color: "bg-yellow-500", description: "Power generation" },
};

// Player information for 4 players with urban resilience focus
export const players = {
  P1: { role: "Community-Focused Player", resources: { money: 80, reputation: 80 } },
  P2: { role: "Balanced Urban Planner", resources: { money: 80, reputation: 80 } },
  P3: { role: "Economic Efficiency Player", resources: { money: 80, reputation: 80 } },
  P4: { role: "Environmental Specialist", resources: { money: 80, reputation: 80 } },
};

/**
 * parseObservationForBoard extracts board information from observation for 8x8 grid.
 * The observation structure needs to be updated based on the new backend format.
 * For now, we'll handle both the old flat format and new structured format.
 */
export const parseObservationForBoard = (observation) => {
  console.log("Parsing observation for 8x8 board:", observation);
  
  // Handle structured observation format (dictionary-like)
  if (observation && typeof observation === 'object' && observation.builders && observation.building_types) {
    const builders = observation.builders;
    const buildingTypes = observation.building_types;
    
    const board = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        const builderVal = builders[i][j];
        const bType = buildingTypes[i][j];
        row.push({
          owner: builderVal === -1 ? null : `P${builderVal + 1}`,
          type: bType,
        });
      }
      board.push(row);
    }
    console.log("Parsed structured observation board:", board);
    return board;
  }
  
  // Handle flat observation format (array of numbers)
  if (Array.isArray(observation)) {
    // For 8x8 grid: expect different indices for builders and building_types
    // This will need to be adjusted based on actual backend observation format
    const expectedLength = 8 * 8 * 4 + 2 + 8 * 8 + 8 * 8; // grid + resources + builders + building_types
    
    if (observation.length >= expectedLength) {
      const gridSize = 8 * 8;
      const gridDataSize = gridSize * 4; // 4 parameters: S, W, R, C
      
      // Extract builders and building types from the flat array
      const buildersStart = gridDataSize + 2; // Skip grid data and resources
      const buildersFlat = observation.slice(buildersStart, buildersStart + gridSize);
      const buildingTypesFlat = observation.slice(buildersStart + gridSize, buildersStart + 2 * gridSize);
      
      const board = [];
      for (let i = 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 8; j++) {
          const builderVal = buildersFlat[i * 8 + j];
          const bType = buildingTypesFlat[i * 8 + j];
          row.push({
            owner: builderVal === -1 ? null : `P${builderVal + 1}`,
            type: bType,
          });
        }
        board.push(row);
      }
      console.log("Parsed flat observation board:", board);
      return board;
    }
  }
  
  console.warn("Could not parse observation, using dummy board");
  return initialDummyBoard;
};

export const parseAndDisplayInfo = (info) => {
  // 确保 info 是对象（如果是 JSON 字符串，则先解析）
  const parsedInfo = typeof info === "string" ? JSON.parse(info) : info;

  // 帮助函数：格式化 key 名称
  const formatKey = (key) => {
    if (key.endsWith("_reward")) {
      // 例如： "P1_reward" 变为 "Player 1 Reward"
      if (key.startsWith("P")) {
        const playerNum = key[1];
        return `Player ${playerNum} Reward`;
      }
    } else if (key === "common_reward_value") {
      return "Common Reward";
    } else if (key === "env_score") {
      return "Environment Score";
    } else if (key === "player_resources") {
      return "Player Resources";
    }
    return key;
  };

  return (
    <div>
      {Object.entries(parsedInfo).map(([key, value]) => {
        // Skip the player_resources key entirely
        if (key === "player_resources") {
          return null;
        }

        // 如果 value 是对象，则递归展示它的属性
        if (typeof value === "object" && value !== null) {
          return (
            <div key={key}>
              <strong>{formatKey(key)}</strong>:
              <div style={{ paddingLeft: "1em" }}>
                {Object.entries(value).map(([subKey, subValue]) => {
                  // 如果子值还是对象，可以继续递归（此处简单展示两层）
                  if (typeof subValue === "object" && subValue !== null) {
                    return (
                      <div key={subKey}>
                        <strong>{subKey}</strong>:
                        <pre>{JSON.stringify(subValue, null, 2)}</pre>
                      </div>
                    );
                  } else if (typeof subValue === "number") {
                    return (
                      <p key={subKey}>
                        <strong>{subKey}</strong>: {subValue.toFixed(2)}
                      </p>
                    );
                  } else {
                    return (
                      <p key={subKey}>
                        <strong>{subKey}</strong>: {subValue}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          );
        } else if (typeof value === "number") {
          return (
            <p key={key}>
              <strong>{formatKey(key)}</strong>: {value.toFixed(2)}
            </p>
          );
        } else {
          return (
            <p key={key}>
              <strong>{formatKey(key)}</strong>: {value}
            </p>
          );
        }
      })}
    </div>
  );
};

// Enhanced cell rendering function that handles terrain, infrastructure, and buildings
export const renderEnhancedCell = (cell, rowIndex, cellIndex, selectedParcel, onCellClick) => {
  // Check for terrain or infrastructure based on cell properties
  let cellContent = "";
  let bgClass = "bg-gray-100";
  let cellName = "Empty";
  let isClickable = true;
  
  // Handle terrain (non-buildable areas)
  if (cell.terrain) {
    const terrain = terrainTypes[cell.terrain];
    if (terrain) {
      cellContent = terrain.symbol;
      bgClass = terrain.color;
      cellName = cell.terrain;
      isClickable = false;
    }
  }
  // Handle infrastructure (pre-built)
  else if (cell.infrastructure) {
    const infra = infrastructureTypes[cell.infrastructure];
    if (infra) {
      cellContent = infra.symbol;
      bgClass = infra.color;
      cellName = cell.infrastructure;
      isClickable = false;
    }
  }
  // Handle buildings
  else if (cell.type !== -1) {
    cellName = buildingNames[cell.type.toString()] || `Type ${cell.type}`;
    bgClass = buildingColorMap[cell.type] || "bg-gray-100";
    isClickable = false;
  }

  const highlight = selectedParcel && 
    selectedParcel.x === rowIndex && 
    selectedParcel.y === cellIndex ? "ring-2 ring-blue-500" : "";

  const clickHandler = isClickable && onCellClick ? 
    () => onCellClick(rowIndex, cellIndex, cell) : 
    () => {};

  return (
    <td
      key={`cell-${rowIndex}-${cellIndex}`}
      className={`w-16 h-16 border border-gray-300 text-center ${bgClass} ${highlight} ${isClickable ? 'cursor-pointer hover:bg-opacity-80' : 'cursor-not-allowed'}`}
      onClick={clickHandler}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {cellContent && (
          <span className="text-lg font-bold text-white">{cellContent}</span>
        )}
        <span className="text-xs font-medium">{cellName}</span>
        {cell.owner && (
          <span className="text-xs text-gray-600">{cell.owner}</span>
        )}
      </div>
    </td>
  );
};

// Grid parameter display names for urban resilience metrics
export const gridParameterNames = {
  S: "Sustainability",
  W: "Well-being", 
  R: "Resilience",
  C: "Climate Adaptation"
};