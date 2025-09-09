"use client";

import React from "react";
import {
  buildingIcons,
  buildingIconColors,
  buildingColorMap,
  buildingNames,
} from "./Utils";

const Legend = () => {
  // Define the koto game legend sections based on TERRAIN_AND_PROJECTS
  const terrainTypes = [
    { type: 0, name: "Empty", symbol: ".", description: "Buildable land", category: "Terrain" },
    { type: 1, name: "Water", symbol: "~", description: "Natural water body - non-buildable", category: "Terrain" },
    { type: 2, name: "Road", symbol: "=", description: "Major transportation infrastructure - non-buildable", category: "Terrain" },
  ];

  const basicDevelopment = [
    { type: 100, name: "House", symbol: "H", description: "Standard residential housing", category: "Basic Development" },
    { type: 101, name: "Shop", symbol: "S", description: "Commercial retail space", category: "Basic Development" },
    { type: 102, name: "Office", symbol: "O", description: "Commercial office building", category: "Basic Development" },
    { type: 103, name: "Factory", symbol: "F", description: "Industrial manufacturing facility", category: "Basic Development" },
  ];

  const resilienceProjects = [
    { type: 201, name: "Park", symbol: "P", description: "Green park for community recreation", category: "Resilience Project" },
    { type: 202, name: "Shelter", symbol: "C", description: "Community resilience center", category: "Resilience Project" },
    { type: 203, name: "Watergate", symbol: "G", description: "Renewable energy infrastructure", category: "Resilience Project" },
    { type: 204, name: "Flood Barrier", symbol: "B", description: "Climate protection infrastructure", category: "Resilience Project" },
  ];

  // Component to render a legend item with icon
  const LegendItem = ({ type, name, symbol, description, category }) => {
    const IconComponent = buildingIcons[type];
    const iconColor = buildingIconColors[type];
    const bgClass = buildingColorMap[type] || "bg-gray-100";

    return (
      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        {/* Visual cell with icon */}
        <div className={`w-14 h-14 border-2 border-gray-300 rounded ${bgClass} flex items-center justify-center`}>
          <IconComponent 
            size={24} 
            color={iconColor}
          />
        </div>
        {/* Info */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{name}</span>
            <span className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">{symbol}</span>
          </div>
          <span className="text-sm text-gray-600 mt-1">{description}</span>
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
      <div className="space-y-2">
        {items.map((item) => (
          <LegendItem key={item.type} {...item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">SimCity Scale-Up Koto - Game Legend</h1>
        <p className="text-lg text-gray-600">
          Urban resilience simulation with 6-parameter system (G, V, D, A, S, F) on a 12×12 grid
        </p>
      </div>

      {/* Urban Resilience Parameters */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Urban Resilience Parameters</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div><strong className="text-green-700">G - Greenery:</strong> Urban green spaces, biodiversity</div>
          <div><strong className="text-blue-700">V - Vitality:</strong> Economic activity, social vibrancy</div>
          <div><strong className="text-purple-700">D - Density:</strong> Population density, development</div>
          <div><strong className="text-orange-700">A - Adaptability:</strong> Climate adaptation capacity</div>
          <div><strong className="text-teal-700">S - Sustainability:</strong> Environmental footprint</div>
          <div><strong className="text-indigo-700">F - Flood Resistance:</strong> Disaster preparedness</div>
        </div>
      </div>
      
      {/* Legend Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Terrain Types (with icons) */}
        <LegendSection
          title="Terrain Types"
          items={terrainTypes}
          bgColor="bg-green-50"
        />

        {/* Basic Development (with icons) */}
        <LegendSection
          title="Basic Development Projects"
          items={basicDevelopment}
          bgColor="bg-orange-50"
        />

        {/* Resilience Projects (with icons) */}
        <div className="lg:col-span-2">
          <LegendSection
            title="Resilience Projects"
            items={resilienceProjects}
            bgColor="bg-emerald-50"
          />
        </div>
      </div>

      {/* Player Information */}
      <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
        <h2 className="text-xl font-semibold text-purple-900 mb-4">Player Archetypes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded border">
            <strong className="text-purple-800">P1 - Community-Focused Player:</strong>
            <p className="text-sm text-gray-600 mt-1">Prioritizes social infrastructure and community benefits</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <strong className="text-blue-800">P2 - Balanced Urban Planner:</strong>
            <p className="text-sm text-gray-600 mt-1">Balances economic, environmental, and social factors</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <strong className="text-green-800">P3 - Economic Efficiency Player:</strong>
            <p className="text-sm text-gray-600 mt-1">Focuses on maximum economic returns and efficiency</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <strong className="text-emerald-800">P4 - Environmental Specialist:</strong>
            <p className="text-sm text-gray-600 mt-1">Emphasizes sustainability and environmental protection</p>
          </div>
        </div>
      </div>

      {/* Game Rules */}
      <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4">Game Rules & Mechanics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Building System</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>• <strong>Terrain:</strong> Fixed elements, cannot be modified</li>
              <li>• <strong>Empty cells:</strong> Can be built on by players</li>
              <li>• <strong>Building lifecycle:</strong> 80 turns with 2% decay per turn</li>
              <li>• <strong>Building replacement:</strong> Allowed when income drops below 30%</li>
              <li>• <strong>Income starts:</strong> From turn 2 after construction</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Resources & Effects</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>• <strong>Player resources:</strong> Money and Reputation</li>
              <li>• <strong>Building effects:</strong> Impact on 6 urban parameters</li>
              <li>• <strong>Neighbor effects:</strong> Buildings influence adjacent cells</li>
              <li>• <strong>Grid size:</strong> 12×12 with pre-built initial layout</li>
              <li>• <strong>Episode limit:</strong> 60 turns per simulation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend; 