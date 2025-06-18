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
  IoFlash
} from "react-icons/io5";

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
  
  // Terrain types (5-9)
  5: "bg-blue-500",         // River - deep blue
  6: "bg-gray-600",         // Mountain - dark gray
  7: "bg-blue-400",         // Lake - lighter blue
  8: "bg-gray-500",         // Highway - medium gray
  9: "bg-yellow-600",       // Railway - dark yellow
  
  // Infrastructure types (10-13)
  10: "bg-red-300",         // Hospital - red
  11: "bg-green-400",       // School - green
  12: "bg-red-500",         // FireStation - dark red
  13: "bg-yellow-500",      // PowerPlant - yellow
  
  // Special terrain and infrastructure colors (legacy)
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
  
  // Terrain types (5-9)
  5: "River",
  6: "Mountain",
  7: "Lake", 
  8: "Highway",
  9: "Railway",
  
  // Infrastructure types (10-13)
  10: "Hospital",
  11: "School",
  12: "Fire Station",
  13: "Power Plant",
};

// Icon mapping for building types
export const buildingIcons = {
  [-1]: IoSquare,     // Empty cell
  0: IoLeaf,          // Green Park
  1: IoHome,          // Resilient House
  2: IoPeople,        // Community Hub
  3: IoSunny,         // Solar Grid
  4: IoShield,        // Flood Barrier
  
  // Terrain types (5-9)
  5: IoWater,         // River
  6: IoTriangle,      // Mountain
  7: IoEllipse,       // Lake
  8: IoRemove,        // Highway
  9: IoTrain,         // Railway
  
  // Infrastructure types (10-13)
  10: IoMedkit,       // Hospital
  11: IoSchool,       // School
  12: IoFlame,        // Fire Station
  13: IoFlash,        // Power Plant
};

// Darker icon colors corresponding to cell backgrounds
export const buildingIconColors = {
  [-1]: "#6b7280",    // Gray-500 for empty cells
  0: "#065f46",       // Green-800 for green background
  1: "#1e3a8a",       // Blue-800 for blue background
  2: "#c2410c",       // Orange-700 for orange background
  3: "#a16207",       // Yellow-700 for yellow background
  4: "#6b21a8",       // Purple-800 for purple background
  
  // Terrain types (5-9)
  5: "#1e40af",       // Blue-800 for river
  6: "#374151",       // Gray-700 for mountain
  7: "#2563eb",       // Blue-600 for lake
  8: "#4b5563",       // Gray-600 for highway
  9: "#d97706",       // Amber-600 for railway
  
  // Infrastructure types (10-13)
  10: "#dc2626",      // Red-600 for hospital
  11: "#16a34a",      // Green-600 for school
  12: "#b91c1c",      // Red-700 for fire station
  13: "#ca8a04",      // Yellow-600 for power plant
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
 * 
 * Observation structure for scale-up environment (514 values total):
 * 1. Grid data (S, W, R, C): 8×8×4 = 256 values
 * 2. Resources: 2 values (money, reputation)
 * 3. Builders: 8×8 = 64 values
 * 4. Building types: 8×8 = 64 values  
 * 5. Terrain matrix: 8×8 = 64 values
 * 6. Infrastructure matrix: 8×8 = 64 values
 */
export const parseObservationForBoard = (observation) => {
  console.log("Parsing observation for 8x8 board, length:", observation?.length);
  
  // Handle flat observation format (array of numbers) from scale-up environment
  if (Array.isArray(observation) && observation.length === 514) {
    const gridDataSize = 8 * 8 * 4; // 256 values for grid data (S, W, R, C)
    const resourcesSize = 2; // money, reputation
    const gridSize = 8 * 8; // 64 values each for builders and building_types
    
    // Extract all sections from the observation
    const buildersStart = gridDataSize + resourcesSize; // Start at index 258
    const buildersEnd = buildersStart + gridSize; // End at index 322
    const buildingTypesStart = buildersEnd; // Start at index 322  
    const buildingTypesEnd = buildingTypesStart + gridSize; // End at index 386
    const terrainStart = buildingTypesEnd; // Start at index 386
    const terrainEnd = terrainStart + gridSize; // End at index 450
    const infrastructureStart = terrainEnd; // Start at index 450
    const infrastructureEnd = infrastructureStart + gridSize; // End at index 514
    
    const buildersFlat = observation.slice(buildersStart, buildersEnd);
    const buildingTypesFlat = observation.slice(buildingTypesStart, buildingTypesEnd);
    const terrainFlat = observation.slice(terrainStart, terrainEnd);
    const infrastructureFlat = observation.slice(infrastructureStart, infrastructureEnd);
    
    console.log("Builders data:", buildersFlat.slice(0, 10), "...");
    console.log("Building types data:", buildingTypesFlat.slice(0, 10), "...");
    console.log("Terrain data:", terrainFlat.filter(x => x !== -1), "...");
    console.log("Infrastructure data:", infrastructureFlat.filter(x => x !== -1), "...");
    
    const board = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        const builderVal = buildersFlat[i * 8 + j];
        const bType = buildingTypesFlat[i * 8 + j];
        const terrainVal = terrainFlat[i * 8 + j];
        const infraVal = infrastructureFlat[i * 8 + j];
        
        // Priority: Infrastructure > Terrain > Buildings
        // Infrastructure types: Hospital=0, School=1, FireStation=2, PowerPlant=3
        // Terrain types: River=0, Mountain=1, Lake=2, Highway=3, Railway=4
        let cellType = bType; // Default to building type
        let cellOwner = builderVal === -1 ? null : `P${builderVal + 1}`;
        
        if (infraVal !== -1) {
          // Infrastructure takes priority - map to special building types
          cellType = infraVal + 10; // Infrastructure types: 10-13
          cellOwner = "INFRA"; // Special owner for infrastructure
        } else if (terrainVal !== -1) {
          // Terrain takes priority over regular buildings
          cellType = terrainVal + 5; // Terrain types: 5-9
          cellOwner = "TERRAIN"; // Special owner for terrain
        }
        
        row.push({
          owner: cellOwner,
          type: cellType,
        });
      }
      board.push(row);
    }
    console.log("Parsed scale-up observation board with terrain/infrastructure:", board);
    return board;
  }
  
  // Handle structured observation format (dictionary-like) - fallback
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