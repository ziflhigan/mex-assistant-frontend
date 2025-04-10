// src/utils/chartUtils.js

/**
 * This file contains utility functions for chart configurations and data processing.
 */

/**
 * Example function to format data for a line chart.
 * @param {Array} data - Array of data objects.
 * @param {string} labelKey - Key in data object for the label (e.g., date).
 * @param {string} valueKey - Key in data object for the value (e.g., sales).
 * @returns {object} - Object containing labels and datasets for a chart.js line chart.
 */
export function formatLineChartData(data, labelKey, valueKey) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return { labels: [], datasets: [] };
  }

  const labels = data.map((item) => item[labelKey]);
  const values = data.map((item) => item[valueKey]);

  const datasets = [
    {
      label: valueKey, // You might want to make this dynamic or configurable
      data: values,
      borderColor: "blue", // Example color, customize as needed
      tension: 0.4, // Smoothing of the line
    },
  ];

  return { labels, datasets };
}

/**
 * Example function to format data for a bar chart.
 * @param {Array} data - Array of data objects.
 * @param {string} labelKey - Key for the label.
 * @param {string} valueKey - Key for the value.
 * @returns {object} - Object for chart.js bar chart.
 */
export function formatBarChartData(data, labelKey, valueKey) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return { labels: [], datasets: [] };
  }

  const labels = data.map((item) => item[labelKey]);
  const values = data.map((item) => item[valueKey]);

  const datasets = [
    {
      label: valueKey,
      data: values,
      backgroundColor: "rgba(54, 162, 235, 0.8)", // Example color
    },
  ];

  return { labels, datasets };
}

// Add more chart-related utility functions as needed, such as:
// - Formatting data for pie charts
// - Generating chart options (e.g., tooltips, scales)
// - Functions to handle chart responsiveness
// - Color palettes
// - Data aggregation functions