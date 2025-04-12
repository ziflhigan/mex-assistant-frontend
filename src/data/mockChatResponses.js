/**
 * Mock chat response data and utilities
 * Provides template responses and visualization data for the chat assistant
 */

import { getMerchantById } from './mockMerchants';

// Response templates for different query categories
export const responseTemplates = {
  greeting: {
    default: "Hello! I'm your MEX Assistant, here to help you understand your business performance and provide actionable insights. What would you like to know about your business today?",
    withName: "Hello {merchantName}! I'm your MEX Assistant, here to help you understand your business performance and provide actionable insights. What would you like to know about your business today?"
  },

  salesTrend: {
    positive: "Based on your recent {period} data, your sales have been trending upward. Your best day was {peakDay} with ${peakSales} in sales, which is {peakPercentage}% above your daily average.",
    negative: "Based on your recent {period} data, your sales have been slightly declining. Your best day was still {peakDay} with ${peakSales} in sales, but overall your trend is down {declinePercentage}% compared to the previous {period}.",
    flat: "Based on your recent {period} data, your sales have been stable. Your best day was {peakDay} with ${peakSales} in sales, and your performance is consistent with the previous {period}."
  },

  topItems: "Your top selling items this {period} are {item1} ({quantity1} orders), {item2} ({quantity2} orders), and {item3} ({quantity3} orders). {item1} has shown a {trend1} in sales compared to last {period}.",

  busyHours: "Your busiest hours are {hour1}, {hour2}, and {hour3}. The peak hour ({hour1}) accounts for {peakPercentage}% of your daily sales. Consider scheduling additional staff during these peak times.",

  prepTime: "Your average preparation time is {prepTime} minutes. This is {comparison} the platform average of 14 minutes for similar restaurants. {recommendation}",

  inventory: "Based on your sales patterns, you should ensure adequate inventory for {item1}, {item2}, and {item3} for the upcoming {period}. {item1} sales are trending up {trend1}% compared to your average.",

  recommendations: "Here are my recommendations for improving your business:\n\n1. {rec1}\n\n2. {rec2}\n\n3. {rec3}",

  default: "I can help you analyze your business performance. Try asking about sales trends, top selling items, peak hours, operational efficiency, or search trends in your area."
};

