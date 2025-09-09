"use client";

import React from "react";
import {
  buildingIcons,
  buildingIconColors,
  buildingColorMap,
  buildingNames,
} from "./Utils";

const Legend = () => {
  // Define the legend sections
  const buildingTypes = [
    { type: 0, category: "Residential" },
    { type: 1, category: "Commercial" },
    { type: 2, category: "Environmental" },
    { type: 3, category: "Community" },
    { type: 4, category: "Energy" },
    { type: 5, category: "Protection" },
  ];

  const terrainTypes = [
    { type: 6, category: "Water" },
    { type: 7, category: "Mountain" },
    { type: 8, category: "Water" },
    { type: 9, category: "Transport" },
    { type: 10, category: "Transport" },
  ];

  const infrastructureTypes = [
    { type: 11, category: "Healthcare" },
    { type: 12, category: "Education" },
    { type: 13, category: "Emergency" },
    { type: 14, category: "Utilities" },
  ];

  const emptyType = [{ type: -1, category: "Basic" }];

  // Component to render a legend item
  const LegendItem = ({ type, category }) => {
    const IconComponent = buildingIcons[type] || buildingIcons[-1];
    const iconColor = buildingIconColors[type] || buildingIconColors[-1];
    const bgClass = buildingColorMap[type] || "bg-gray-100";
    const name = buildingNames[type] || buildingNames[type.toString()] || "Unknown";

    return (
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
        {/* Icon cell */}
        <div className={`w-12 h-12 border border-gray-300 rounded ${bgClass} flex items-center justify-center`}>
          <IconComponent 
            size={24} 
            color={iconColor}
          />
        </div>
        {/* Name and category */}
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{name}</span>
          <span className="text-sm text-gray-500">{category}</span>
        </div>
      </div>
    );
  };

  // Component to render a legend section
  const LegendSection = ({ title, items, bgColor = "bg-white" }) => (
    <div className={`${bgColor} rounded-lg border border-gray-200 p-4`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => (
          <LegendItem key={item.type} type={item.type} category={item.category} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Legend</h2>
        <p className="text-gray-600">
          Building types, terrain features, and infrastructure in the urban planning simulation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Basic Elements */}
        <LegendSection
          title="Basic Elements"
          items={emptyType}
        />

        {/* Buildable Structures */}
        <LegendSection
          title="Buildable Structures"
          items={buildingTypes}
        />

        {/* Terrain Features */}
        <LegendSection
          title="Terrain Features"
          items={terrainTypes}
        />

        {/* Infrastructure */}
        <LegendSection
          title="Infrastructure"
          items={infrastructureTypes}
        />
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="text-lg font-semibold text-yellow-800 mb-2">How to Use</h4>
        <ul className="text-yellow-700 space-y-1 text-sm">
          <li>• <strong>Buildable Structures:</strong> Can be placed by players on empty cells</li>
          <li>• <strong>Terrain Features:</strong> Natural elements that cannot be built on</li>
          <li>• <strong>Infrastructure:</strong> Pre-built facilities that provide special benefits</li>
          <li>• <strong>Player Ownership:</strong> Player labels (P1, P2, P3, P4) appear on owned buildings</li>
        </ul>
      </div>
    </div>
  );
};

export default Legend; 