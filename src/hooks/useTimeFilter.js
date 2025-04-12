import { useState, useCallback, useMemo } from 'react';
import { REFERENCE_DATE } from '../services/mockService';

/**
 * Custom hook for managing time filters in the dashboard
 * Provides functionality for selecting time periods and generating date ranges
 * **Uses REFERENCE_DATE from mockService for calculations**
 *
 * @param {string} initialFilter - Initial time filter value ('today', 'week', 'month', 'year')
 * @returns {Object} Time filter state and helper functions
 */
const useTimeFilter = (initialFilter = 'week') => {
  const [timeFilter, setTimeFilter] = useState(initialFilter.toLowerCase());

  // Handle time filter change
  const handleTimeFilterChange = useCallback((filter) => {
    if (typeof filter === 'string') {
      setTimeFilter(filter.toLowerCase());
    }
  }, []);

  // Get the date range for the current time filter
  const getDateRange = useCallback(() => {
    // --- USE REFERENCE DATE ---
    const now = new Date(REFERENCE_DATE);
    let startDate, endDate;

    // Ensure endDate defaults to end of the reference day if not otherwise set
    endDate = new Date(now);
    endDate.setHours(23, 59, 59, 999);

    switch (timeFilter) {
      case 'today':
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        // endDate already set to end of reference day
        break;
      case 'yesterday':
        // Yesterday relative to reference date
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate); // End of yesterday
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'week': // Week containing reference date (Mon-Sun)
        { startDate = new Date(now);
        const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon,...
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to start on Monday
        startDate.setDate(diff);
        startDate.setHours(0, 0, 0, 0);
        // End date is end of Sunday this week
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // Monday + 6 days = Sunday
        endDate.setHours(23, 59, 59, 999);
        break; }
      case 'month': // Month containing reference date
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of current month
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'year': // Year containing reference date
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31); // Dec 31st
        endDate.setHours(23, 59, 59, 999);
        break;
        // Keep last7days and last30days relative to the reference date for consistency
      case 'last7days':
        endDate = new Date(now); // End is the reference date
        endDate.setHours(23, 59, 59, 999);
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 6); // Reference date counts as day 1
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'last30days':
        endDate = new Date(now); // End is the reference date
        endDate.setHours(23, 59, 59, 999);
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 29); // Reference date counts as day 1
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'quarter': // Quarter containing reference date
        { const quarter = Math.floor(now.getMonth() / 3); // 0, 1, 2, 3
        startDate = new Date(now.getFullYear(), quarter * 3, 1); // Month is 0-indexed
        endDate = new Date(now.getFullYear(), quarter * 3 + 3, 0); // Last day of quarter end month
        endDate.setHours(23, 59, 59, 999);
        break; }
      default: // Default to 'week' as initialFilter might change
        { console.warn(`Unsupported timeFilter "${timeFilter}" in getDateRange, defaulting to week.`);
        const weekRange = getDateRange('week'); // Recursive call for week
        startDate = weekRange.startDate;
        endDate = weekRange.endDate; }
    }
    // console.log(`[useTimeFilter] getDateRange for ${timeFilter}: ${startDate.toISOString()} to ${endDate.toISOString()}`);
    return { startDate, endDate };
  }, [timeFilter]); // Depend only on timeFilter

  // Get start date as Date object
  const getStartDate = useCallback(() => {
    return getDateRange().startDate;
  }, [getDateRange]);

  // Get end date as Date object
  const getEndDate = useCallback(() => {
    return getDateRange().endDate;
  }, [getDateRange]);

  // Get formatted date range string
  const getFormattedDateRange = useCallback(() => {
    const { startDate, endDate } = getDateRange();

    if (!startDate || !endDate) return "Invalid Date Range";

    const formatDate = (date) => {
      const options = { month: 'short', day: 'numeric' };
      // --- USE REFERENCE DATE for year comparison ---
      if (date.getFullYear() !== REFERENCE_DATE.getFullYear()) {
        options.year = 'numeric';
      }
      return date.toLocaleDateString('en-US', options);
    };

    // Handle single-day cases
    if (timeFilter === 'today') return 'Today';
    if (timeFilter === 'yesterday') return 'Yesterday';

    // Check if start and end date are the same (can happen with default or specific logic)
    if (startDate.toDateString() === endDate.toDateString()) {
      return formatDate(startDate);
    }

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }, [getDateRange, timeFilter]); // Include timeFilter dependency

  // Get comparison text for stats (e.g., "vs. last week") - This remains unchanged
  const getComparisonText = useCallback(() => {
    switch (timeFilter) {
      case 'today': return 'vs. yesterday';
      case 'week': return 'vs. last week';
      case 'month': return 'vs. last month';
      case 'quarter': return 'vs. last quarter';
      case 'year': return 'vs. last year';
      case 'last7days': return 'vs. previous 7 days'; // Clarified
      case 'last30days': return 'vs. previous 30 days'; // Clarified
      default: return 'vs. previous period';
    }
  }, [timeFilter]);

  // Get available time filter options - This remains unchanged
  const timeFilterOptions = useMemo(() => {
    // Consider if 'Yesterday' is needed if 'Today' is the main focus
    return [
      // { value: 'today', label: 'Today' },
      // { value: 'yesterday', label: 'Yesterday' },
      { value: 'week', label: 'Week' }, // Based on reference date
      { value: 'month', label: 'Month' }, // Based on reference date
      { value: 'year', label: 'Year' }, // Based on reference date
      // { value: 'last7days', label: 'Last 7 Days' }, // Relative to reference date
      // { value: 'last30days', label: 'Last 30 Days' } // Relative to reference date
      // { value: 'quarter', label: 'This Quarter' }, // Based on reference date
    ];
  }, []); // Options don't change

  // Return all needed functions and values
  return {
    timeFilter,
    handleTimeFilterChange,
    getDateRange,
    getStartDate,
    getEndDate,
    getFormattedDateRange,
    getComparisonText,
    timeFilterOptions
  };
};

export default useTimeFilter;