// Example visualization data for chat responses
export const mockChatVisualizations = {
  salesTrend: {
    '5c1f8': {
      Today: {
        labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
        data: [45, 75, 168, 215, 175, 145, 189, 176, 123]
      },
      Week: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        data: [950, 1105, 1230, 1350, 1587, 1200, 825]
      },
      Month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [7950, 8305, 8630, 8750]
      },
      Year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [29500, 31050, 32500, 33400, 34800, 36500, 36800, 36600, 35200, 34100, 33600, 35200]
      }
    },
    '0e1b3': {
      Today: {
        labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
        data: [55, 140, 195, 251, 195, 167, 251, 195, 112]
      },
      Week: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        data: [1150, 1320, 1450, 1580, 1850, 1500, 1100]
      },
      Month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [9350, 9705, 9530, 9850]
      },
      Year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [34500, 36050, 38500, 40400, 41800, 43500, 43800, 43600, 42200, 40100, 38600, 42200]
      }
    },
    'default': {
      Today: {
        labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
        data: [50, 100, 150, 200, 150, 125, 175, 150, 100]
      },
      Week: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        data: [1000, 1150, 1300, 1450, 1600, 1300, 950]
      },
      Month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [8000, 8200, 8400, 8600]
      },
      Year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [30000, 32000, 34000, 35000, 36000, 38000, 38500, 38000, 36000, 35000, 34000, 36000]
      }
    }
  },

  hourlySales: {
    '5c1f8': {
      data: [
        { hour: '12AM', sales: 50 },
        { hour: '1AM', sales: 30 },
        { hour: '2AM', sales: 15 },
        { hour: '3AM', sales: 5 },
        { hour: '4AM', sales: 0 },
        { hour: '5AM', sales: 20 },
        { hour: '6AM', sales: 50 },
        { hour: '7AM', sales: 100 },
        { hour: '8AM', sales: 150 },
        { hour: '9AM', sales: 175 },
        { hour: '10AM', sales: 200 },
        { hour: '11AM', sales: 250 },
        { hour: '12PM', sales: 300 },
        { hour: '1PM', sales: 275 },
        { hour: '2PM', sales: 225 },
        { hour: '3PM', sales: 200 },
        { hour: '4PM', sales: 225 },
        { hour: '5PM', sales: 250 },
        { hour: '6PM', sales: 275 },
        { hour: '7PM', sales: 250 },
        { hour: '8PM', sales: 200 },
        { hour: '9PM', sales: 150 },
        { hour: '10PM', sales: 100 },
        { hour: '11PM', sales: 75 }
      ]
    },
    '0e1b3': {
      data: [
        { hour: '12AM', sales: 70 },
        { hour: '1AM', sales: 40 },
        { hour: '2AM', sales: 20 },
        { hour: '3AM', sales: 10 },
        { hour: '4AM', sales: 5 },
        { hour: '5AM', sales: 30 },
        { hour: '6AM', sales: 75 },
        { hour: '7AM', sales: 125 },
        { hour: '8AM', sales: 175 },
        { hour: '9AM', sales: 200 },
        { hour: '10AM', sales: 225 },
        { hour: '11AM', sales: 275 },
        { hour: '12PM', sales: 325 },
        { hour: '1PM', sales: 300 },
        { hour: '2PM', sales: 250 },
        { hour: '3PM', sales: 225 },
        { hour: '4PM', sales: 250 },
        { hour: '5PM', sales: 300 },
        { hour: '6PM', sales: 350 },
        { hour: '7PM', sales: 325 },
        { hour: '8PM', sales: 250 },
        { hour: '9PM', sales: 200 },
        { hour: '10PM', sales: 150 },
        { hour: '11PM', sales: 100 }
      ]
    }
  },

  topItems: {
    '5c1f8': {
      Week: [
        { name: 'Double Patty Burger', category: 'Burgers', orders: 87, trend: '+12.4%' },
        { name: 'Crispy Chicken Sandwich', category: 'Sandwiches', orders: 65, trend: '+8.7%' },
        { name: 'Regular Fries', category: 'Sides', orders: 59, trend: '-2.3%' },
        { name: 'Chocolate Milkshake', category: 'Beverages', orders: 42, trend: '+15.8%' },
        { name: 'Cheesy Bacon Fries', category: 'Sides', orders: 38, trend: '+6.2%' }
      ]
    },
    '0e1b3': {
      Week: [
        { name: 'Crispy Chicken Wings', category: 'Chicken', orders: 78, trend: '+9.4%' },
        { name: 'Spicy Chicken Bucket', category: 'Chicken', orders: 62, trend: '+14.2%' },
        { name: 'Chicken Sandwich', category: 'Sandwiches', orders: 65, trend: '+5.8%' },
        { name: 'Pepsi', category: 'Beverages', orders: 60, trend: '+3.1%' },
        { name: 'Chicken Tenders', category: 'Chicken', orders: 55, trend: '+8.9%' }
      ]
    }
  },

  prepTime: {
    comparison: {
      labels: ['Your Restaurant', 'Platform Average', 'Top Performers'],
      data: [13.2, 14.0, 9.8]
    },
    trend: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      data: [12.5, 12.8, 13.0, 13.4, 14.2, 13.8, 12.6]
    }
  }
};

/**
 * Generate a personalized response based on template
 * @param {string} templateKey - Key to access the appropriate template
 * @param {Object} params - Parameters to fill into the template
 * @returns {string} - The personalized response
 */
export const generateResponse = (templateKey, params = {}) => {
  // Get the template or nested template
  const template = templateKey.includes('.')
      ? templateKey.split('.').reduce((obj, key) => obj[key], responseTemplates)
      : responseTemplates[templateKey];

  if (!template) return responseTemplates.default;

  // Replace placeholders with actual values
  let response = template;
  for (const [key, value] of Object.entries(params)) {
    const placeholder = `{${key}}`;
    response = response.replace(new RegExp(placeholder, 'g'), value);
  }

  return response;
};

/**
 * Get visualization data for a chat response
 * @param {string} chartType - Type of chart (salesTrend, hourlySales, etc.)
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time period (Today, Week, Month, Year)
 * @returns {Object} - Chart data for visualization
 */
export const getChatVisualization = (chartType, merchantId, period = 'Week') => {
  // Get the visualization data for the specified chart type
  const visualizationData = mockChatVisualizations[chartType];
  if (!visualizationData) return null;

  // Get merchant-specific data or use default
  const merchantData = visualizationData[merchantId] || visualizationData['default'];
  if (!merchantData) return null;

  // Get period-specific data if available, or return the whole merchant data
  return period && merchantData[period] ? merchantData[period] : merchantData;
};

