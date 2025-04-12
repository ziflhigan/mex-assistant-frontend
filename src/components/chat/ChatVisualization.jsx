import React, { useEffect, useRef } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ChatVisualization = ({ type, chartType, data }) => {
  const chartRef = useRef(null);

  // Animation trigger when component mounts
  useEffect(() => {
    const element = document.getElementById(`chart-${data.title.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      element.classList.add('appear');
    }
  }, [data.title]);

  if (type === 'chart') {
    // Chart configuration
    const chartConfig = {
      labels: data.labels,
      datasets: data.series.map(series => ({
        label: series.name,
        data: series.values,
        borderColor: series.color,
        backgroundColor: `${series.color}33`, // Add transparency for fill
        tension: 0.4,
        fill: chartType === 'line', // Only fill area under line charts
        borderWidth: 2,
        pointBackgroundColor: series.color,
        pointRadius: 4,
        pointHoverRadius: 6
      }))
    };

    // Common options for all chart types
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          display: data.series.length > 1,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          padding: 12,
          cornerRadius: 6,
          caretSize: 6
        },
        title: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            padding: 10,
            font: {
              size: 11
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            padding: 10,
            font: {
              size: 11
            }
          }
        }
      }
    };

    // Specific options for chart types
    const chartOptions = {
      line: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins
        }
      },
      bar: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins
        },
        borderRadius: 4,
        maxBarThickness: 50
      }
    };

    return (
        <div
            id={`chart-${data.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="chart-container visualization-container"
        >
          <div className="visualization-header">
            <h4>{data.title}</h4>
          </div>
          <div className="chart-wrapper">
            {chartType === 'line' ? (
                <Line
                    ref={chartRef}
                    data={chartConfig}
                    options={chartOptions.line}
                    height={220}
                />
            ) : (
                <Bar
                    ref={chartRef}
                    data={chartConfig}
                    options={chartOptions.bar}
                    height={220}
                />
            )}
          </div>
        </div>
    );
  }

  if (type === 'table') {
    return (
        <div className="table-container visualization-container">
          <div className="visualization-header">
            <h4>{data.title}</h4>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
              <tr>
                {data.columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {data.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex === 0 ? 'highlight-row' : ''}>
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          {/* Add color dot for first column of first cell */}
                          {cellIndex === 0 && rowIndex < 5 ? (
                              <div className="item-with-color">
                          <span
                              className="color-dot"
                              style={{
                                backgroundColor: rowIndex === 0
                                    ? '#e74c3c' // Red for top item
                                    : ['#f1c40f', '#3498db', '#2ecc71', '#9b59b6'][rowIndex - 1] || '#95a5a6'
                              }}
                          ></span>
                                {cell}
                              </div>
                          ) : (
                              cell
                          )}
                        </td>
                    ))}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
    );
  }

  return null;
};

export default ChatVisualization;