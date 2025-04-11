/**
 * Mock data for dashboard development and testing
 */
// src/data/mockDashboardData.js

// Mock data for dashboard statistics
export const mockDashboardStats = {
  Today: {
    totalRevenue: 1250.75,
    totalOrders: 45,
    averageOrderValue: 27.80,
    comparisonText: '+12.5% from yesterday'
  },
  Week: {
    totalRevenue: 8750.50,
    totalOrders: 310,
    averageOrderValue: 28.25,
    comparisonText: '+8.2% from last week'
  },
  Month: {
    totalRevenue: 35200.25,
    totalOrders: 1240,
    averageOrderValue: 28.40,
    comparisonText: '+15.6% from last month'
  },
  Year: {
    totalRevenue: 420600.75,
    totalOrders: 14850,
    averageOrderValue: 28.35,
    comparisonText: '+22.1% from last year'
  }
};

// Mock data for sales trend chart
export const mockSalesTrend = {
  Today: {
    labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        label: 'Sales',
        data: [250, 375, 450, 520, 380, 275],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Orders',
        data: [12, 18, 22, 25, 19, 14],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  },
  Week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [1250, 1450, 1300, 1600, 1750, 1100, 900],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Orders',
        data: [60, 70, 65, 80, 85, 55, 45],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  }
};

// Mock data for hourly sales
export const mockHourlySales = {
  Today: [
    { hour: '06:00', sales: 250, orders: 12 },
    { hour: '09:00', sales: 375, orders: 18 },
    { hour: '12:00', sales: 450, orders: 22 },
    { hour: '15:00', sales: 520, orders: 25 },
    { hour: '18:00', sales: 380, orders: 19 },
    { hour: '21:00', sales: 275, orders: 14 }
  ],
  Week: [
    { hour: '06:00', sales: 1250, orders: 60 },
    { hour: '09:00', sales: 1450, orders: 70 },
    { hour: '12:00', sales: 1300, orders: 65 },
    { hour: '15:00', sales: 1600, orders: 80 },
    { hour: '18:00', sales: 1750, orders: 85 },
    { hour: '21:00', sales: 1100, orders: 55 }
  ]
};

// Mock data for daily sales
export const mockDailySales = {
  Week: [
    { day: 'Mon', sales: 1250, orders: 60 },
    { day: 'Tue', sales: 1450, orders: 70 },
    { day: 'Wed', sales: 1300, orders: 65 },
    { day: 'Thu', sales: 1600, orders: 80 },
    { day: 'Fri', sales: 1750, orders: 85 },
    { day: 'Sat', sales: 1100, orders: 55 },
    { day: 'Sun', sales: 900, orders: 45 }
  ]
};

// Mock data for top items
export const mockTopItems = {
  Week: [
    { name: 'Burger', category: 'Main', price: 9.00, orders: 87, trend: '+12.4%' },
    { name: 'Pizza', category: 'Main', price: 12.50, orders: 75, trend: '+8.2%' },
    { name: 'Salad', category: 'Side', price: 6.75, orders: 62, trend: '+5.6%' },
    { name: 'Fries', category: 'Side', price: 4.50, orders: 95, trend: '+15.3%' },
    { name: 'Soda', category: 'Drink', price: 2.50, orders: 110, trend: '+10.1%' }
  ]
};