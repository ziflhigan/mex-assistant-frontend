// src/utils/dateFormatter.js

/**
 * Formats a date object into a string representation.
 * @param {Date} date - The date object to format.
 * @param {string} [format='MM/dd/yyyy'] - The desired format string.
 *   Supported tokens:
 *     - MM: Month (01-12)
 *     - dd: Day (01-31)
 *     - yyyy: Year (4 digits)
 *     - HH: Hours (00-23)
 *     - mm: Minutes (00-59)
 *     - ss: Seconds (00-59)
 * @returns {string} The formatted date string, or "Invalid Date" if the input is not a valid date.
 */
export function formatDate(date, format = 'MM/dd/yyyy') {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Formats a date object into a more human-readable relative time string (e.g., "2 hours ago").
 * @param {Date} date - The date object to format.
 * @returns {string} The relative time string, or "Invalid Date" if the input is not a valid date.
 */
export function formatRelativeTime(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(date); // Fallback to standard date formatting for older dates
  }
}

// You can add more date formatting functions as needed, such as:
// - formatDateToISO(date)
// - formatTimeTo12Hour(date)
// - getDayOfWeek(date)
// - etc.