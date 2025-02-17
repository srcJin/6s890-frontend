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
  P1: { role: "Altruistic Player", resources: { money: 50, reputation: 50 } },
  P2: { role: "Balanced Player", resources: { money: 50, reputation: 50 } },
  P3: { role: "Interest Driven Player", resources: { money: 50, reputation: 50 } },
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
  // console.log("After Reset Observation: ", observation);
  // console.log("After Reset Observation: ", observation.length);
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
  console.log("parseObservationForBoard Board: ", board);
  return board;


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