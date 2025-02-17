// src/components/Utils.js

// Initial dummy board (used as fallback)
export const initialDummyBoard = [
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
  
  // Mapping from building type to low-saturation Tailwind background color
  export const buildingColorMap = {
    [-1]: "bg-gray-100", // Empty
    0: "bg-green-200",   // Park
    1: "bg-yellow-200",  // House
    2: "bg-red-200",     // Shop
  };
  
  // Building type names for display
  export const buildingNames = {
    0: "Park",
    1: "House",
    2: "Shop",
    "-1": "Empty",
  };
  
  // Player information
  export const players = {
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
  export const parseObservationForBoard = (observation) => {
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
  