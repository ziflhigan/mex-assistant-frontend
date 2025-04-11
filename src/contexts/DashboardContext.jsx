import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDashboardData, getTopItems, getAiInsights } from '../services/mockService';
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
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Use the time filter hook
  const {
    timeFilter,
    handleTimeFilterChange,
    getDateRange,
    getComparisonText
  } = useTimeFilter('today');

  // Fetch dashboard data based on time filter and selected merchant
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch dashboard data
        const options = {
          timeFilter,
          merchantId: selectedMerchant?.id
        };

        const dashboardResult = await getDashboardData(options);

        // Fetch additional data in parallel for better performance
        const [topItemsResult, insightsResult] = await Promise.all([
          getTopItems({ ...options, limit: 5 }),
          getAiInsights(options)
        ]);

        // Combine all data
        const combinedData = {
          ...dashboardResult,
          topItems: topItemsResult || dashboardResult.topItems,
          aiInsights: insightsResult || dashboardResult.aiInsights
        };

        setDashboardData(combinedData);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeFilter, selectedMerchant]);

  // Function to refresh dashboard data
  const refreshData = async () => {
    setLoading(true);
    try {
      const options = {
        timeFilter,
        merchantId: selectedMerchant?.id
      };

      const dashboardResult = await getDashboardData(options);
      setDashboardData(dashboardResult);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Failed to refresh dashboard data:', err);
      setError('Failed to refresh dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
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

  // Create the context value
  const contextValue = {
    dashboardData,
    timeFilter,
    selectedMerchant,
    loading,
    error,
    lastUpdated,
    handleTimeFilterChange,
    setSelectedMerchant,
    refreshData,
    getDateRange,
    getComparisonText,
    hasData
  };

  return (
      <DashboardContext.Provider value={contextValue}>
        {children}
      </DashboardContext.Provider>
  );
};

export default DashboardContext;