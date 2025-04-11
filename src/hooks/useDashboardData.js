import { useState, useEffect, useCallback } from 'react';
import insightsService from '../services/insightsService';
import { getDashboardData } from '../services/mockService';

/**
 * Custom hook to fetch and manage dashboard data
 * @param {string} timeFilter - The selected time period (today, week, month, year)
 * @param {string} merchantId - Optional merchant ID to filter data
 * @param {boolean} useMock - Whether to use mock data (default: true for development)
 * @returns {Object} Dashboard data, loading state, error state, and refetch function
 */
const useDashboardData = (timeFilter = 'today', merchantId = null, useMock = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch dashboard data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let result;

      // Use mock or real service based on useMock flag
      if (useMock) {
        // Use mock service
        result = await getDashboardData();

        // Simulate different data for different time filters
        if (timeFilter !== 'today') {
          // Apply time-based transformations to mock data
          const multiplier = {
            'yesterday': 0.8,
            'week': 4.5,
            'month': 20,
            'year': 250
          }[timeFilter.toLowerCase()] || 1;

          // Apply the multiplier to numeric values
          result = transformDataByTimeFilter(result, multiplier, timeFilter);
        }
      } else {
        // Use real insights service with proper parameters
        result = await insightsService.getDashboardData({
          timeFilter,
          merchantId
        });
      }

      setData(result);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [timeFilter, merchantId, useMock]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Transform mock data based on timeFilter
  const transformDataByTimeFilter = (data, multiplier, timeFilter) => {
    if (!data) return data;

    // Time filter specific transformations
    const transformed = {
      ...data,
      totalSales: Math.round(data.totalSales * multiplier),
      totalOrders: Math.round(data.totalOrders * multiplier),
    };

    // Transform trend data according to the time filter
    if (data.salesTrend) {
      // For longer time periods, condense the data points
      if (timeFilter === 'month' || timeFilter === 'year') {
        transformed.salesTrend = aggregateTrendData(data.salesTrend, timeFilter);
      } else {
        // Scale the trend line values
        transformed.salesTrend = data.salesTrend.map(item => ({
          ...item,
          sales: item.sales * (0.8 + Math.random() * 0.4) * multiplier
        }));
      }
    }

    return transformed;
  };

  // Aggregate trend data for longer time periods
  const aggregateTrendData = (trendData, timeFilter) => {
    if (!trendData || trendData.length === 0) return [];

    // For monthly view, aggregate into weekly buckets
    if (timeFilter === 'month') {
      return aggregateByWeek(trendData);
    }

    // For yearly view, aggregate into monthly buckets
    if (timeFilter === 'year') {
      return aggregateByMonth(trendData);
    }

    return trendData;
  };

  // Helper to aggregate by week
  const aggregateByWeek = (data) => {
    const aggregated = [];
    for (let i = 0; i < data.length; i += 7) {
      const weekData = data.slice(i, i + 7);
      if (weekData.length === 0) continue;

      const totalSales = weekData.reduce((sum, item) => sum + item.sales, 0);
      const weekLabel = `Week ${Math.floor(i / 7) + 1}`;

      aggregated.push({
        date: weekData[0].date,
        sales: totalSales,
        label: weekLabel
      });
    }
    return aggregated;
  };

  // Helper to aggregate by month
  const aggregateByMonth = (data) => {
    const monthlyData = {};

    data.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          date: item.date,
          sales: 0,
          label: new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };
      }

      monthlyData[monthKey].sales += item.sales;
    });

    return Object.values(monthlyData);
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    lastUpdated
  };
};

export default useDashboardData;