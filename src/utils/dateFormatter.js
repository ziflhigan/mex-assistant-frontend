/**
 * Date formatting utility functions for the dashboard
 */

/**
 * Formats a date object or timestamp into a readable string.
 *
 * @param {Date|number|string} dateInput - The date to format.
 * @param {string} formatType - Format type: 'shortDate', 'longDate', 'time', 'dateTime', 'dayMonthYear', 'MM/dd'.
 * @param {Object} options - Additional formatting options.
 * @returns {string} Formatted date string.
 */
export const formatDate = (dateInput, formatType = 'shortDate', options = {}) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    switch (formatType) {
      case 'time':
        return date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          ...options
        });

      case 'dateTime':
        return date.toLocaleString('en-US', {
          dateStyle: 'short',
          timeStyle: 'short',
          ...options
        });

      case 'longDate':
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          ...options
        });

      case 'dayMonthYear':
        return date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          ...options
        });

      case 'dayMonth':
        return date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          ...options
        });

      case 'MM/dd':
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

      case 'shortDate':
      default:
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          ...options
        });
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Invalid Date';
  }
};

/**
 * Gets the time string (e.g., "10:30 AM") from a Date object.
 *
 * @param {Date} date - The date object.
 * @returns {string} Formatted time string.
 */
export const formatMessageTime = (date) => {
  return formatDate(date, 'time');
};

/**
 * Formats a date to display as a relative time (today, yesterday, 3 days ago, etc.)
 *
 * @param {Date|number|string} dateInput - The date to format.
 * @returns {string} Relative time string.
 */
export const getRelativeTime = (dateInput) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    // Check if it's today
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      if (diffMins < 1) {
        return 'Just now';
      }
      if (diffMins < 60) {
        return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
      }
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }

    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    }

    // Within 7 days
    if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }

    // Default: return formatted date
    return formatDate(date, 'shortDate');
  } catch (error) {
    console.error("Error calculating relative time:", error);
    return 'Invalid Date';
  }
};

/**
 * Gets the day of week from a date
 *
 * @param {Date|number|string} dateInput - The date to get day from
 * @param {boolean} short - Whether to return short name (Mon vs Monday)
 * @returns {string} Day of week
 */
export const getDayOfWeek = (dateInput, short = false) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const days = short ?
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return days[date.getDay()];
  } catch (error) {
    console.error("Error getting day of week:", error);
    return 'Invalid Date';
  }
};

/**
 * Formats a date range as a string
 *
 * @param {Date|string|number} startDate - Start date
 * @param {Date|string|number} endDate - End date
 * @param {string} format - Format type
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate, format = 'short') => {
  if (!startDate || !endDate) {
    return '';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid Date Range';
  }

  // Same day
  if (
    start.getDate() === end.getDate() &&
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return formatDate(start, format === 'short' ? 'shortDate' : 'longDate');
  }

  // Same month and year
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = start.toLocaleString('en-US', { month: format === 'short' ? 'short' : 'long' });
    const year = start.getFullYear();

    return `${month} ${startDay}-${endDay}, ${year}`;
  }

  // Different months or years
  return `${formatDate(start, format === 'short' ? 'shortDate' : 'dayMonthYear')} - ${formatDate(end, format === 'short' ? 'shortDate' : 'dayMonthYear')}`;
};

/**
 * Parses a date string in various formats
 *
 * @param {string} dateString - The date string to parse
 * @returns {Date|null} Parsed date or null if invalid
 */
export const parseDate = (dateString) => {
  if (!dateString) return null;

  // Try standard Date parsing
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date;
  }

  // Try MM/DD/YYYY format
  const mmddyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(dateString);
  if (mmddyyyy) {
    const [_, month, day, year] = mmddyyyy;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  // Try DD/MM/YYYY format
  const ddmmyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(dateString);
  if (ddmmyyyy) {
    const [_, day, month, year] = ddmmyyyy;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  return null;
};

export default {
  formatDate,
  formatMessageTime,
  getRelativeTime,
  getDayOfWeek,
  formatDateRange,
  parseDate
};