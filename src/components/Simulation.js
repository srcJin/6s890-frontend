"use client";

import React, { useState, useEffect } from "react";
import {
  initialDummyBoard,
  buildingColorMap,
  buildingNames,
  buildingIcons,
  buildingIconColors,
  players,
  parseObservationForBoard,
  parseAndDisplayInfo,
  parseKotoParameters,
  renderParameterDisplay
} from "../components/Utils";

import {
  testIconComponents as buildingIconComponents,
  testIconStyles as iconStyles
} from "../components/TestUtils";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5889"
    : "https://simcity-koto-inference-server.onrender.com");

// Simulation component
const Simulation = () => {
  // Basic state variables
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [actionType, setActionType] = useState("");
  const [error, setError] = useState("");
  // currentPlayer will now sync with movement (P1, P2, P3, etc.)
  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [showBuilders, setShowBuilders] = useState(true);
  const [useTextIcons, setUseTextIcons] = useState(false);

  // Simulation episode state variables
  const [simulationEpisode, setSimulationEpisode] = useState(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  // Movement index is determined by the number of observations (movements) in a turn
  const [currentMovementIndex, setCurrentMovementIndex] = useState(0);
  const [boardState, setBoardState] = useState(initialDummyBoard);

  // Debug info visibility state
  const [debugInfoExpanded, setDebugInfoExpanded] = useState(true);

  // Synchronize currentPlayer with currentMovementIndex (4 players: P1, P2, P3, P4)
  useEffect(() => {
    const newPlayer = `P${(currentMovementIndex % 4) + 1}`;
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
        // Extract first agent's observation: observation[0][0][0] (first agent's 514-value array)
        const firstObs = data.episode_records[0].observation[0][0][0];
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
      const newObs = simulationEpisode[newTurnIndex].observation[0][0][0]; // First agent's observation
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
      const newObs = simulationEpisode[newTurnIndex].observation[0][0][0]; // First agent's observation
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
      // For simulation, we use the first agent's observation consistently
      // observation[0][0] contains the 4 agents, we use index 0 for the first agent
      const agentObservations = currentTurn.observation[0][0];
      if (Array.isArray(agentObservations) && agentObservations.length > 0) {
        // Always use the first agent's observation for board visualization
        const newObs = agentObservations[0]; // First agent's 514-value observation
        console.log("Using first agent observation for board display");
        setBoardState(parseObservationForBoard(newObs));
      }
    }
  };

  // Go back to the previous movement within the current turn
  const previousMovement = () => {
    if (simulationEpisode && currentMovementIndex > 0) {
      const newMovementIndex = currentMovementIndex - 1;
      setCurrentMovementIndex(newMovementIndex);
      const currentTurn = simulationEpisode[currentTurnIndex];
      // For simulation, we use the first agent's observation consistently
      const agentObservations = currentTurn.observation[0][0];
      if (Array.isArray(agentObservations) && agentObservations.length > 0) {
        // Always use the first agent's observation for board visualization
        const newObs = agentObservations[0]; // First agent's 514-value observation
        console.log("Using first agent observation for board display");
        setBoardState(parseObservationForBoard(newObs));
      }
    }
  };

  // Render the simulation turn details, including movement info
  const renderSimulationTurn = () => {
    if (!simulationEpisode) {
      return <div>No simulation data. Click Simulate Episode to fetch data.</div>;
    } 
    const turnData = simulationEpisode[currentTurnIndex];
    // For the scaled-up environment, we have 4 agents in the observation
    // observation[0][0] contains array of 4 agents
    const agentObservations = turnData.observation[0][0];
    const numMovements = Array.isArray(agentObservations) ? agentObservations.length : 1;
    console.log("Rendering turn", turnData.t_env, "with observation structure:", turnData.observation);
    return (
      <div className="p-4 border rounded-md bg-gray-50 my-4">
        <h3 className="text-lg font-bold">
          Turn {turnData.t_env} - Agents: {numMovements} agents
        </h3>
        <p>
          <strong>Actions:</strong> {(turnData.actions_taken || turnData.actions || []).join(", ")}
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
                  // Create flat icons with building symbols for buildable projects
                  const getFlatIcon = (type) => {
                    const iconMap = {
                      // Terrain types (0-2) - Non-buildable, simple shapes
                      0: <div className="w-4 h-4 border border-gray-400 bg-gray-50"></div>, // Empty
                      1: <div className="w-6 h-3 bg-blue-600 rounded"></div>, // Water
                      2: <div className="w-6 h-1 bg-gray-600"></div>, // Road
                      
                      // Basic Development Projects (100-103) - Buildable by players
                      100: <div className="w-6 h-6 bg-blue-300 border border-blue-500 rounded flex items-center justify-center"><span className="text-xs font-bold text-blue-900">H</span></div>, // House
                      101: <div className="w-6 h-6 bg-red-300 border border-red-500 rounded flex items-center justify-center"><span className="text-xs font-bold text-red-900">S</span></div>, // Shop
                      102: <div className="w-6 h-6 bg-purple-300 border border-purple-500 rounded flex items-center justify-center"><span className="text-xs font-bold text-purple-900">O</span></div>, // Office
                      103: <div className="w-6 h-6 bg-orange-400 border border-orange-600 rounded flex items-center justify-center"><span className="text-xs font-bold text-orange-900">F</span></div>, // Factory
                      
                      // Resilience Projects (201-204) - Buildable by players
                      201: <div className="w-6 h-6 bg-green-400 border border-green-600 rounded flex items-center justify-center"><span className="text-xs font-bold text-green-900">P</span></div>, // Park
                      202: <div className="w-6 h-6 bg-orange-300 border border-orange-500 rounded flex items-center justify-center"><span className="text-xs font-bold text-orange-900">C</span></div>, // Shelter
                      203: <div className="w-6 h-6 bg-yellow-400 border border-yellow-600 rounded flex items-center justify-center"><span className="text-xs font-bold text-yellow-900">G</span></div>, // Watergate
                      204: <div className="w-6 h-6 bg-purple-500 border border-purple-700 rounded flex items-center justify-center"><span className="text-xs font-bold text-purple-100">B</span></div>, // Flood Barrier
                      
                      // Legacy support for potential old building types
                      3: <div className="w-6 h-6 bg-green-300 border border-green-500 rounded flex items-center justify-center"><span className="text-xs font-bold text-green-900">P</span></div>, // Old Park mapping
                      4: <div className="w-6 h-6 bg-orange-300 border border-orange-500 rounded flex items-center justify-center"><span className="text-xs font-bold text-orange-900">C</span></div>, // Old Shelter mapping
                      5: <div className="w-6 h-6 bg-yellow-400 border border-yellow-600 rounded flex items-center justify-center"><span className="text-xs font-bold text-yellow-900">G</span></div>, // Old Watergate mapping
                      6: <div className="w-6 h-6 bg-purple-500 border border-purple-700 rounded flex items-center justify-center"><span className="text-xs font-bold text-purple-100">B</span></div>, // Old FloodBarrier mapping
                      
                      // Support for negative types
                      [-1]: <div className="w-4 h-4 border border-gray-400 bg-gray-50"></div>, // Empty
                      "-1": <div className="w-4 h-4 border border-gray-400 bg-gray-50"></div> // Empty
                    };
                    // For unknown building types, show the building type number instead of ?
                    return iconMap[type] || <div className="w-6 h-6 bg-gray-400 border border-gray-600 rounded flex items-center justify-center"><span className="text-xs font-bold text-gray-100">{type}</span></div>;
                  };
                  
                  const iconColor = buildingIconColors[cell.type] || buildingIconColors[-1];
                  const bgClass = buildingColorMap[cell.type] || "bg-gray-100";
                  
                  return (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className={`w-16 h-16 border border-gray-300 text-center ${cell.type === -1 ? 'bg-gray-200' : bgClass} cursor-pointer hover:bg-opacity-80 relative`}
                      onClick={() => console.log(`Cell clicked at [${rowIndex},${cellIndex}]`)}
                    >
                      <div className="flex flex-col items-center justify-center h-full relative">
                        
                        {/* Display flat CSS icon */}
                        <div className="mb-1">
                          {getFlatIcon(cell.type)}
                        </div>
                        
                        {cell.owner && cell.owner !== "TERRAIN" && cell.owner !== "INFRA" && (
                          <span className="text-xs text-gray-700 font-bold absolute bottom-0 bg-white bg-opacity-75 px-1 rounded">
                            {cell.owner}
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md max-w-full">
          <p>{error}</p>
        </div>
      )}

      {/* Main Layout: Left (Game Board) and Right (Controls & Info) */}
      <div className="flex gap-6 max-w-full">
        
        {/* LEFT SIDE: Game Board */}
        <div className="flex-1 bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Game Board</h2>
          {renderBoard()}
          
          <button
            onClick={() => setShowBuilders(!showBuilders)}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mt-4"
          >
            {showBuilders ? "Hide Builders" : "Show Builders"}
          </button>
        </div>

        {/* RIGHT SIDE: Controls & Information */}
        <div className="w-96 space-y-6">
          
          {/* Current Player */}
          {/* <div className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2">Current Player</h3>
            <div className="p-3 bg-blue-100 rounded-md">
              <p><strong>{currentPlayer}</strong>: {players[currentPlayer].role}</p>
            </div>
          </div> */}

          {/* Player Information */}
          <div className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold mb-3">Player Information</h3>
            <div className="space-y-2">
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
                    className={`p-3 rounded-md text-sm ${player === "P1" ? "bg-green-100" : "bg-gray-100"}`}
                  >
                    <p><strong>{player}</strong>: {info.role}</p>
                    <p>Money: {money} | Reputation: {reputation}</p>
                    {player === "P1" && <p className="text-green-600 font-semibold">(Human)</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Urban Resilience Parameters */}
          {(() => {
            if (simulationEpisode && simulationEpisode[currentTurnIndex]) {
              const turnData = simulationEpisode[currentTurnIndex];
              const agentObservations = turnData.observation[0][0];
              if (Array.isArray(agentObservations) && agentObservations.length > 0) {
                const parameters = parseKotoParameters(agentObservations[0]);
                return renderParameterDisplay(parameters);
              }
            }
            return null;
          })()}

          {/* Simulation Controls */}
          <div className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold mb-3">Simulation Controls</h3>
            <div className="space-y-3">
              <button
                onClick={fetchSimulationEpisode}
                className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Simulate Episode
              </button>
              
              {simulationEpisode && (
                <>
                  <div className="flex gap-2">
                    <button
                      onClick={previousTurn}
                      className="flex-1 px-3 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 disabled:bg-gray-300"
                      disabled={currentTurnIndex === 0}
                    >
                      Previous Turn
                    </button>
                    <button
                      onClick={nextTurn}
                      className="flex-1 px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                      disabled={simulationEpisode && currentTurnIndex === simulationEpisode.length - 1}
                    >
                      Next Turn
                    </button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    Turn {currentTurnIndex + 1} of {simulationEpisode.length}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Player Buildable Projects */}
          <div className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold mb-3">Player Buildable Projects</h3>
            
            {/* Basic Development Projects */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Basic Development</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded border text-center">
                  <div className="w-6 h-6 bg-blue-300 border border-blue-500 rounded flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold text-blue-900">H</span>
                  </div>
                  <p className="text-xs">House</p>
                </div>
                <div className="bg-red-50 p-2 rounded border text-center">
                  <div className="w-6 h-6 bg-red-300 border border-red-500 rounded flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold text-red-900">S</span>
                  </div>
                  <p className="text-xs">Shop</p>
                </div>
                <div className="bg-purple-50 p-2 rounded border text-center">
                  <div className="w-6 h-6 bg-purple-300 border border-purple-500 rounded flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold text-purple-900">O</span>
                  </div>
                  <p className="text-xs">Office</p>
                </div>
                <div className="bg-orange-50 p-2 rounded border text-center">
                  <div className="w-6 h-6 bg-orange-400 border border-orange-600 rounded flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold text-orange-900">F</span>
                  </div>
                  <p className="text-xs">Factory</p>
                </div>
              </div>
            </div>

            {/* Resilience Projects */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Resilience Projects</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 p-2 rounded border text-center">
                  <div className="w-6 h-6 bg-green-400 border border-green-600 rounded flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold text-green-900">P</span>
                  </div>
                  <p className="text-xs">Park</p>
                </div>
                <div className="bg-orange-50 p-2 rounded border text-center">
                  <div className="w-6 h-6 bg-orange-300 border border-orange-500 rounded flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold text-orange-900">C</span>
                  </div>
                  <p className="text-xs">Shelter</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded border text-center">
                  <div className="w-6 h-6 bg-yellow-400 border border-yellow-600 rounded flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold text-yellow-900">G</span>
                  </div>
                  <p className="text-xs">Watergate</p>
                </div>
                <div className="bg-purple-50 p-2 rounded border text-center">
                  <div className="w-6 h-6 bg-purple-500 border border-purple-700 rounded flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold text-purple-100">B</span>
                  </div>
                  <p className="text-xs">Flood Barrier</p>
                </div>
              </div>
            </div>

            {/* Terrain (Non-buildable) */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Terrain (Fixed)</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 p-2 rounded border text-center">
                  <div className="w-4 h-4 border border-gray-400 bg-gray-50 mx-auto mb-1"></div>
                  <p className="text-xs">Empty</p>
                </div>
                <div className="bg-blue-50 p-2 rounded border text-center">
                  <div className="w-6 h-3 bg-blue-600 rounded mx-auto mb-1"></div>
                  <p className="text-xs">Water</p>
                </div>
                <div className="bg-gray-50 p-2 rounded border text-center">
                  <div className="w-6 h-1 bg-gray-600 mx-auto mb-1 mt-2"></div>
                  <p className="text-xs">Road</p>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Debug Info */}
          <div className="bg-white shadow-md rounded-md p-4">
            <button
              onClick={() => setDebugInfoExpanded(!debugInfoExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold">Debug Information</h3>
              <span className="text-gray-500">
                {debugInfoExpanded ? '▼' : '▶'}
              </span>
            </button>
            
            {debugInfoExpanded && simulationEpisode && (
              <div className="mt-3 text-sm">
                {renderSimulationTurn()}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Simulation;
