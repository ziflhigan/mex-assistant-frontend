// Import mock data from dedicated files
import mockMerchants, { getMerchantById } from '../data/mockMerchants';
import mockDashboardData, { REFERENCE_DATE, mockDashboardStats, mockSalesTrend, mockHourlySales, mockDailySales } from '../data/mockDashboardData';
import mockTopItems, { getTopItemsByMerchant } from '../data/mockTopItems';
import { mockAiInsights, getInsightsByMerchant, generateDynamicInsights } from '../data/mockAiInsight';
import { processMessage } from '../data/mockChatResponses';

// Import constants
import { TIME_PERIODS, DEFAULTS } from '../utils/constants';

// Mock delay to simulate API calls
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Re-export the reference date from dashboard data
export { REFERENCE_DATE } from '../data/mockDashboardData';

/**
 * Get dashboard statistics for a merchant and time period
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time period (today, week, month, year) - RECEIVED AS LOWERCASE
 * @returns {Object} - Dashboard statistics
 */
export const getMockDashboardStats = async (merchantId, period) => {
  await delay(250);

  // --- FIX: Capitalize the first letter of the period for lookup ---
  const capitalizedPeriod = period.charAt(0).toUpperCase() + period.slice(1);

  // Use the capitalized key for lookup
  // Ensure TIME_PERIODS.WEEK also resolves to the correct capitalized key ('Week') if used
  const periodStats = mockDashboardStats[capitalizedPeriod] || mockDashboardStats['Week']; // Use capitalized fallback too

  if (!periodStats) {
    console.warn(`No stats found for period: ${capitalizedPeriod}. Falling back to default Week.`);
    // Explicitly handle potential undefined if fallback also fails?
    // For now, assuming 'Week' always exists in mockDashboardStats
  }

  const merchantStats = periodStats[merchantId] || periodStats['default'];

  // Add a log to verify what's being returned
  console.log(`getMockDashboardStats for [${merchantId}, ${period}] (lookup: ${capitalizedPeriod}): Returning`, merchantStats);

  return merchantStats;
};

/**
 * Get sales trend data for a merchant and time period
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time period (Today, Week, Month, Year)
 * @returns {Array} - Sales trend data points
 */
export const getMockSalesTrend = async (merchantId, period) => {
  await delay(400);

  // Get the trend data for the requested period
  const periodData = mockSalesTrend[period] || mockSalesTrend[TIME_PERIODS.WEEK];

  // Get the data for the specified merchant or use default
  return periodData[merchantId] || periodData['default'];
};

/**
 * Get hourly sales data for a merchant and time period
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time period (Today, Week, Month, Year)
 * @returns {Array} - Hourly sales data points
 */
export const getMockHourlySales = async (merchantId, period) => {
  await delay(300);

  // For hourly sales, we'll use the pattern data and apply a multiplier based on the period
  const pattern = mockHourlySales.patterns[merchantId] || mockHourlySales.patterns['default'];

  // Apply multiplier based on time period
  const multipliers = {
    [TIME_PERIODS.TODAY]: 1,
    [TIME_PERIODS.WEEK]: 1.1,
    [TIME_PERIODS.MONTH]: 1.2,
    [TIME_PERIODS.YEAR]: 1.3
  };

  const multiplier = multipliers[period] || 1;

  // Return a modified copy of the pattern with adjusted sales values
  return pattern.map(item => ({
    ...item,
    sales: Math.round(item.sales * multiplier * 100) / 100
  }));
};

/**
 * Get daily sales data for a merchant and time period
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time period (Today, Week, Month, Year)
 * @returns {Array} - Daily sales data points
 */
export const getMockDailySales = async (merchantId, period) => {
  await delay(300);

  // Get daily sales data for the requested period
  const periodData = mockDailySales[period] || mockDailySales[TIME_PERIODS.WEEK];

  // Get the data for the specified merchant or use default
  return periodData[merchantId] || periodData['default'];
};

/**
 * Get top selling items for a merchant and time period
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time period (Today, Week, Month, Year)
 * @returns {Array} - Top selling items
 */
export const getMockTopItems = async (merchantId, period) => {
  await delay(350);
  return getTopItemsByMerchant(merchantId, period);
};

/**
 * Get list of all merchants
 * @returns {Array} - List of merchants
 */
export const getMockMerchants = async () => {
  await delay(100);
  return mockMerchants;
};

/**
 * Get AI insights for a merchant and time period
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time period (Today, Week, Month, Year)
 * @returns {Array} - AI insights
 */
export const getMockAiInsights = async (merchantId, period) => {
  await delay(500);

  // Get the static insights for the merchant and period
  const staticInsights = getInsightsByMerchant(merchantId, period);

  // Get stats for dynamic insights
  const stats = await getMockDashboardStats(merchantId, period);

  // Generate 1-2 dynamic insights based on merchant data
  const dynamicInsights = generateDynamicInsights(merchantId, period, stats);

  // Combine static and dynamic insights (up to 5 total)
  const combinedInsights = [...dynamicInsights, ...staticInsights];
  return combinedInsights.slice(0, 5);
};

/**
 * Process a chat message and generate a response
 * @param {string} message - User's message
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time context for the conversation
 * @returns {Object} - Response object with text and optional visualization
 */
export const getMockChatResponse = async (message, merchantId = DEFAULTS.MERCHANT_ID, period = TIME_PERIODS.WEEK) => {
  await delay(700);

  // Use the processMessage function from mockChatResponses.js
  return processMessage(message, merchantId, period);
};

/**
 * Get all dashboard data for a merchant and time period
 * @param {Object} options - Request options
 * @param {string} options.merchantId - Merchant ID
 * @param {string} options.timeFilter - Time period
 * @returns {Object} - Complete dashboard data
 */
export const getDashboardData = async ({ merchantId = DEFAULTS.MERCHANT_ID, timeFilter = TIME_PERIODS.WEEK }) => {
  try {
    const [stats, salesTrend, hourlySales, dailySales, topItems, aiInsights] = await Promise.all([
      getMockDashboardStats(merchantId, timeFilter),
      getMockSalesTrend(merchantId, timeFilter),
      getMockHourlySales(merchantId, timeFilter),
      getMockDailySales(merchantId, timeFilter),
      getMockTopItems(merchantId, timeFilter),
      getMockAiInsights(merchantId, timeFilter)
    ]);

    const combinedData = {
      ...stats,
      salesTrend,
      hourlySales,
      dailySales,
      topItems,
      aiInsights
    };

    return combinedData;
  } catch (error) {
    console.error('Error fetching mock dashboard data:', error);
    return {
      totalSales: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      prepTime: 0,
      salesTrend: [],
      hourlySales: [],
      dailySales: [],
      topItems: [],
      aiInsights: []
    };
  }
};

// Export all service functions
export default {
  // Main functions
  getDashboardData,
  getMockChatResponse,

  // Individual data retrieval functions
  getMockDashboardStats,
  getMockSalesTrend,
  getMockHourlySales,
  getMockDailySales,
  getMockTopItems,
  getMockMerchants,
  getMockAiInsights,

  // Constants
  REFERENCE_DATE
};