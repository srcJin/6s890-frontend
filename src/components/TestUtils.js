import React from 'react';

// Test export file - Components with proper props handling for koto environment
export const testIconComponents = {
  // Terrain types (0-2)
  0: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>⬜</div>
  ),  // Empty - buildable land
  1: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🌊</div>
  ),  // Water - natural water body  
  2: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🛣️</div>
  ),  // Road - transportation infrastructure
  
  // Basic development projects (100-103)
  100: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏠</div>
  ),  // House - residential housing
  101: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏪</div>
  ),  // Shop - commercial retail
  102: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏢</div>
  ),  // Office - commercial office building  
  103: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏭</div>
  ),  // Factory - industrial manufacturing
  
  // Resilience projects (201-204)
  201: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🌳</div>
  ),  // Park - green park for recreation
  202: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏛️</div>
  ),  // Shelter - community resilience center
  203: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>☀️</div>
  ),  // Watergate - renewable energy infrastructure
  204: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🛡️</div>
  ),  // Flood Barrier - climate protection infrastructure
  
  // Legacy support
  "-1": ({ size = 32, style = {}, title = "", ...props }) => null,       // Empty
  [-1]: ({ size = 32, style = {}, title = "", ...props }) => null,       // Empty (numeric key)
  
  // Additional terrain and infrastructure types for legend
  "River": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🌊</div>
  ),
  "Mountain": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>⛰️</div>
  ),
  "Lake": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏞️</div>
  ),
  "Highway": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🛣️</div>
  ),
  "Railway": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🚆</div>
  ),
  "Hospital": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏥</div>
  ),
  "School": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏫</div>
  ),
  "FireStation": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🚒</div>
  ),
  "PowerPlant": ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏭</div>
  ),
};

export const testIconStyles = {
  // Terrain types (0-2)
  0: { color: "transparent" },     // Empty - transparent
  1: { color: "#1e40af" },         // Water - Blue-800  
  2: { color: "#4b5563" },         // Road - Gray-600
  
  // Basic development projects (100-103)
  100: { color: "#1e3a8a" },       // House - Blue-800
  101: { color: "#b91c1c" },       // Shop - Red-700
  102: { color: "#6b21a8" },       // Office - Purple-800
  103: { color: "#c2410c" },       // Factory - Orange-700
  
  // Resilience projects (201-204)
  201: { color: "#065f46" },       // Park - Green-800
  202: { color: "#c2410c" },       // Shelter - Orange-700
  203: { color: "#a16207" },       // Watergate - Yellow-700
  204: { color: "#6b21a8" },       // FloodBarrier - Purple-800
  
  // Legacy support
  "-1": { color: "#d1d5db" },
  [-1]: { color: "#d1d5db" },
  
  // Terrain types
  "River": { color: "#3b82f6" }, // Blue
  "Mountain": { color: "#6b7280" }, // Gray
  "Lake": { color: "#0ea5e9" }, // Light blue
  "Highway": { color: "#4b5563" }, // Dark gray
  "Railway": { color: "#eab308" }, // Yellow
  
  // Infrastructure types
  "Hospital": { color: "#dc2626" }, // Red
  "School": { color: "#059669" }, // Green
  "FireStation": { color: "#dc2626" }, // Red
  "PowerPlant": { color: "#eab308" }, // Yellow
};
