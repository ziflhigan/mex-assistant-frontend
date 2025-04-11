/**
 * Mock data for dashboard development and testing
 */

const mockDashboardData = {
  // Key metrics
  totalSales: 8245.50,
  totalOrders: 318,
  averageOrderValue: 25.93,

  // Sales trend data - last 14 days
  salesTrend: [
    { date: '2024-03-29', sales: 5200 },
    { date: '2024-03-30', sales: 5800 },
    { date: '2024-03-31', sales: 6200 },
    { date: '2024-04-01', sales: 5500 },
    { date: '2024-04-02', sales: 6700 },
    { date: '2024-04-03', sales: 7200 },
    { date: '2024-04-04', sales: 6800 },
    { date: '2024-04-05', sales: 7500 },
    { date: '2024-04-06', sales: 8200 },
    { date: '2024-04-07', sales: 7800 },
    { date: '2024-04-08', sales: 8500 },
    { date: '2024-04-09', sales: 9100 },
    { date: '2024-04-10', sales: 8700 },
    { date: '2024-04-11', sales: 8245 }
  ],

  // Hourly sales data - 24 hours
  hourlySales: [
    { hour: 0, sales: 180 },
    { hour: 1, sales: 120 },
    { hour: 2, sales: 80 },
    { hour: 3, sales: 50 },
    { hour: 4, sales: 30 },
    { hour: 5, sales: 40 },
    { hour: 6, sales: 100 },
    { hour: 7, sales: 200 },
    { hour: 8, sales: 350 },
    { hour: 9, sales: 450 },
    { hour: 10, sales: 550 },
    { hour: 11, sales: 650 },
    { hour: 12, sales: 750 },
    { hour: 13, sales: 720 },
    { hour: 14, sales: 650 },
    { hour: 15, sales: 580 },
    { hour: 16, sales: 500 },
    { hour: 17, sales: 580 },
    { hour: 18, sales: 680 },
    { hour: 19, sales: 850 },
    { hour: 20, sales: 780 },
    { hour: 21, sales: 680 },
    { hour: 22, sales: 480 },
    { hour: 23, sales: 320 }
  ],

  // Daily sales data - days of week
  dailySales: [
    { day: 'Monday', sales: 950 },
    { day: 'Tuesday', sales: 1105 },
    { day: 'Wednesday', sales: 1230 },
    { day: 'Thursday', sales: 1350 },
    { day: 'Friday', sales: 1587 },
    { day: 'Saturday', sales: 1200 },
    { day: 'Sunday', sales: 825 }
  ],

  // Top selling items
  topItems: [
    {
      name: 'Double Patty Burger',
      category: 'Burgers',
      quantity: 87,
      revenue: 783,
      trend: '+12.4%',
      trendDirection: 'up'
    },
    {
      name: 'Crispy Chicken Sandwich',
      category: 'Sandwiches',
      quantity: 65,
      revenue: 552.5,
      trend: '+8.7%',
      trendDirection: 'up'
    },
    {
      name: 'Regular Fries',
      category: 'Sides',
      quantity: 59,
      revenue: 206.5,
      trend: '-2.3%',
      trendDirection: 'down'
    },
    {
      name: 'Chocolate Milkshake',
      category: 'Beverages',
      quantity: 42,
      revenue: 220.5,
      trend: '+15.8%',
      trendDirection: 'up'
    },
    {
      name: 'Cheesy Bacon Fries',
      category: 'Sides',
      quantity: 38,
      revenue: 218.5,
      trend: '+6.2%',
      trendDirection: 'up'
    }
  ],

  // AI Insights
  aiInsights: [
    {
      title: 'Peak Hour Opportunity',
      description: 'Your busiest hour is 12:00 PM with 52 orders. Consider adding an extra staff member during 11:30 AM - 1:30 PM to improve preparation time.',
      type: 'operational',
      severity: 'medium'
    },
    {
      title: 'Menu Recommendation',
      description: 'Based on search trends, "Fried Spring Rolls" is highly searched but not on your menu. Consider adding this item to capture this demand.',
      type: 'menu',
      severity: 'low'
    },
    {
      title: 'Inventory Alert',
      description: 'Your "Cheesy Bacon Fries" sales have increased by 6.2% this week. Ensure you have sufficient inventory for the upcoming weekend rush.',
      type: 'inventory',
      severity: 'high'
    }
  ],

  // Merchant profile
  merchantProfile: {
    id: '5c1f8',
    name: 'Burger Factory',
    location: 'Jakarta, Indonesia',
    category: 'Fast Food',
    joinedDate: '2023-01-15',
    avgRating: 4.7
  }
};

export default mockDashboardData;