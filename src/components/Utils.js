// src/components/Utils.js

// Import Ionicons 5 filled icons
import { 
  IoLeaf, 
  IoHome, 
  IoPeople, 
  IoSunny, 
  IoShield,
  IoSquare,
  IoWater,
  IoTriangle,
  IoEllipse,
  IoRemove,
  IoTrain,
  IoMedkit,
  IoSchool,
  IoFlame,
  IoFlash,
  IoStorefront,
  IoConstruct,
  IoBusinessOutline
} from "react-icons/io5";

// Initial dummy board (12x12 grid for koto environment)
export const initialDummyBoard = Array(12).fill().map(() => 
  Array(12).fill().map(() => ({ owner: null, type: -1 }))
);

// Mapping from building type to colors for koto environment (unified TERRAIN_AND_PROJECTS)
export const buildingColorMap = {
  // Terrain types
  0: "bg-gray-100",         // Empty - buildable land
  1: "bg-blue-500",         // Water - natural water body
  2: "bg-gray-600",         // Road - transportation infrastructure
  
  // Basic development projects
  100: "bg-blue-300",       // House - residential housing  
  101: "bg-red-300",        // Shop - commercial retail
  102: "bg-purple-400",     // Office - commercial office building
  103: "bg-orange-600",     // Factory - industrial manufacturing
  
  // Resilience projects
  201: "bg-green-400",      // Park - green park for recreation
  202: "bg-orange-300",     // Shelter - community resilience center
  203: "bg-yellow-400",     // Watergate - renewable energy infrastructure
  204: "bg-purple-500",     // FloodBarrier - climate protection infrastructure
  
  // Legacy support
  [-1]: "bg-gray-100",      // Empty (fallback)
  "terrain": "bg-gray-400", // Non-buildable terrain
  "infrastructure": "bg-red-400", // Pre-built infrastructure
};

// Building type names for display (koto environment unified system)
export const buildingNames = {
  // Terrain types
  0: "Empty",
  1: "Water", 
  2: "Road",
  
  // Basic development projects
  100: "House",
  101: "Shop",
  102: "Office", 
  103: "Factory",
  
  // Resilience projects
  201: "Park",
  202: "Shelter",
  203: "Watergate", 
  204: "Flood Barrier",
  
  // Legacy support
  "-1": "Empty", 
  9: "Highway",
  10: "Railway",
  
  // Infrastructure types (11-14) - legacy
  11: "Hospital",
  12: "School", 
  13: "Fire Station",
  14: "Power Plant",
};

// Icon mapping for building types (koto environment)
export const buildingIcons = {
  // Terrain types
  0: IoSquare,        // Empty - buildable land
  1: IoWater,         // Water - natural water body  
  2: IoRemove,        // Road - transportation infrastructure
  
  // Basic development projects
  100: IoHome,           // House - residential housing
  101: IoStorefront,     // Shop - commercial retail
  102: IoBusinessOutline, // Office - commercial office building
  103: IoFlame,          // Factory - industrial manufacturing
  
  // Resilience projects  
  201: IoLeaf,           // Park - green park for recreation
  202: IoShield,         // Shelter - community resilience center
  203: IoSunny,          // Watergate - renewable energy infrastructure  
  204: IoConstruct,      // FloodBarrier - climate protection infrastructure
  
  // Legacy support
  [-1]: IoSquare,     // Empty cell (fallback)
  
  // Legacy terrain/infrastructure (6-14)
  6: IoWater,         // River
  7: IoTriangle,      // Mountain
  8: IoEllipse,       // Lake
  9: IoRemove,        // Highway
  10: IoTrain,        // Railway
  11: IoMedkit,       // Hospital
  12: IoSchool,       // School
  13: IoFlame,        // Fire Station
  14: IoFlash,        // Power Plant
};

