import React from 'react';

// Test export file - Components with proper props handling
export const testIconComponents = {
  0: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🌳</div>
  ),  // Green Park
  1: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏠</div>
  ),  // Resilient House
  2: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🏢</div>
  ),  // Community Hub
  3: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>☀️</div>
  ),  // Solar Grid
  4: ({ size = 32, style = {}, title = "", ...props }) => (
    <div style={{ fontSize: `${size}px`, ...style }} title={title} {...props}>🛡️</div>
  ),  // Flood Barrier
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
  // Building types
  0: { color: "#22c55e" },
  1: { color: "#3b82f6" },
  2: { color: "#f97316" },
  3: { color: "#eab308" },
  4: { color: "#8b5cf6" },
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