/**
 * Get a greeting for a specific merchant
 * @param {string} merchantId - Merchant ID
 * @returns {string} - Personalized greeting
 */
export const getGreeting = (merchantId) => {
  const merchant = getMerchantById(merchantId);
  if (!merchant) return responseTemplates.greeting.default;

  return generateResponse('greeting.withName', { merchantName: merchant.name });
};

/**
 * Process a chat message and generate an appropriate response
 * @param {string} message - User's chat message
 * @param {string} merchantId - Merchant ID
 * @param {string} period - Time period context
 * @returns {Object} - Response object with text and optional visualization
 */
export const processMessage = (message, merchantId, period = 'Week') => {
  const lowerMessage = message.toLowerCase();

  // Check for different query types
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return {
      text: getGreeting(merchantId)
    };
  }

  if (lowerMessage.includes("sales") && lowerMessage.includes("trend")) {
    // Get visualization data
    const chartData = getChatVisualization('salesTrend', merchantId, period);

    // Determine if sales trend is positive, negative, or flat
    let trend = 'positive';
    let templateKey = 'salesTrend.positive';

    // Calculate parameters for the response
    const peakIndex = chartData ? chartData.data.indexOf(Math.max(...chartData.data)) : 0;
    const peakDay = chartData ? chartData.labels[peakIndex] : 'Friday';
    const peakSales = chartData ? chartData.data[peakIndex].toFixed(2) : '1,587.00';
    const peakPercentage = '32.5'; // Would calculate from real data

    return {
      text: generateResponse(templateKey, {
        period: period.toLowerCase(),
        peakDay,
        peakSales,
        peakPercentage
      }),
      chartType: 'salesTrend',
      chartData
    };
  }

  if (lowerMessage.includes("top") && (lowerMessage.includes("item") || lowerMessage.includes("selling"))) {
    const chartData = getChatVisualization('topItems', merchantId);
    const topItems = chartData ? chartData.Week.slice(0, 3) : [];

    if (topItems.length >= 3) {
      return {
        text: generateResponse('topItems', {
          period: period.toLowerCase(),
          item1: topItems[0].name,
          quantity1: topItems[0].orders,
          item2: topItems[1].name,
          quantity2: topItems[1].orders,
          item3: topItems[2].name,
          quantity3: topItems[2].orders,
          trend1: topItems[0].trend
        }),
        chartType: 'topItems',
        chartData: topItems
      };
    }
  }

  if (lowerMessage.includes("busy") || lowerMessage.includes("peak") || lowerMessage.includes("hour")) {
    const chartData = getChatVisualization('hourlySales', merchantId);

    if (chartData && chartData.data) {
      // Sort hours by sales
      const sortedHours = [...chartData.data].sort((a, b) => b.sales - a.sales);
      const top3Hours = sortedHours.slice(0, 3);

      // Calculate the percentage of the peak hour
      const totalSales = chartData.data.reduce((sum, hour) => sum + hour.sales, 0);
      const peakPercentage = ((top3Hours[0].sales / totalSales) * 100).toFixed(1);

      return {
        text: generateResponse('busyHours', {
          hour1: top3Hours[0].hour,
          hour2: top3Hours[1].hour,
          hour3: top3Hours[2].hour,
          peakPercentage
        }),
        chartType: 'hourlySales',
        chartData
      };
    }
  }

  if (lowerMessage.includes("prep") || lowerMessage.includes("time") || lowerMessage.includes("preparation")) {
    // Get merchant stats (average prep time)
    const prepTime = merchantId === '0e1b3' ? 12.3 : 13.2;
    const comparison = prepTime > 14 ? 'above' : 'below';
    const recommendation = prepTime > 14
        ? 'Consider reviewing your kitchen workflow to identify bottlenecks.'
        : 'Your kitchen is performing well. Keep up the good practices!';

    return {
      text: generateResponse('prepTime', {
        prepTime: prepTime.toFixed(1),
        comparison,
        recommendation
      }),
      chartType: 'prepTime',
      chartData: mockChatVisualizations.prepTime
    };
  }

  // Default response
  return {
    text: responseTemplates.default
  };
};

export default {
  responseTemplates,
  mockChatVisualizations,
  generateResponse,
  getChatVisualization,
  getGreeting,
  processMessage
};