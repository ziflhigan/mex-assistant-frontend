// src/utils/numberFormatter.js

/**
 * Formats a number as currency.
 * @param {number} number The number to format.
 * @param {string} [locale] The locale to use for formatting (e.g., 'en-US', 'fr-FR'). Defaults to browser's locale.
 * @param {string} [currency] The currency code (e.g., 'USD', 'EUR'). Defaults to 'USD'.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(number, locale = undefined, currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(number);
}

/**
 * Formats a number as a percentage.
 * @param {number} number The number to format (should be between 0 and 1).
 * @param {string} [locale] The locale to use for formatting. Defaults to browser's locale.
 * @returns {string} The formatted percentage string.
 */
export function formatPercentage(number, locale = undefined) {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
  }).format(number);
}

/**
 * Formats a number with commas for thousands separators.
 * @param {number} number The number to format.
 * @param {string} [locale] The locale to use for formatting. Defaults to browser's locale.
 * @returns {string} The formatted number string.
 */
export function formatNumber(number, locale = undefined) {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Formats a number with a fixed number of decimal places.
 * @param {number} number The number to format.
 * @param {number} [decimals=2] The number of decimal places to show.
 * @param {string} [locale] The locale to use for formatting. Defaults to browser's locale.
 * @returns {string} The formatted number string.
 */
export function formatDecimal(number, decimals = 2, locale = undefined) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}

// Example usage (for demonstration purposes, not executed in this environment)
// console.log(formatCurrency(1234.56)); // Output: $1,234.56 (or similar, depending on browser locale)
// console.log(formatCurrency(1234.56, 'fr-FR', 'EUR')); // Output: 1 234,56 €
// console.log(formatPercentage(0.75)); // Output: 75%
// console.log(formatNumber(1234567)); // Output: 1,234,567
// console.log(formatDecimal(12.3456, 3)); // Output: 12.346