// Darker icon colors corresponding to cell backgrounds (koto environment)
export const buildingIconColors = {
  // Terrain types
  0: "transparent",   // Empty - transparent
  1: "#1e40af",       // Water - Blue-800  
  2: "#4b5563",       // Road - Gray-600
  
  // Basic development projects
  100: "#1e3a8a",     // House - Blue-800 (blue background)
  101: "#b91c1c",     // Shop - Red-700 (red background)
  102: "#6b21a8",     // Office - Purple-800 (purple background)
  103: "#c2410c",     // Factory - Orange-700 (orange background)
  
  // Resilience projects
  201: "#065f46",     // Park - Green-800 (green background)
  202: "#c2410c",     // Shelter - Orange-700 (orange background)  
  203: "#a16207",     // Watergate - Yellow-700 (yellow background)
  204: "#6b21a8",     // FloodBarrier - Purple-800 (purple background)
  
  // Legacy support
  [-1]: "transparent", // transparent (fallback)
  
  // Legacy terrain/infrastructure (6-14)
  6: "#1e40af",       // Blue-800 for river
  7: "#374151",       // Gray-700 for mountain
  8: "#2563eb",       // Blue-600 for lake
  9: "#4b5563",       // Gray-600 for highway
  10: "#d97706",      // Amber-600 for railway
  
  // Infrastructure types (11-14)
  11: "#dc2626",      // Red-600 for hospital
  12: "#16a34a",      // Green-600 for school
  13: "#b91c1c",      // Red-700 for fire station
  14: "#ca8a04",      // Yellow-600 for power plant
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
 * parseObservationForBoard extracts board information from observation for 12x12 koto grid.
 * 
 * Observation structure for koto environment:
 * 1. Grid data (G, V, D, A, S, F): 12×12×6 = 864 values (6-parameter system)
 * 2. Resources: 2 values (money, reputation)
 * 3. Builders: 12×12 = 144 values
 * 4. Building types: 12×12 = 144 values  
 * 5. Grid layout: 12×12 = 144 values (unified TERRAIN_AND_PROJECTS)
 */
export const parseObservationForBoard = (observation) => {
  console.log("Parsing observation for 12x12 koto board, length:", observation?.length);
  
  // Handle flat observation format (array of numbers) from koto environment
  if (Array.isArray(observation)) {
    const gridDataSize = 12 * 12 * 6; // 864 values for grid data (G, V, D, A, S, F)
    const resourcesSize = 2; // money, reputation
    const gridSize = 12 * 12; // 144 values each for builders and building_types
    
    const expectedLength = gridDataSize + resourcesSize + (gridSize * 3); // 864 + 2 + 432 = 1298
    
    if (observation.length >= expectedLength - 100) { // Allow some tolerance
      // Extract all sections from the observation
      const buildersStart = gridDataSize + resourcesSize; // Start after grid data + resources
      const buildersEnd = buildersStart + gridSize; 
      const buildingTypesStart = buildersEnd;  
      const buildingTypesEnd = buildingTypesStart + gridSize; 
      const gridLayoutStart = buildingTypesEnd; 
      const gridLayoutEnd = gridLayoutStart + gridSize; 
      
      const buildersFlat = observation.slice(buildersStart, buildersEnd);
      const buildingTypesFlat = observation.slice(buildingTypesStart, buildingTypesEnd);
      const gridLayoutFlat = observation.slice(gridLayoutStart, gridLayoutEnd);
      
      console.log("Koto - Builders data:", buildersFlat.slice(0, 10), "...");
      console.log("Koto - Building types data:", buildingTypesFlat.slice(0, 10), "...");
      console.log("Koto - Grid layout data:", gridLayoutFlat.filter(x => x !== 0).slice(0, 10), "...");
      
      const board = [];
      for (let i = 0; i < 12; i++) {
        const row = [];
        for (let j = 0; j < 12; j++) {
          const builderVal = buildersFlat[i * 12 + j];
          const bType = buildingTypesFlat[i * 12 + j];
          const gridVal = gridLayoutFlat[i * 12 + j];
          
          // In koto, the grid layout determines the cell type (unified TERRAIN_AND_PROJECTS)
          // Use grid layout value as the primary type, fall back to building type
          let cellType = gridVal || bType || 0; // Default to Empty (0)
          let cellOwner = builderVal === -1 ? null : `P${builderVal + 1}`;
          
          // Set special owners for terrain types
          if (cellType === 1) { // Water
            cellOwner = "TERRAIN";
          } else if (cellType === 2) { // Road
            cellOwner = "TERRAIN";
          }
          
          row.push({
            owner: cellOwner,
            type: cellType,
          });
        }
        board.push(row);
      }
      console.log("Parsed koto observation board:", board);
      return board;
    }
  }
  
  // Handle structured observation format (dictionary-like) - fallback for 12x12
  if (observation && typeof observation === 'object' && observation.builders && observation.building_types) {
    const builders = observation.builders;
    const buildingTypes = observation.building_types;
    const gridSize = builders.length || 12; // Default to 12x12
    
    const board = [];
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
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
  
  console.warn("Could not parse observation (length:", observation?.length, "), using dummy board");
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

// Parse and display 6-parameter urban resilience system (G, V, D, A, S, F)
export const parseKotoParameters = (observation) => {
  if (!Array.isArray(observation) || observation.length < 864) {
    return null;
  }
  
  // Extract grid data (first 864 values: 12x12x6 parameters)
  const gridData = observation.slice(0, 864);
  
  // Calculate average values for each parameter across the entire grid
  const parameters = { G: 0, V: 0, D: 0, A: 0, S: 0, F: 0 };
  const paramNames = ['G', 'V', 'D', 'A', 'S', 'F'];
  
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      for (let param = 0; param < 6; param++) {
        const index = (i * 12 + j) * 6 + param;
        parameters[paramNames[param]] += gridData[index];
      }
    }
  }
  
  // Average across all grid cells
  const numCells = 144; // 12x12
  Object.keys(parameters).forEach(key => {
    parameters[key] = parameters[key] / numCells;
  });
  
  return parameters;
};

// Display component for 6-parameter system
export const renderParameterDisplay = (parameters) => {
  if (!parameters) return null;
  
  const parameterDescriptions = {
    G: { name: "Greenery", color: "text-green-600", description: "Urban green spaces, biodiversity" },
    V: { name: "Vitality", color: "text-blue-600", description: "Economic activity, social vibrancy" },
    D: { name: "Density", color: "text-purple-600", description: "Population density, development" },
    A: { name: "Adaptability", color: "text-orange-600", description: "Climate adaptation capacity" },
    S: { name: "Sustainability", color: "text-teal-600", description: "Environmental footprint" },
    F: { name: "Flood Resistance", color: "text-indigo-600", description: "Disaster preparedness" }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Urban Resilience Parameters</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(parameters).map(([key, value]) => {
          const param = parameterDescriptions[key];
          const normalizedValue = Math.max(0, Math.min(100, (value + 50) * 0.4)); // Normalize -50 to 250 range to 0-100
          
          return (
            <div key={key} className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className={`font-semibold ${param.color}`}>
                  {key} - {param.name}
                </span>
                <span className="text-sm font-mono">{value.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${param.color.replace('text-', 'from-')} to-gray-300`}
                  style={{ width: `${normalizedValue}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1">{param.description}</span>
            </div>
          );
        })}
      </div>
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
        {cell.owner && cell.owner !== "TERRAIN" && cell.owner !== "INFRA" && (
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