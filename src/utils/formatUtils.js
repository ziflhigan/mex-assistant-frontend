/**
 * Formatting utilities for the MEX Assistant
 * Provides consistent formatting of dates, currency, numbers, etc.
 */

import { FORMAT_OPTIONS, TIME_PERIODS, COLORS } from './constants.js';

/**
 * Format a monetary value as currency
 * @param {number} value - Value to format
 * @param {string} currency - Currency code (default USD)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
    if (value === undefined || value === null) return '$0.00';

    const options = {...FORMAT_OPTIONS.currency};
    if (currency !== 'USD') {
        options.currency = currency;
    }

    return new Intl.NumberFormat('en-US', options).format(value);
};

/**
 * Format a number with commas and optional decimal places
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted number string
 */
export const formatNumber = (value, decimals = 0) => {
    if (value === undefined || value === null) return '0';

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
};

/**
 * Format a percentage value
 * @param {number} value - Value to format (0.1 = 10%)
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
    if (value === undefined || value === null) return '0%';

    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
};

/**
 * Format a date for display
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'full', 'time', etc.)
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = 'full') => {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    switch (format) {
        case 'short':
            return dateObj.toLocaleDateString('en-US', FORMAT_OPTIONS.shortDate);
        case 'time':
            return dateObj.toLocaleTimeString('en-US', FORMAT_OPTIONS.time);
        case 'datetime':
            return `${dateObj.toLocaleDateString('en-US', FORMAT_OPTIONS.shortDate)} ${dateObj.toLocaleTimeString('en-US', FORMAT_OPTIONS.time)}`;
        case 'weekday':
            return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        case 'month':
            return dateObj.toLocaleDateString('en-US', { month: 'long' });
        case 'year':
            return dateObj.getFullYear().toString();
        case 'MM/dd':
            return `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}`;
        case 'full':
        default:
            return dateObj.toLocaleDateString('en-US', FORMAT_OPTIONS.date);
    }
};

/**
 * Format a time duration (minutes) as a readable string
 * @param {number} minutes - Duration in minutes
 * @returns {string} - Formatted duration string
 */
export const formatDuration = (minutes) => {
    if (minutes === undefined || minutes === null) return '0 min';

    if (minutes < 60) {
        return `${minutes.toFixed(1)} min`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = Math.round((minutes % 60) * 10) / 10;

    if (mins === 0) {
        return `${hours} hr`;
    }

    return `${hours} hr ${mins} min`;
};

/**
 * Format a change percentage with + or - prefix
 * @param {number} value - Change value as decimal (0.05 = 5%)
 * @param {boolean} alwaysShowSign - Whether to show + sign for positive values
 * @returns {string} - Formatted change string (e.g., +5.0%, -3.2%)
 */
export const formatChange = (value, alwaysShowSign = true) => {
    if (value === undefined || value === null) return '0%';

    const sign = value > 0 ? '+' : '';
    const formattedValue = formatPercentage(Math.abs(value));

    return value < 0 ? `-${formattedValue}` : (alwaysShowSign ? `+${formattedValue}` : formattedValue);
};

/**
 * Get the text for comparison period based on the current time filter
 * @param {string} timeFilter - Current time filter
 * @returns {string} - Comparison text (e.g., "vs. last week")
 */
export const getComparisonText = (timeFilter) => {
    switch (timeFilter) {
        case TIME_PERIODS.TODAY:
            return 'vs. yesterday';
        case TIME_PERIODS.WEEK:
            return 'vs. last week';
        case TIME_PERIODS.MONTH:
            return 'vs. last month';
        case TIME_PERIODS.YEAR:
            return 'vs. last year';
        default:
            return 'vs. previous period';
    }
};

/**
 * Format a time value (hour) as 12-hour time with AM/PM
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @returns {string} - Formatted time string (e.g., "12 AM", "3 PM")
 */
export const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';

    return hour < 12
        ? `${hour} AM`
        : `${hour - 12} PM`;
};

/**
 * Get color for trend (positive/negative)
 * @param {number|string} value - Trend value
 * @returns {string} - CSS color for the trend
 */
export const getTrendColor = (value) => {
    if (typeof value === 'string') {
        return value.includes('+') || value.includes('positive')
            ? COLORS.grabGreen
            : COLORS.accentRed;
    }

    return value > 0 ? COLORS.grabGreen : COLORS.accentRed;
};

/**
 * Create a readable time range from hours array
 * @param {number[]} hours - Array of hours (0-23)
 * @returns {string} - Formatted time range string
 */
export const formatTimeRange = (hours) => {
    if (!hours || hours.length === 0) return '';

    hours.sort((a, b) => a - b);

    let ranges = [];
    let rangeStart = hours[0];
    let rangeEnd = hours[0];

    for (let i = 1; i < hours.length; i++) {
        if (hours[i] === rangeEnd + 1) {
            rangeEnd = hours[i];
        } else {
            ranges.push(rangeStart === rangeEnd
                ? formatHour(rangeStart)
                : `${formatHour(rangeStart)} - ${formatHour(rangeEnd)}`);
            rangeStart = rangeEnd = hours[i];
        }
    }

    ranges.push(rangeStart === rangeEnd
        ? formatHour(rangeStart)
        : `${formatHour(rangeStart)} - ${formatHour(rangeEnd)}`);

    return ranges.join(', ');
};

export default {
    formatCurrency,
    formatNumber,
    formatPercentage,
    formatDate,
    formatDuration,
    formatChange,
    getComparisonText,
    formatHour,
    getTrendColor,
    formatTimeRange
};