// src/utils/chartUtils.js

/**
 * Enhanced color palette for charts
 */
export const chartColors = {
  primary: '#00b14f', // Grab green
  secondary: '#3498db', // Blue
  accent1: '#e74c3c', // Red
  accent2: '#f1c40f', // Yellow
  accent3: '#9b59b6', // Purple
  accent4: '#2ecc71', // Green
  accent5: '#e67e22', // Orange
  background: 'rgba(0, 177, 79, 0.1)', // Light green background
  gridLines: 'rgba(0, 0, 0, 0.1)'
};

/**
 * Generate a gradient for chart backgrounds
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {string} startColor - Start color of gradient
 * @param {string} endColor - End color of gradient
 * @returns {CanvasGradient} A canvas gradient object
 */
export const createGradient = (ctx, startColor, endColor) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, startColor);
  gradient.addColorStop(1, endColor);
  return gradient;
};

/**
 * Get default chart options to ensure consistent styling
 * @param {boolean} isExpanded - Whether the chart is in expanded view
 * @returns {Object} Chart.js options object
 */
export const getDefaultChartOptions = (isExpanded = false) => {
  return {
    responsive: true,
    maintainAspectRatio: !isExpanded,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: "'Segoe UI', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 10,
        cornerRadius: 6,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          },
          padding: 5,
          color: '#666'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          },
          padding: 8,
          color: '#666'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5
      },
      line: {
        tension: 0.4
      }
    }
  };
};

/**
 * Generate test data for chart development
 * @param {string} type - Type of data to generate (daily, hourly, etc.)
 * @param {number} points - Number of data points
 * @returns {Array} Array of data points
 */
export const generateTestData = (type, points = 7) => {
  switch (type) {
    case 'sales-trend':
      return Array.from({ length: points }, (_, i) => ({
        date: new Date(Date.now() - (points - i - 1) * 86400000).toISOString(),
        sales: Math.floor(800 + Math.random() * 500),
        orders: Math.floor(30 + Math.random() * 20)
      }));

    case 'hourly-sales':
      return Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        sales: Math.floor(i >= 6 && i <= 20
            ? 100 + Math.random() * 200 * (i >= 11 && i <= 14 ? 1.5 : 1)
            : 20 + Math.random() * 80)
      }));

    case 'daily-sales':
      return [
        { day: 'Monday', sales: Math.floor(900 + Math.random() * 300) },
        { day: 'Tuesday', sales: Math.floor(800 + Math.random() * 300) },
        { day: 'Wednesday', sales: Math.floor(1000 + Math.random() * 300) },
        { day: 'Thursday', sales: Math.floor(1100 + Math.random() * 300) },
        { day: 'Friday', sales: Math.floor(1300 + Math.random() * 300) },
        { day: 'Saturday', sales: Math.floor(1200 + Math.random() * 300) },
        { day: 'Sunday', sales: Math.floor(800 + Math.random() * 300) }
      ];

    default:
      return [];
  }
};

export default {
  chartColors,
  createGradient,
  getDefaultChartOptions,
  generateTestData
};