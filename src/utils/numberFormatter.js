/**
 * Number formatting utility functions for the dashboard
 */

/**
 * Formats a number as currency (e.g., USD, MYR).
 *
 * @param {number} value - The number to format.
 * @param {string} currency - Currency code (e.g., 'MYR', 'USD'). Defaults based on location context.
 * @param {Object} options - Additional formatting options.
 * @returns {string} Formatted currency string.
 */
export const formatCurrency = (value, currency = 'USD', options = {}) => {
  if (value === null || value === undefined) {
    return '-';
  }

  try {
    // Basic formatting, enhance with locale awareness
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: options.minimumFractionDigits ?? 2,
      maximumFractionDigits: options.maximumFractionDigits ?? 2,
      ...options
    });

    // Special formatting for large numbers
    if (Math.abs(value) >= 1000000 && options.compact) {
      return formatter.format(value / 1000000) + 'M';
    } else if (Math.abs(value) >= 1000 && options.compact) {
      return formatter.format(value / 1000) + 'K';
    }

    // Intl might not support all codes perfectly, adjust prefix/suffix manually if needed
    // Example simple override:
    if (currency === 'MYR' && !formatter.format(value).includes('RM')) {
      return `RM${value.toFixed(options.maximumFractionDigits ?? 2)}`;
    }

    return formatter.format(value);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currency} ${value}`;
  }
};

/**
 * Formats a number as a percentage string.
 *
 * @param {number} value - The decimal value (e.g., 0.125 for 12.5%).
 * @param {Object} options - Formatting options
 * @returns {string} Formatted percentage string (e.g., "12.5%").
 */
export const formatPercentage = (value, options = {}) => {
  if (value === null || value === undefined) {
    return '-';
  }

  try {
    const {
      decimals = 1,
      alwaysShowSign = false,
      alwaysShowDecimals = false
    } = options;

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    // For values less than 1, treat as already in percentage form (0.125 = 12.5%)
    const percentValue = absValue < 1 ? absValue * 100 : absValue;

    // Format with fixed decimals
    let formatted = alwaysShowDecimals
      ? percentValue.toFixed(decimals)
      : percentValue.toFixed(decimals).replace(/\.0+$/, '');

    // Add sign if needed
    if (isNegative) {
      formatted = `-${formatted}`;
    } else if (alwaysShowSign && !isNegative) {
      formatted = `+${formatted}`;
    }

    return `${formatted}%`;
  } catch (error) {
    console.error('Error formatting percentage:', error);
    return `${value}%`;
  }
};

/**
 * Formats a number with commas as thousands separators.
 *
 * @param {number} value - The number to format.
 * @param {Object} options - Formatting options
 * @returns {string} Formatted number string.
 */
export const formatNumber = (value, options = {}) => {
  if (value === null || value === undefined) {
    return '-';
  }

  try {
    const {
      decimals = 0,
      compact = false,
      prefix = '',
      suffix = ''
    } = options;

    // Format large numbers in compact form
    if (compact) {
      if (Math.abs(value) >= 1000000000) {
        return `${prefix}${(value / 1000000000).toFixed(decimals)}B${suffix}`;
      }
      if (Math.abs(value) >= 1000000) {
        return `${prefix}${(value / 1000000).toFixed(decimals)}M${suffix}`;
      }
      if (Math.abs(value) >= 1000) {
        return `${prefix}${(value / 1000).toFixed(decimals)}K${suffix}`;
      }
    }

    // Format with Intl
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

    return `${prefix}${formatter.format(value)}${suffix}`;
  } catch (error) {
    console.error('Error formatting number:', error);
    return `${value}`;
  }
};

/**
 * Formats a duration in minutes to a readable format
 *
 * @param {number} minutes - Duration in minutes
 * @param {Object} options - Formatting options
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes, options = {}) => {
  if (minutes === null || minutes === undefined) {
    return '-';
  }

  try {
    const {
      showSeconds = false,
      compact = false
    } = options;

    if (showSeconds) {
      const totalSeconds = Math.round(minutes * 60);
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      if (hrs > 0) {
        return compact
          ? `${hrs}h ${mins}m ${secs}s`
          : `${hrs} hour${hrs !== 1 ? 's' : ''}, ${mins} minute${mins !== 1 ? 's' : ''}, ${secs} second${secs !== 1 ? 's' : ''}`;
      } else if (mins > 0) {
        return compact
          ? `${mins}m ${secs}s`
          : `${mins} minute${mins !== 1 ? 's' : ''}, ${secs} second${secs !== 1 ? 's' : ''}`;
      } else {
        return compact
          ? `${secs}s`
          : `${secs} second${secs !== 1 ? 's' : ''}`;
      }
    } else {
      const hrs = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);

      if (hrs > 0) {
        return compact
          ? `${hrs}h ${mins}m`
          : `${hrs} hour${hrs !== 1 ? 's' : ''}, ${mins} minute${mins !== 1 ? 's' : ''}`;
      } else {
        return compact
          ? `${mins}m`
          : `${mins} minute${mins !== 1 ? 's' : ''}`;
      }
    }
  } catch (error) {
    console.error('Error formatting duration:', error);
    return `${minutes} min`;
  }
};

/**
 * Formats a count with appropriate singular/plural suffix
 *
 * @param {number} count - The count to format
 * @param {string} singular - Singular form of the word
 * @param {string} plural - Plural form of the word
 * @returns {string} Formatted count with word
 */
export const formatCount = (count, singular, plural) => {
  if (count === null || count === undefined) {
    return '-';
  }

  try {
    const formatted = formatNumber(count);
    return `${formatted} ${count === 1 ? singular : (plural || `${singular}s`)}`;
  } catch (error) {
    console.error('Error formatting count:', error);
    return `${count} ${count === 1 ? singular : (plural || `${singular}s`)}`;
  }
};

export default {
  formatCurrency,
  formatPercentage,
  formatNumber,
  formatDuration,
  formatCount
};