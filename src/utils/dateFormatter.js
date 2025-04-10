/**
 * Formats a date object or timestamp into a readable string.
 * TODO: Add more formats as needed (e.g., time only, full date+time).
 * Consider using a library like date-fns for more robust formatting.
 *
 * @param {Date|number|string} dateInput - The date to format.
 * @param {string} formatType - 'shortDate', 'time', 'dateTime'. Defaults to 'shortDate'.
 * @returns {string} Formatted date string.
 */
export const formatDate = (dateInput, formatType = 'shortDate') => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    switch (formatType) {
      case 'time':
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); // e.g., 10:30 AM
      case 'dateTime':
        return date.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }); // e.g., 4/10/2025, 8:47 PM
      case 'shortDate':
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., Apr 10
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Invalid Date';
  }
};

/**
 * Gets the time string (e.g., "10:30 AM") from a Date object.
 * Included specifically for chat message timestamps shown in mockup.
 * @param {Date} date - The date object.
 * @returns {string} Formatted time string.
 */
export const formatMessageTime = (date) => {
    return formatDate(date, 'time');
};