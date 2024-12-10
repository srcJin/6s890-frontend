"use client";

import React, { useState } from "react";

const SimCityGame = () => {
  // Dummy data for the board (4x4 grid)
  const dummyBoard = [
    [
      { owner: "P1", type: 0 },
      { owner: "P2", type: 1 },
      { owner: "P3", type: 2 },
      { owner: "P1", type: 3 },
    ],
    [
      { owner: "P2", type: 4 },
      { owner: null, type: -1 },
      { owner: "P3", type: 5 },
      { owner: "P1", type: 0 },
    ],
    [
      { owner: "P1", type: 1 },
      { owner: "P2", type: 2 },
      { owner: null, type: -1 },
      { owner: "P3", type: 4 },
    ],
    [
      { owner: "P3", type: 5 },
      { owner: "P1", type: 3 },
      { owner: "P2", type: 0 },
      { owner: null, type: -1 },
    ],
  ];

  // Updated player data structure
  const players = {
    P1: { role: "Altrustic Player", resources: { Money: 35, Reputation: 40 } },
    P2: { role: "Balanced Player", resources: { Money: 30, Reputation: 35 } },
    P3: {
      role: "Interest Driven Player",
      resources: { Money: 25, Reputation: 15 },
    },
  };

  // State variables
  const [selectedParcel, setSelectedParcel] = useState(null); // { x: 0, y: 0 }
  const [actionType, setActionType] = useState("");
  const [error, setError] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [showBuilders, setShowBuilders] = useState(true);

  // Handle parcel (cell) selection
  const handleParcelClick = (x, y, cell) => {
    if (cell.type === -1) {
      setSelectedParcel({ x, y });
      setActionType(""); // Reset action type when a new parcel is selected
    } else {
      setError("Only empty parcels can be selected.");
      setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
    }
  };

  // Handle action type selection
  const handleActionTypeChange = (e) => {
    setActionType(e.target.value);
  };

  // Determine the background color for the cell
  const getBackgroundColor = (type) => {
    switch (type) {
      case 0: // Park
        return "bg-green-200";
      case 1: // House
        return "bg-yellow-200";
      case 2: // Shop
        return "bg-red-200";
      case 3: // Community Center
        return "bg-blue-200";
      case 4: // Office
        return "bg-purple-200";
      case 5: // Mall
        return "bg-pink-200";
      default: // Empty
        return "bg-gray-100";
    }
  };

  // Render cell content with Tailwind CSS styling
  const renderCell = (cell) => {
    let typeText;
    switch (cell.type) {
      case -1:
        typeText = "Empty";
        break;
      case 0:
        typeText = "Park";
        break;
      case 1:
        typeText = "House";
        break;
      case 2:
        typeText = "Shop";
        break;
      case 3:
        typeText = "Community Center";
        break;
      case 4:
        typeText = "Office";
        break;
      case 5:
        typeText = "Mall";
        break;
      default:
        typeText = "Unknown";
    }
    const ownerText = cell.owner ? `Built by ${cell.owner}` : "Unclaimed";

    return (
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium">{typeText}</span>
        {showBuilders && (
          <span className="text-xs text-gray-500">{ownerText}</span>
        )}
      </div>
    );
  };

  // Render the 4x4 game board
  const renderBoard = () => {
    return (
      <div className="flex justify-center">
        <table className="table-auto border-collapse border border-gray-400">
          <tbody>
            {dummyBoard.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className={`w-24 h-24 border border-gray-300 text-center ${
                      selectedParcel &&
                      selectedParcel.x === rowIndex &&
                      selectedParcel.y === cellIndex
                        ? "bg-blue-100"
                        : getBackgroundColor(cell.type)
                    }`}
                    onClick={() => handleParcelClick(rowIndex, cellIndex, cell)}
                  >
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">SimCity Game Interface</h1>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {/* Current Player Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Current Player</h2>
        <p className="p-4 bg-blue-100 rounded-md">
          <strong>{currentPlayer}</strong>: {players[currentPlayer].role}
        </p>
      </div>

      {/* Player Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Player Information</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(players).map(([player, info]) => (
            <div
              key={player}
              className={`p-4 rounded-md ${
                player === currentPlayer
                  ? "bg-green-100"
                  : "bg-gray-100"
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

      {/* Game Board */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Game Board</h2>
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            {renderBoard()}
          </div>
          
        </div>
        <button
                onClick={() => setShowBuilders(!showBuilders)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {showBuilders ? "Hide Builders" : "Show Builders"}
              </button>
      </div>

      {/* Action Selection */}
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
