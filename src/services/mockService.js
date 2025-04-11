// Import mock data
import { mockDashboardStats, mockSalesTrend, mockHourlySales, mockDailySales, mockTopItems } from '../data/mockDashboardData';
import mockChatResponses from '../data/mockChatResponses';
import mockMerchants  from '../data/mockMerchants'; // Ensure this file exists
import mockAiInsights from '../services/mockAiInsight.jsx'

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// --- Dashboard Mock Functions ---

export const getMockDashboardStats = async (merchantId, period) => {
    await delay();
    console.log(`Mock Fetch: Stats for ${merchantId}, period ${period}`);
    // Return data structure similar to what StatCard/StatsGrid expects
    // This might vary based on the selected period
    return mockDashboardStats[period] || mockDashboardStats['Week']; // Fallback
};

export const getMockSalesTrend = async (merchantId, period) => {
    await delay(800); // Longer delay for charts
    console.log(`Mock Fetch: Sales Trend for ${merchantId}, period ${period}`);
    // Return data formatted for the SalesTrendChart
    // Example structure: { labels: [...], datasets: [{ label: 'Sales', data: [...] }, { label: 'Orders', data: [...] }] }
    return mockSalesTrend[period] || mockSalesTrend['Week'];
};

export const getMockHourlySales = async (merchantId, period) => {
     await delay(600);
     console.log(`Mock Fetch: Hourly Sales for ${merchantId}, period ${period}`);
     return mockHourlySales[period] || mockHourlySales['Week'];
};

export const getMockDailySales = async (merchantId, period) => {
     await delay(600);
     console.log(`Mock Fetch: Daily Sales for ${merchantId}, period ${period}`);
     return mockDailySales[period] || mockDailySales['Week'];
};

export const getMockTopItems = async (merchantId, period) => {
    await delay();
    console.log(`Mock Fetch: Top Items for ${merchantId}, period ${period}`);
    // Return array of items for TopItemsTable
    // Example: [{ name: 'Burger', category: 'Main', price: 9.00, orders: 87, trend: '+12.4%' }, ...]
    return mockTopItems[period] || mockTopItems['Week'];
};

// --- Chat Mock Functions ---

export const getMockChatResponse = async (message, merchantId, language) => {
    await delay(1500); // Simulate AI thinking time
    console.log(`Mock Fetch: Chat response for "${message}" (Merchant: ${merchantId}, Lang: ${language})`);
    // Return a predefined response or simple logic based on keywords
    // Structure should include text and potentially chart data reference
    // Example: { text: "...", visualization: { type: 'bar', data: {...} } }
    return mockChatResponses(message); // Function in mockChatResponses.js handles keyword logic
};

// --- Other Mock Functions ---

export const getMockMerchants = async () => {
    await delay(100);
    console.log("Mock Fetch: Available Merchants");
    return mockMerchants; // Return the list from mockMerchants.js
}

// TODO: Add mock functions for Notifications, Settings, AI Insights if needed for prototype

export const getMockAiInsights = async (merchantId, period) => {
    await delay(900);
    console.log(`Mock Fetch: AI Insights for ${merchantId}, period ${period}`);
    return mockAiInsights[period] || mockAiInsights['Week'];
};

// --- Aggregated Dashboard Data Function ---

/**
 * Get complete dashboard data
 * @param {Object} options - Options for fetching data
 * @param {string} options.merchantId - Merchant ID
 * @param {string} options.timeFilter - Time period (Today, Week, Month, Year)
 * @returns {Promise<Object>} Combined dashboard data
 */
export const getDashboardData = async ({ merchantId = null, timeFilter = 'Week' } = {}) => {
    console.log(`Fetching dashboard data for merchant ${merchantId}, period ${timeFilter}`);

    // Normalize time filter
    const period = timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1).toLowerCase();

    try {
        // Fetch all data in parallel for better performance
        const [stats, salesTrend, hourlySales, dailySales, topItems, aiInsights] = await Promise.all([
            getMockDashboardStats(merchantId, period),
            getMockSalesTrend(merchantId, period),
            getMockHourlySales(merchantId, period),
            getMockDailySales(merchantId, period),
            getMockTopItems(merchantId, period),
            getMockAiInsights(merchantId, period)
        ]);

        // Combine all data into a single object
        return {
            ...stats,
            salesTrend,
            hourlySales,
            dailySales,
            topItems,
            aiInsights
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
};
