/**
 * Formats a number as currency (e.g., USD, MYR).
 * TODO: Enhance to support different currency codes based on context/settings.
 * For now, assumes a generic '$' prefix or MYR.
 *
 * @param {number} value - The number to format.
 * @param {string} currency - Currency code (e.g., 'MYR', 'USD'). Defaults based on location context if available.
 * @returns {string} Formatted currency string.
 */
export const formatCurrency = (value, currency = 'MYR') => {
  // Basic formatting, enhance with locale awareness
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency, // Use MYR for Malaysia context or make dynamic
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Intl might not support all codes perfectly, adjust prefix/suffix manually if needed
  // Example simple override:
  if (currency === 'MYR' && !formatter.format(value).includes('RM')) {
      return `RM${value.toFixed(2)}`;
  }
  return formatter.format(value);
};

/**
 * Formats a number as a percentage string.
 *
 * @param {number} value - The decimal value (e.g., 0.125 for 12.5%).
 * @returns {string} Formatted percentage string (e.g., "12.5%").
 */
export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`;
};

/**
 * Formats a number with commas as thousands separators.
 *
 * @param {number} value - The number to format.
 * @returns {string} Formatted number string.
 */
export const formatNumber = (value) => {
  return value.toLocaleString('en-US');
};