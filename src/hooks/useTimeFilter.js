// src/hooks/useTimeFilter.js
import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for managing time filter functionality in dashboard
 *
 * @param {string} initialFilter - Initial time filter value (today, week, month, year)
 * @returns {Object} Time filter state and helper functions
 */
const useTimeFilter = (initialFilter = 'today') => {
  const [timeFilter, setTimeFilter] = useState(initialFilter.toLowerCase());

  // Handle time filter change
  const handleTimeFilterChange = useCallback((newFilter) => {
    setTimeFilter(typeof newFilter === 'string' ? newFilter.toLowerCase() : newFilter);
  }, []);

  // Get relative date range based on the selected filter
  const getDateRange = useMemo(() => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (timeFilter) {
      case 'today':
        // Start date is beginning of today
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week': {
        // Start date is beginning of current week (Sunday as first day)
        const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
        startDate.setDate(now.getDate() - dayOfWeek);
        startDate.setHours(0, 0, 0, 0);
        break;
      }
      case 'month':
        // Start date is beginning of current month
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        break;


      case 'year':
        // Start date is beginning of current year
        startDate.setMonth(0);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        break;

      default:
        startDate.setHours(0, 0, 0, 0);
    }

    return {
      startDate,
      endDate
    };
  }, [timeFilter]);

  // Get appropriate date format based on time filter
  const getDateFormat = useCallback(() => {
    switch (timeFilter) {
      case 'today':
        return 'HH:mm'; // Hour format for today
      case 'week':
        return 'EEE'; // Day name for week view
      case 'month':
        return 'MMM d'; // Month and day for month view
      case 'year':
        return 'MMM yyyy'; // Month and year for year view
      default:
        return 'MM/dd/yyyy';
    }
  }, [timeFilter]);

  // Get comparison text based on time filter
  const getComparisonText = useCallback(() => {
    switch (timeFilter) {
      case 'today':
        return 'yesterday';
      case 'week':
        return 'last week';
      case 'month':
        return 'last month';
      case 'year':
        return 'last year';
      default:
        return 'previous period';
    }
  }, [timeFilter]);

  // Format the selected time filter for display
  const getDisplayText = useCallback(() => {
    const currentDate = new Date();

    switch (timeFilter) {
      case 'today':
        return 'Today';
      case 'yesterday':
        return 'Yesterday';
      case 'week': {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `This Week (${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
      }
      case 'month':
        return `${currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
      case 'year':
        return `${currentDate.getFullYear()}`;
      default:
        return 'Selected Period';
    }
  }, [timeFilter]);

  return {
    timeFilter,
    handleTimeFilterChange,
    getDateRange,
    getDateFormat,
    getComparisonText,
    getDisplayText
  };
};

export default useTimeFilter;