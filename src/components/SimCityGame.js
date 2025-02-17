// src/components/SimCityGame.js

"use client";

import React, { useState, useEffect } from "react";

// Initial dummy board (used as fallback)
const initialDummyBoard = [
  [
    { owner: null, type: -1 },
    { owner: null, type: -1 },
    { owner: null, type: -1 },
    { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 },
    { owner: null, type: -1 },
    { owner: null, type: -1 },
    { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 },
    { owner: null, type: -1 },
    { owner: null, type: -1 },
    { owner: null, type: -1 },
  ],
  [
    { owner: null, type: -1 },
    { owner: null, type: -1 },
    { owner: null, type: -1 },
    { owner: null, type: -1 },
  ],
];

const players = {
  P1: { role: "Altruistic Player", resources: { Money: 35, Reputation: 40 } },
  P2: { role: "Balanced Player", resources: { Money: 30, Reputation: 35 } },
  P3: { role: "Interest Driven Player", resources: { Money: 25, Reputation: 15 } },
};

/**
 * parseObservationForBoard extracts board information from a flat observation.
 * The flat observation is structured as:
 * - indices 0 - 47: grid data (ignored for board visualization)
 * - indices 48 - 49: resources (ignored for board visualization)
 * - indices 50 - 65: builders (4x4 matrix)
 * - indices 66 - 81: building types (4x4 matrix)
 */
const parseObservationForBoard = (observation) => {
  if (observation.length < 82) {
    console.error("Observation length is less than expected (82).");
    return initialDummyBoard;
  }
  // Extract builders: indices 50 to 65
  const buildersFlat = observation.slice(50, 66);
  // Extract building types: indices 66 to 82
  const buildingTypesFlat = observation.slice(66, 82);
  const board = [];
  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      const builderVal = buildersFlat[i * 4 + j];
      const bType = buildingTypesFlat[i * 4 + j];
      row.push({
        owner: builderVal === -1 ? null : `P${builderVal + 1}`,
        type: bType,
      });
    }
    board.push(row);
  }
  return board;
};

// Mapping from building type to low-saturation Tailwind background color
const buildingColorMap = {
  [-1]: "bg-gray-100", // Empty
  0: "bg-green-200",   // Park
  1: "bg-yellow-200",  // House
  2: "bg-red-200",     // Shop
};

const buildingNames = {
  0: "Park",
  1: "House",
  2: "Shop",
  "-1": "Empty",
};

