// src/services/mockService.js

const mockChatResponses = {
  "hello": "Hello there! How can I assist you today?",
  "sales": "Your total sales for this month are $10,000.",
  "default": "I'm still learning. Can you rephrase your request?",
};

const mockDashboardData = {
  totalSales: 50000,
  totalOrders: 1200,
  averageOrderValue: 41.67,
  salesTrend: [
    { date: "2023-01-01", sales: 1000 },
    { date: "2023-01-08", sales: 1200 },
    { date: "2023-01-15", sales: 1500 },
    { date: "2023-01-22", sales: 1300 },
    { date: "2023-01-29", sales: 1600 },
  ],
};

const mockMerchants = [
  { id: 1, name: "Merchant A" },
  { id: 2, name: "Merchant B" },
];

export const getChatResponse = async (message) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
  const messageKey = Object.keys(mockChatResponses).find((key) =>
    message.toLowerCase().includes(key)
  );
  return {
    text: mockChatResponses[messageKey] || mockChatResponses.default,
    sender: "assistant",
  };
};

export const getDashboardData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockDashboardData;
};

export const getMerchants = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockMerchants;
};