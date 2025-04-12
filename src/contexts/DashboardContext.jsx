import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {getDashboardData, getMockTopItems, getMockAiInsights} from '../services/mockService';
import useTimeFilter from '../hooks/useTimeFilter';

// Create the context
const DashboardContext = createContext();

// Create a custom hook to use the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Create the provider component
export const DashboardProvider = ({ children }) => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState({
    id: '5c1f8', // Default merchant ID
    name: 'Burger Factory 5c1f8'
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [cachedData, setCachedData] = useState({});
  const [dataLoadProgress, setDataLoadProgress] = useState(0);

  // Use the time filter hook with an initial value
  const {
    timeFilter,
    handleTimeFilterChange,
    getDateRange,
    getComparisonText,
    getStartDate,
    getEndDate
  } = useTimeFilter('week'); // Set default time filter to 'week'


  // Format the cache key
  const getCacheKey = useCallback((merchant, time) => {
    return `${merchant?.id || 'all'}_${time}`;
  }, []);

  // Function to check if we have cached data
  const hasCachedData = useCallback((merchant, time) => {
    const key = getCacheKey(merchant, time);
    return !!cachedData[key];
  }, [cachedData, getCacheKey]);

  // Fetch dashboard data based on time filter and selected merchant
  const fetchDashboardData = useCallback(async (options = {}, useCache = true) => {
    const { forceRefresh = false } = options;
    setRefreshing(forceRefresh);
    if (!forceRefresh) setLoading(true);
    setError(null);

    const cacheKey = getCacheKey(selectedMerchant, timeFilter);

    // Try to use cached data if available and not forcing refresh
    if (useCache && !forceRefresh && cachedData[cacheKey]) {
      setDashboardData(cachedData[cacheKey]);
      setLastUpdated(new Date());
      setLoading(false);
      setRefreshing(false);
      setDataLoadProgress(100);
      return;
    }

    try {
      // Set initial progress
      setDataLoadProgress(10);

      // Prepare options
      const fetchOptions = {
        timeFilter,
        merchantId: selectedMerchant?.id,
        startDate: getStartDate(),
        endDate: getEndDate()
      };

      console.log(`Fetching dashboard data for: ${JSON.stringify(fetchOptions)}`);

      // Fetch main dashboard data
      setDataLoadProgress(20);
      const dashboardResult = await getDashboardData(fetchOptions);
      setDataLoadProgress(60);

      // Fetch additional data in parallel for better performance
      const [topItemsResult, insightsResult] = await Promise.all([
        getMockTopItems(fetchOptions.merchantId, fetchOptions.timeFilter),
        getMockAiInsights(fetchOptions.merchantId, fetchOptions.timeFilter)
      ]);

      setDataLoadProgress(90);

      // Combine all data
      const combinedData = {
        ...dashboardResult,
        topItems: topItemsResult || dashboardResult.topItems,
        aiInsights: insightsResult || dashboardResult.aiInsights
      };

      console.log('Dashboard data loaded:', combinedData);

      // Update the data
      setDashboardData(combinedData);

      // Cache the data
      setCachedData(prev => ({
        ...prev,
        [cacheKey]: combinedData
      }));

      setLastUpdated(new Date());
      setDataLoadProgress(100);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [timeFilter, selectedMerchant, getCacheKey, cachedData, getStartDate, getEndDate]);

  // Fetch data when component mounts or dependencies change
  useEffect(() => {
    // Ensure we have a merchant ID before fetching
    if (selectedMerchant?.id) {
      console.log(`Initial data fetch for merchant: ${selectedMerchant.id}, timeFilter: ${timeFilter}`);
      fetchDashboardData();
    }
  }, [timeFilter, selectedMerchant, fetchDashboardData]);

  // Fetch data when component mounts or dependencies change
  useEffect(() => {
    // Ensure we have a merchant ID before fetching
    if (selectedMerchant?.id) {
      console.log(`DashboardContext: Initial data fetch trigger for merchant: ${selectedMerchant.id}, timeFilter: ${timeFilter}`);
      fetchDashboardData(); // This will now wait until getDataset resolves if it's the first call
    } else {
      console.log("DashboardContext: No selected merchant ID, skipping initial fetch.");
    }
    // NOTE: Removed fetchDashboardData from dependency array to avoid potential loops
    // if fetchDashboardData itself isn't perfectly stable via useCallback deps.
    // Relying on timeFilter and selectedMerchant should be sufficient.
  }, [timeFilter, selectedMerchant]); // Re-fetch when filter or merchant changes

  // Function to refresh dashboard data
  const refreshData = async () => {
    await fetchDashboardData({ forceRefresh: true }, false);
  };

  // Function to clear cache for testing purposes
  const clearCache = () => {
    setCachedData({});
  };

  // Check if there's any data for a specific section
  const hasData = (section) => {
    if (!dashboardData) return false;

    switch (section) {
      case 'salesTrend':
        return dashboardData.salesTrend && dashboardData.salesTrend.length > 0;
      case 'hourlySales':
        return dashboardData.hourlySales && dashboardData.hourlySales.length > 0;
      case 'dailySales':
        return dashboardData.dailySales && dashboardData.dailySales.length > 0;
      case 'topItems':
        return dashboardData.topItems && dashboardData.topItems.length > 0;
      case 'aiInsights':
        return dashboardData.aiInsights && dashboardData.aiInsights.length > 0;
      default:
        return false;
    }
  };

  // Get chart data for a specific metric over time
  const getMetricTrend = useCallback((metricName, period = 'week') => {
    if (!dashboardData || !dashboardData.salesTrend) return [];
    // For real implementation, this would analyze the data for the requested metric
    // For now, we'll just return sales trend
    return dashboardData.salesTrend;
  }, [dashboardData]);

  // Calculate period-over-period growth
  const calculateGrowth = useCallback((currentValue, previousValue) => {
    if (!previousValue || previousValue === 0) return 0;
    return ((currentValue - previousValue) / previousValue) * 100;
  }, []);

  // Get growth percentages for main metrics
  const getGrowthMetrics = useCallback(() => {
    if (!dashboardData) return null;

    // In a real app, we'd compare to previous period data
    // For mockup, we'll generate plausible random values
    const getRandomGrowth = () => (Math.random() * 30 - 10).toFixed(1);

    return {
      salesGrowth: getRandomGrowth(),
      ordersGrowth: getRandomGrowth(),
      aovGrowth: getRandomGrowth(),
      prepTimeGrowth: getRandomGrowth()
    };
  }, [dashboardData]);

  // Create the context value
  const contextValue = {
    dashboardData,
    timeFilter,
    selectedMerchant,
    loading,
    refreshing,
    error,
    lastUpdated,
    dataLoadProgress,
    handleTimeFilterChange,
    setSelectedMerchant,
    refreshData,
    getDateRange,
    getComparisonText,
    hasData,
    getMetricTrend,
    calculateGrowth,
    getGrowthMetrics,
    clearCache
  };

  return (
      <DashboardContext.Provider value={contextValue}>
        {children}
      </DashboardContext.Provider>
  );
};

export default DashboardContext;