const SimCityGame = () => {
  // Existing states
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [actionType, setActionType] = useState("");
  const [error, setError] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [showBuilders, setShowBuilders] = useState(true);

  // New states for simulation episode visualization
  const [simulationEpisode, setSimulationEpisode] = useState(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [boardState, setBoardState] = useState(initialDummyBoard);

  // Function to fetch a full simulation episode from the API
  const fetchSimulationEpisode = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5888/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setSimulationEpisode(data.episode_records);
      setCurrentTurnIndex(0);
      // Update board state using the observation from the first turn (first agent's observation)
      if (data.episode_records && data.episode_records.length > 0) {
        const firstObs = data.episode_records[0].observation[0][0];
        setBoardState(parseObservationForBoard(firstObs));
      }
    } catch (error) {
      console.error("Error fetching simulation episode:", error);
    }
  };

  // Advance to the next turn in the episode
  const nextTurn = () => {
    if (simulationEpisode && currentTurnIndex < simulationEpisode.length - 1) {
      const newIndex = currentTurnIndex + 1;
      setCurrentTurnIndex(newIndex);
      const newObs = simulationEpisode[newIndex].observation[0][0];
      setBoardState(parseObservationForBoard(newObs));
    }
  };

  // Go back to the previous turn
  const previousTurn = () => {
    if (simulationEpisode && currentTurnIndex > 0) {
      const newIndex = currentTurnIndex - 1;
      setCurrentTurnIndex(newIndex);
      const newObs = simulationEpisode[newIndex].observation[0][0];
      setBoardState(parseObservationForBoard(newObs));
    }
  };

  // Render current simulation turn details
  const renderSimulationTurn = () => {
    if (!simulationEpisode) {
      return <div>No simulation data. Click "Simulate Episode" to fetch data.</div>;
    }
    const turnData = simulationEpisode[currentTurnIndex];
    return (
      <div className="p-4 border rounded-md bg-gray-50 my-4">
        <h3 className="text-lg font-bold">Turn {turnData.t_env}</h3>
        <p>
          <strong>Actions:</strong> {turnData.actions.join(", ")}
        </p>
        <p>
          <strong>Rewards:</strong>{" "}
          {Array.isArray(turnData.rewards)
            ? turnData.rewards.join(", ")
            : turnData.rewards}
        </p>
        <p>
          <strong>Info:</strong> {JSON.stringify(turnData.info)}
        </p>
      </div>
    );
  };

  // Render the board based on boardState
  const renderBoard = () => {
    return (
      <div className="flex justify-center my-4">
        <table className="table-auto border-collapse border border-gray-400">
          <tbody>
            {boardState.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => {
                  const cellName =
                    cell.type === -1
                      ? "Empty"
                      : buildingNames[cell.type.toString()] || `Type ${cell.type}`;
                  const bgClass =
                    buildingColorMap[cell.type] || "bg-gray-100";
                  return (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className={`w-24 h-24 border border-gray-300 text-center ${bgClass}`}
                      onClick={() => console.log(`Cell clicked at [${rowIndex},${cellIndex}]`)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium">{cellName}</span>
                        {showBuilders && (
                          <span className="text-xs text-gray-500">
                            {cell.owner ? `Built by ${cell.owner}` : "Unclaimed"}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Existing parcel and action type handlers remain unchanged
  const handleParcelClick = (x, y, cell) => {
    if (cell.type === -1) {
      setSelectedParcel({ x, y });
      setActionType("");
    } else {
      setError("Only empty parcels can be selected.");
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleActionTypeChange = (e) => {
    setActionType(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        SimCity Game Interface
      </h1>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Current Player</h2>
        <p className="p-4 bg-blue-100 rounded-md">
          <strong>{currentPlayer}</strong>: {players[currentPlayer].role}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Player Information</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(players).map(([player, info]) => (
            <div
              key={player}
              className={`p-4 rounded-md ${
                player === currentPlayer ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <p>
                <strong>{player}</strong>: {info.role}
              </p>
              {player === currentPlayer && (
                <>
                  <p>Money: {info.resources.Money}</p>
                  <p>Reputation: {info.resources.Reputation}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Render the board from boardState */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Game Board</h2>
        {renderBoard()}
        <button
          onClick={() => setShowBuilders(!showBuilders)}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {showBuilders ? "Hide Builders" : "Show Builders"}
        </button>
      </div>

      {/* Simulation Controls */}
      <div className="mb-6 p-4 border rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-2 text-center">Simulation</h2>
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={fetchSimulationEpisode}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Simulate Episode
          </button>
          {simulationEpisode && (
            <>
              <button
                onClick={previousTurn}
                className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
                disabled={currentTurnIndex === 0}
              >
                Previous Turn
              </button>
              <button
                onClick={nextTurn}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                disabled={
                  simulationEpisode && currentTurnIndex === simulationEpisode.length - 1
                }
              >
                Next Turn
              </button>
            </>
          )}
        </div>
        {simulationEpisode && (
          <div className="text-center">
            <p>
              Turn {currentTurnIndex + 1} of {simulationEpisode.length}
            </p>
            {renderSimulationTurn()}
          </div>
        )}
      </div>

      {/* (Optional) Action Selection Panel */}
      {selectedParcel && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Provide Actions</h2>
          <div className="p-4 bg-blue-100 rounded-md">
            <p>
              Selected Parcel at ({selectedParcel.x}, {selectedParcel.y})
            </p>
            <div className="mt-2">
              <label htmlFor="action-type" className="font-medium mr-2">
                Action Type:
              </label>
              <select
                id="action-type"
                value={actionType}
                onChange={handleActionTypeChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Action</option>
                <option value="0">Build Park</option>
                <option value="1">Build House</option>
                <option value="2">Build Shop</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimCityGame;