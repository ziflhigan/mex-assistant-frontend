/**
 * Defines default options for Chart.js charts for consistency.
 *
 * @param {object} customOptions - Options to merge with defaults.
 * @returns {object} Merged chart options.
 */
export const getDefaultChartOptions = (customOptions = {}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to fill container height
    plugins: {
      legend: {
        display: false, // Often legends are not needed or custom ones are better
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#666' }, // Example: style ticks
        grid: { color: '#eee' }, // Example: style grid lines
      },
      x: {
        ticks: { color: '#666' },
        grid: { display: false }, // Often hide x-axis grid lines
      },
    },
    // Add more default styling options as needed
    // ...
  };

  // Deep merge custom options (basic example, consider lodash/merge for complex merge)
  return { ...defaultOptions, ...customOptions };
};

/**
 * Processes raw data (e.g., from mockService) into a format suitable for Chart.js datasets.
 * TODO: Implement specific data transformation logic based on chart type and data source.
 *
 * @param {Array<object>} rawData - Array of data points.
 * @param {string} labelField - The field in rawData for chart labels (x-axis).
 * @param {string} valueField - The field in rawData for chart values (y-axis).
 * @param {string} datasetLabel - Label for the dataset.
 * @returns {object} Object containing 'labels' and 'datasets' arrays for Chart.js.
 */
export const formatDataForChart = (rawData, labelField, valueField, datasetLabel) => {
  // Placeholder implementation - real implementation depends on data structure
  const labels = rawData.map(item => item[labelField]);
  const data = rawData.map(item => item[valueField]);

  return {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        // Add default styling (borderColor, backgroundColor) here or pass dynamically
        borderColor: '#00b14f', // Example Grab Green
        backgroundColor: 'rgba(0, 177, 79, 0.1)',
        tension: 0.4, // For line charts
        fill: true, // For line charts area fill
      },
      // Add more datasets if needed
    ],
  };
};