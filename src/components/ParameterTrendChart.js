"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ParameterTrendChart = ({ simulationEpisode, currentTurnIndex }) => {
  if (!simulationEpisode || simulationEpisode.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Parameter Trends</h3>
        <p className="text-gray-500">No data available. Run a simulation to see parameter trends.</p>
      </div>
    );
  }

  const extractParametersFromObservation = (observation) => {
    if (!Array.isArray(observation) || observation.length < 864) {
      return null;
    }
    
    const gridData = observation.slice(0, 864);
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
    
    const numCells = 144;
    Object.keys(parameters).forEach(key => {
      parameters[key] = parameters[key] / numCells;
    });
    
    return parameters;
  };

  const extractHistoricalData = () => {
    const historicalData = {
      G: [], V: [], D: [], A: [], S: [], F: []
    };
    const labels = [];

    for (let i = 0; i <= currentTurnIndex && i < simulationEpisode.length; i++) {
      const turnData = simulationEpisode[i];
      if (turnData.observation && turnData.observation[0] && turnData.observation[0][0]) {
        const agentObservation = turnData.observation[0][0][0];
        const parameters = extractParametersFromObservation(agentObservation);
        
        if (parameters) {
          Object.keys(parameters).forEach(key => {
            historicalData[key].push(parameters[key]);
          });
          labels.push(`Turn ${turnData.t_env}`);
        }
      }
    }

    return { historicalData, labels };
  };

  const { historicalData, labels } = extractHistoricalData();

  const parameterDescriptions = {
    G: { name: "Greenery", color: "rgba(34, 197, 94, 1)", borderColor: "rgba(34, 197, 94, 1)" },
    V: { name: "Vitality", color: "rgba(59, 130, 246, 1)", borderColor: "rgba(59, 130, 246, 1)" },
    D: { name: "Density", color: "rgba(147, 51, 234, 1)", borderColor: "rgba(147, 51, 234, 1)" },
    A: { name: "Adaptability", color: "rgba(249, 115, 22, 1)", borderColor: "rgba(249, 115, 22, 1)" },
    S: { name: "Sustainability", color: "rgba(20, 184, 166, 1)", borderColor: "rgba(20, 184, 166, 1)" },
    F: { name: "Flood Resistance", color: "rgba(99, 102, 241, 1)", borderColor: "rgba(99, 102, 241, 1)" }
  };

  const chartData = {
    labels: labels,
    datasets: Object.keys(historicalData).map(key => ({
      label: parameterDescriptions[key].name,
      data: historicalData[key],
      borderColor: parameterDescriptions[key].borderColor,
      backgroundColor: parameterDescriptions[key].color.replace('1)', '0.1)'),
      borderWidth: 2,
      pointBackgroundColor: parameterDescriptions[key].borderColor,
      pointBorderColor: parameterDescriptions[key].borderColor,
      pointRadius: 1,
      tension: 0.2,
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'Urban Resilience Parameter Trends',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Simulation Turn',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Parameter Value',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="h-80 mb-4">
        <Line data={chartData} options={options} />
      </div>
      <div className="text-xs text-gray-500 mt-2">
        <p>Shows parameter evolution from the start of simulation to current turn ({currentTurnIndex + 1})</p>
      </div>
    </div>
  );
};

export default ParameterTrendChart;