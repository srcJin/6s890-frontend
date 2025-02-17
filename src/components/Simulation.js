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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5888"
    : "https://simcity-mvp-inference-server.onrender.com");

// Simulation component
const Simulation = () => {
  // Basic state variables
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [actionType, setActionType] = useState("");
  const [error, setError] = useState("");
  // currentPlayer will now sync with movement (P1, P2, P3, etc.)
  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [showBuilders, setShowBuilders] = useState(true);

  // Simulation episode state variables
  const [simulationEpisode, setSimulationEpisode] = useState(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  // Movement index is determined by the number of observations (movements) in a turn
  const [currentMovementIndex, setCurrentMovementIndex] = useState(0);
  const [boardState, setBoardState] = useState(initialDummyBoard);

  // Synchronize currentPlayer with currentMovementIndex
  useEffect(() => {
    const newPlayer = `P${currentMovementIndex + 1}`;
    console.log("Syncing currentPlayer with movement:", newPlayer);
    setCurrentPlayer(newPlayer);
  }, [currentMovementIndex]);

  // Fetch a full simulation episode from the API
  const fetchSimulationEpisode = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setSimulationEpisode(data.episode_records);
      // Reset to first turn and first movement
      setCurrentTurnIndex(0);
      setCurrentMovementIndex(0);
      if (data.episode_records && data.episode_records.length > 0) {
        // Log the observation structure for debugging
        console.log("Observation for first turn:", data.episode_records[0].observation);
        // Assume the movement dimension is in the inner array
        const firstObs = data.episode_records[0].observation[0][0];
        setBoardState(parseObservationForBoard(firstObs));
      }
    } catch (error) {
      console.error("Error fetching simulation episode:", error);
    }
  };

  // Advance to the next turn (reset movement to the first observation)
  const nextTurn = () => {
    if (simulationEpisode && currentTurnIndex < simulationEpisode.length - 1) {
      const newTurnIndex = currentTurnIndex + 1;
      setCurrentTurnIndex(newTurnIndex);
      setCurrentMovementIndex(0);
      const newObs = simulationEpisode[newTurnIndex].observation[0][0];
      console.log("Switching to turn", newTurnIndex, "observation:", simulationEpisode[newTurnIndex].observation);
      setBoardState(parseObservationForBoard(newObs));
    }
  };

  // Go back to the previous turn (reset movement to the first observation)
  const previousTurn = () => {
    if (simulationEpisode && currentTurnIndex > 0) {
      const newTurnIndex = currentTurnIndex - 1;
      setCurrentTurnIndex(newTurnIndex);
      setCurrentMovementIndex(0);
      const newObs = simulationEpisode[newTurnIndex].observation[0][0];
      console.log("Switching to previous turn", newTurnIndex, "observation:", simulationEpisode[newTurnIndex].observation);
      setBoardState(parseObservationForBoard(newObs));
    }
  };

  // Advance to the next movement within the current turn
  const nextMovement = () => {
    if (simulationEpisode) {
      const currentTurn = simulationEpisode[currentTurnIndex];
      // Debug log to inspect observation structure and current movement
      console.log("Current turn observation structure:", currentTurn.observation);
      console.log("Current movement index:", currentMovementIndex);
      // In our sample, observation is an array with one element that holds the movements.
      // So, we check the inner array length.
      const movements = Array.isArray(currentTurn.observation[0])
        ? currentTurn.observation[0]
        : currentTurn.observation;
      if (currentMovementIndex < movements.length - 1) {
        const newMovementIndex = currentMovementIndex + 1;
        setCurrentMovementIndex(newMovementIndex);
        const newObs = Array.isArray(currentTurn.observation[0])
          ? currentTurn.observation[0][newMovementIndex]
          : currentTurn.observation[newMovementIndex];
        console.log("Switching to movement", newMovementIndex, "observation:", newObs);
        setBoardState(parseObservationForBoard(newObs));
      } else {
        console.log("Already at last movement:", currentMovementIndex);
      }
    }
  };

  // Go back to the previous movement within the current turn
  const previousMovement = () => {
    if (simulationEpisode && currentMovementIndex > 0) {
      const newMovementIndex = currentMovementIndex - 1;
      setCurrentMovementIndex(newMovementIndex);
      const currentTurn = simulationEpisode[currentTurnIndex];
      const movements = Array.isArray(currentTurn.observation[0])
        ? currentTurn.observation[0]
        : currentTurn.observation;
      const newObs = Array.isArray(currentTurn.observation[0])
        ? currentTurn.observation[0][newMovementIndex]
        : currentTurn.observation[newMovementIndex];
      console.log("Switching to previous movement", newMovementIndex, "observation:", newObs);
      setBoardState(parseObservationForBoard(newObs));
    }
  };

  // Render the simulation turn details, including movement info
  const renderSimulationTurn = () => {
    if (!simulationEpisode) {
      return <div>No simulation data. Click Simulate Episode to fetch data.</div>;
    } 
    const turnData = simulationEpisode[currentTurnIndex];
    // Determine number of movements from inner array if available
    const movements = Array.isArray(turnData.observation[0])
      ? turnData.observation[0]
      : turnData.observation;
    const numMovements = movements.length;
    console.log("Rendering turn", turnData.t_env, "with observation structure:", turnData.observation);
    return (
      <div className="p-4 border rounded-md bg-gray-50 my-4">
        <h3 className="text-lg font-bold">
          Turn {turnData.t_env} - Movement: P{currentMovementIndex + 1} of {numMovements}
        </h3>
        <p>
          <strong>Actions:</strong> {turnData.actions.join(", ")}
        </p>

        <div>{parseAndDisplayInfo(turnData.info)}</div>
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
                  const bgClass = buildingColorMap[cell.type] || "bg-gray-100";
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


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">

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

      {/* Player Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Player Information</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(players).map(([player, info]) => {
            // Use current turn data if available
            const turnData =
              simulationEpisode && simulationEpisode[currentTurnIndex]
                ? simulationEpisode[currentTurnIndex]
                : null;
            const dynamicResources =
              turnData &&
                turnData.info &&
                turnData.info.player_resources &&
                turnData.info.player_resources[player]
                ? turnData.info.player_resources[player]
                : info.resources;

            // Compatible with different key names (backend uses lowercase)
            const money = dynamicResources.money || dynamicResources.Money;
            const reputation = dynamicResources.reputation || dynamicResources.Reputation;

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

      {/* Render the board */}
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
                disabled={simulationEpisode && currentTurnIndex === simulationEpisode.length - 1}
              >
                Next Turn
              </button>
            </>
          )}
        </div>
        {/* Movement Controls */}
        {/* {simulationEpisode && (
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={previousMovement}
              className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
              disabled={currentMovementIndex === 0}
            >
              Previous Movement
            </button>
            <button
              onClick={nextMovement}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              disabled={
                (() => {
                  const turnObs = simulationEpisode[currentTurnIndex].observation;
                  const movements = Array.isArray(turnObs[0]) ? turnObs[0] : turnObs;
                  return movements.length <= currentMovementIndex + 1;
                })()
              }
            >
              Next Movement
            </button>
          </div>
        )} */}
        {simulationEpisode && (
          <div className="text-center">
            {(() => {
              const turnObs = simulationEpisode[currentTurnIndex].observation;
              const movements = Array.isArray(turnObs[0]) ? turnObs[0] : turnObs;
              return (
                <div>
                  <p>
                    Turn {currentTurnIndex + 1} of {simulationEpisode.length}
                  </p>
                  {/* <p>Movement: P
                  {currentMovementIndex + 1} of {movements.length}</p> */}
                </div>
              );
            })()}
            {renderSimulationTurn()}
          </div>
        )}
      </div>


    </div>
  );
};

export default Simulation;
