"use client";

import React, { useState, useEffect } from "react";
import {
  initialDummyBoard,
  buildingColorMap,
  buildingNames,
  players,
  parseObservationForBoard,
  parseAndDisplayInfo
} from "../components/Utils";

// Define grid dimensions (for a 4x4 board)
const GRID_X = 4;
const GRID_Y = 4;
const NUM_CELLS = GRID_X * GRID_Y;

const Play = () => {
  // Board state (initially using dummy board; will update with server response)
  const [boardState, setBoardState] = useState(initialDummyBoard);
  // Selected parcel (cell) by human player, e.g., { x: 0, y: 0 }
  const [selectedParcel, setSelectedParcel] = useState(null);
  // Human player's chosen action
  // We'll include an option for "Skip" as well as building options.
  const [actionType, setActionType] = useState("");
  // Error message display
  const [error, setError] = useState("");
  // Info from the last step response
  const [lastStepInfo, setLastStepInfo] = useState(null);

  // On page load, reset the game (call /reset API)
  useEffect(() => {
    handleResetGame();
  }, []);

  // Reset game: call /reset API and update board state
  const handleResetGame = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5888/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      // Update board based on initial observation
      if (
        data &&
        data.observation &&
        data.observation.length > 0 &&
        data.observation[0].length > 0
      ) {
        const newObs = data.observation[0][0];
        setBoardState(parseObservationForBoard(newObs));
      }
      // Clear any previous step info and selection
      setLastStepInfo(null);
      setSelectedParcel(null);
      setActionType("");
    } catch (err) {
      console.error("Error resetting game:", err);
      setError("Error resetting game. Please try again.");
    }
  };

  // When a cell is clicked, select it if empty
  const handleParcelClick = (x, y, cell) => {
    if (cell.type === -1) {
      setSelectedParcel({ x, y });
    } else {
      setError("Only empty parcels can be selected.");
      setTimeout(() => setError(""), 2000);
    }
  };

  // Handle dropdown change (human action)
  const handleActionTypeChange = (e) => {
    setActionType(e.target.value);
  };

  // Compute valid action number based on selection:
  // - If "skip" is chosen, return 0.
  // - Otherwise, for building action b and selected cell with id, action = 1 + b * NUM_CELLS + cell_id.
  const computeActionNumber = () => {
    if (actionType === "skip" || actionType === "") {
      return 0; // skip action
    }
    if (!selectedParcel) {
      return 0;
    }
    const b = parseInt(actionType, 10); // building type index, e.g., 0, 1, or 2
    const cellId = selectedParcel.x * GRID_Y + selectedParcel.y;
    return 1 + b * NUM_CELLS + cellId;
  };

  // Handler: Submit human action. Assumes agent 0 is human.
  const handleSubmitAction = async () => {
    if (selectedParcel === null) {
      setError("Please select an empty cell first.");
      return;
    }
    // If user wants to skip, actionType should be "skip" or empty.
    // Otherwise, actionType should be one of "0", "1", or "2".
    const actionNumber = computeActionNumber();
    try {
      // Prepare payload: agent P1 gets the human-provided action number.
      // P2 is 0, P3 is 1, and P1 is 2.
      const payload = {
        user_actions: { "2": actionNumber },
      };
      const res = await fetch("http://127.0.0.1:5888/step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLastStepInfo(data);
      // Update board using the new observation returned by the server.
      if (
        data &&
        data.next_observation &&
        data.next_observation.length > 0 &&
        data.next_observation[0].length > 0
      ) {
        const newObs = data.next_observation[0][0];
        setBoardState(parseObservationForBoard(newObs));
      }
      // Clear selection and action
      setSelectedParcel(null);
      setActionType("");
    } catch (err) {
      console.error("Error submitting action:", err);
      setError("Error submitting action. Please try again.");
    }
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
                      : buildingNames[cell.type.toString()] ||
                      `Type ${cell.type}`;
                  const bgClass = buildingColorMap[cell.type] || "bg-gray-100";
                  const highlight =
                    selectedParcel &&
                      selectedParcel.x === rowIndex &&
                      selectedParcel.y === cellIndex
                      ? "bg-blue-100"
                      : "";
                  return (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className={`w-24 h-24 border border-gray-300 text-center ${bgClass} ${highlight}`}
                      onClick={() => handleParcelClick(rowIndex, cellIndex, cell)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium">
                          {cellName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {cell.owner ? `Built by ${cell.owner}` : "Unclaimed"}
                        </span>
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

  // Render last step info (from /step API)
  const renderLastStepInfo = () => {
    if (!lastStepInfo) return null;
    return (
      <div className="p-4 border rounded-md bg-gray-50 my-4">
        <h3 className="text-lg font-bold">
          Turn {lastStepInfo.t_env} Info
        </h3>
        <p>
          <strong>Actions Taken:</strong>{" "}
          {lastStepInfo.actions_taken.join(", ")}
        </p>
        <div>{parseAndDisplayInfo(lastStepInfo.info)}</div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {/* Reset Game Button */}
      <div className="mb-6">
        <button
          onClick={handleResetGame}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Reset Game
        </button>
      </div>

      {/* Player Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Player Information</h2>
        <div className="grid grid-cols-3 gap-4">

          {/* Debug lastStepInfo.info */}
          {/* <div>{JSON.stringify(lastStepInfo?.info)}</div> */}

          {Object.entries(players).map(([player, info]) => {
            // 从 lastStepInfo.info 中获取动态的玩家资源，否则回退到静态资源
            const dynamicResources =
              lastStepInfo &&
                lastStepInfo.info &&
                lastStepInfo.info.player_resources &&
                lastStepInfo.info.player_resources[player]
                ? lastStepInfo.info.player_resources[player]
                : info.resources;

            // comptible with different key names
            const money = dynamicResources.money;
            const reputation = dynamicResources.reputation;

            return (
              <div
                key={player}
                className={`p-4 rounded-md ${player === "P1" ? "bg-green-100" : "bg-gray-100"}`}
              >
                <p>
                  <strong>{player}</strong>: {info.role}
                </p>
                <p>Money: {money}</p>
                <p>Reputation: {reputation}</p>
                {player === "P1" && <p>(Human)</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Render Board */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Game Board</h2>
        {renderBoard()}
      </div>

      {/* Action Panel for Human Player */}
      <div className="mb-6 p-4 border rounded-md bg-blue-50">
        <h2 className="text-xl font-semibold mb-2">Your Turn (Agent P1)</h2>
        {selectedParcel ? (
          <div>
            <p>
              Selected Parcel at ({selectedParcel.x}, {selectedParcel.y})
            </p>
            <div className="mt-2">
              <p className="font-medium mb-2">Choose Action:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setActionType("skip")}
                  className={`px-4 py-2 rounded-md ${actionType === "skip" ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  Skip
                </button>
                <button
                  onClick={() => setActionType("0")}
                  className={`px-4 py-2 rounded-md ${actionType === "0" ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  Build Park
                </button>
                <button
                  onClick={() => setActionType("1")}
                  className={`px-4 py-2 rounded-md ${actionType === "1" ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  Build House
                </button>
                <button
                  onClick={() => setActionType("2")}
                  className={`px-4 py-2 rounded-md ${actionType === "2" ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  Build Shop
                </button>
              </div>
            </div>
            <button
              onClick={handleSubmitAction}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit Action
            </button>
          </div>
        ) : (
          <p>Please click on an empty cell on the board to select a parcel.</p>
        )}
      </div>

      {/* Display Last Step Info */}
      {renderLastStepInfo()}
    </div>
  );
};

export default Play;
