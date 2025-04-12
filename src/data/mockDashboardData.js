/**
 * Comprehensive mock data for dashboard development and testing
 * Provides data for all time periods (today, week, month, year)
 * Each merchant has unique data patterns
 */

// Reference date used for consistent date calculations
export const REFERENCE_DATE = new Date('2023-12-30T00:00:00');

// Dashboard statistics for different merchants and time periods
export const mockDashboardStats = {
  Today: {
    '5c1f8': { totalSales: 1245.50, totalOrders: 48, averageOrderValue: 25.93, prepTime: 12.8 },
    '2e8a5': { totalSales: 890.25, totalOrders: 35, averageOrderValue: 25.44, prepTime: 13.2 },
    '0e1b3': { totalSales: 1450.75, totalOrders: 52, averageOrderValue: 27.90, prepTime: 11.5 },
    '1d4f2': { totalSales: 1100.00, totalOrders: 40, averageOrderValue: 27.50, prepTime: 14.2 },
    'b9e5f': { totalSales: 1320.80, totalOrders: 42, averageOrderValue: 31.45, prepTime: 15.6 },
    'default': { totalSales: 1245.50, totalOrders: 48, averageOrderValue: 25.93, prepTime: 12.8 }
  },
  Week: {
    '5c1f8': { totalSales: 8245.50, totalOrders: 318, averageOrderValue: 25.93, prepTime: 13.2 },
    '2e8a5': { totalSales: 5890.75, totalOrders: 235, averageOrderValue: 25.07, prepTime: 14.5 },
    '0e1b3': { totalSales: 9450.25, totalOrders: 352, averageOrderValue: 26.85, prepTime: 12.3 },
    '1d4f2': { totalSales: 7100.00, totalOrders: 280, averageOrderValue: 25.36, prepTime: 15.1 },
    'b9e5f': { totalSales: 8920.30, totalOrders: 292, averageOrderValue: 30.55, prepTime: 16.2 },
    'default': { totalSales: 8245.50, totalOrders: 318, averageOrderValue: 25.93, prepTime: 13.2 }
  },
  Month: {
    '5c1f8': { totalSales: 32850.75, totalOrders: 1245, averageOrderValue: 26.38, prepTime: 13.5 },
    '2e8a5': { totalSales: 23590.50, totalOrders: 905, averageOrderValue: 26.07, prepTime: 14.8 },
    '0e1b3': { totalSales: 38200.25, totalOrders: 1423, averageOrderValue: 26.85, prepTime: 12.7 },
    '1d4f2': { totalSales: 29700.00, totalOrders: 1120, averageOrderValue: 26.52, prepTime: 15.3 },
    'b9e5f': { totalSales: 34500.80, totalOrders: 1145, averageOrderValue: 30.13, prepTime: 16.5 },
    'default': { totalSales: 32850.75, totalOrders: 1245, averageOrderValue: 26.38, prepTime: 13.5 }
  },
  Year: {
    '5c1f8': { totalSales: 387500.00, totalOrders: 14700, averageOrderValue: 26.36, prepTime: 14.1 },
    '2e8a5': { totalSales: 283400.50, totalOrders: 11020, averageOrderValue: 25.72, prepTime: 15.3 },
    '0e1b3': { totalSales: 459200.75, totalOrders: 17500, averageOrderValue: 26.24, prepTime: 13.2 },
    '1d4f2': { totalSales: 346800.25, totalOrders: 13250, averageOrderValue: 26.17, prepTime: 15.8 },
    'b9e5f': { totalSales: 418700.50, totalOrders: 13980, averageOrderValue: 29.95, prepTime: 16.9 },
    'default': { totalSales: 387500.00, totalOrders: 14700, averageOrderValue: 26.36, prepTime: 14.1 }
  }
};

// Sales trend data - provides daily/hourly granular data for different time periods
export const mockSalesTrend = {
  // Today's data shows hourly trends
  Today: {
    '5c1f8': [
      { date: new Date(REFERENCE_DATE).setHours(0, 0, 0), sales: 15.50, orders: 1 },
      { date: new Date(REFERENCE_DATE).setHours(1, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(2, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(3, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(4, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(5, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(6, 0, 0), sales: 45.75, orders: 2 },
      { date: new Date(REFERENCE_DATE).setHours(7, 0, 0), sales: 67.80, orders: 3 },
      { date: new Date(REFERENCE_DATE).setHours(8, 0, 0), sales: 112.30, orders: 4 },
      { date: new Date(REFERENCE_DATE).setHours(9, 0, 0), sales: 145.50, orders: 5 },
      { date: new Date(REFERENCE_DATE).setHours(10, 0, 0), sales: 168.25, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(11, 0, 0), sales: 190.75, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(12, 0, 0), sales: 215.45, orders: 8 },
      { date: new Date(REFERENCE_DATE).setHours(13, 0, 0), sales: 198.65, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(14, 0, 0), sales: 175.30, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(15, 0, 0), sales: 145.50, orders: 5 },
      { date: new Date(REFERENCE_DATE).setHours(16, 0, 0), sales: 133.25, orders: 5 },
      { date: new Date(REFERENCE_DATE).setHours(17, 0, 0), sales: 167.30, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(18, 0, 0), sales: 188.95, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(19, 0, 0), sales: 193.45, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(20, 0, 0), sales: 175.75, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(21, 0, 0), sales: 148.30, orders: 5 },
      { date: new Date(REFERENCE_DATE).setHours(22, 0, 0), sales: 123.45, orders: 4 },
      { date: new Date(REFERENCE_DATE).setHours(23, 0, 0), sales: 78.50, orders: 3 },
    ],
    '0e1b3': [
      { date: new Date(REFERENCE_DATE).setHours(0, 0, 0), sales: 22.90, orders: 1 },
      { date: new Date(REFERENCE_DATE).setHours(1, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(2, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(3, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(4, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(5, 0, 0), sales: 27.90, orders: 1 },
      { date: new Date(REFERENCE_DATE).setHours(6, 0, 0), sales: 55.80, orders: 2 },
      { date: new Date(REFERENCE_DATE).setHours(7, 0, 0), sales: 83.70, orders: 3 },
      { date: new Date(REFERENCE_DATE).setHours(8, 0, 0), sales: 139.50, orders: 5 },
      { date: new Date(REFERENCE_DATE).setHours(9, 0, 0), sales: 167.40, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(10, 0, 0), sales: 195.30, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(11, 0, 0), sales: 223.20, orders: 8 },
      { date: new Date(REFERENCE_DATE).setHours(12, 0, 0), sales: 251.10, orders: 9 },
      { date: new Date(REFERENCE_DATE).setHours(13, 0, 0), sales: 223.20, orders: 8 },
      { date: new Date(REFERENCE_DATE).setHours(14, 0, 0), sales: 195.30, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(15, 0, 0), sales: 167.40, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(16, 0, 0), sales: 195.30, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(17, 0, 0), sales: 223.20, orders: 8 },
      { date: new Date(REFERENCE_DATE).setHours(18, 0, 0), sales: 251.10, orders: 9 },
      { date: new Date(REFERENCE_DATE).setHours(19, 0, 0), sales: 223.20, orders: 8 },
      { date: new Date(REFERENCE_DATE).setHours(20, 0, 0), sales: 195.30, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(21, 0, 0), sales: 167.40, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(22, 0, 0), sales: 111.60, orders: 4 },
      { date: new Date(REFERENCE_DATE).setHours(23, 0, 0), sales: 55.80, orders: 2 },
    ],
    // Default (used for other merchants not explicitly defined)
    'default': [
      { date: new Date(REFERENCE_DATE).setHours(0, 0, 0), sales: 20.00, orders: 1 },
      { date: new Date(REFERENCE_DATE).setHours(1, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(2, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(3, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(4, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(5, 0, 0), sales: 0, orders: 0 },
      { date: new Date(REFERENCE_DATE).setHours(6, 0, 0), sales: 50.00, orders: 2 },
      { date: new Date(REFERENCE_DATE).setHours(7, 0, 0), sales: 75.00, orders: 3 },
      { date: new Date(REFERENCE_DATE).setHours(8, 0, 0), sales: 100.00, orders: 4 },
      { date: new Date(REFERENCE_DATE).setHours(9, 0, 0), sales: 125.00, orders: 5 },
      { date: new Date(REFERENCE_DATE).setHours(10, 0, 0), sales: 150.00, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(11, 0, 0), sales: 175.00, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(12, 0, 0), sales: 200.00, orders: 8 },
      { date: new Date(REFERENCE_DATE).setHours(13, 0, 0), sales: 175.00, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(14, 0, 0), sales: 150.00, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(15, 0, 0), sales: 125.00, orders: 5 },
      { date: new Date(REFERENCE_DATE).setHours(16, 0, 0), sales: 150.00, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(17, 0, 0), sales: 175.00, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(18, 0, 0), sales: 200.00, orders: 8 },
      { date: new Date(REFERENCE_DATE).setHours(19, 0, 0), sales: 175.00, orders: 7 },
      { date: new Date(REFERENCE_DATE).setHours(20, 0, 0), sales: 150.00, orders: 6 },
      { date: new Date(REFERENCE_DATE).setHours(21, 0, 0), sales: 125.00, orders: 5 },
      { date: new Date(REFERENCE_DATE).setHours(22, 0, 0), sales: 100.00, orders: 4 },
      { date: new Date(REFERENCE_DATE).setHours(23, 0, 0), sales: 50.00, orders: 2 },
    ]
  },

  // Weekly data shows daily trends for the last 7 days
  Week: {
    '5c1f8': generateWeekData(1200, 45, 0.05, 0.12),   // Base ~1200/day, ~45 orders/day
    '2e8a5': generateWeekData(850, 34, 0.04, 0.10),    // Base ~850/day, ~34 orders/day
    '0e1b3': generateWeekData(1350, 52, 0.08, 0.15),   // Base ~1350/day, ~52 orders/day
    '1d4f2': generateWeekData(1000, 40, 0.03, 0.09),   // Base ~1000/day, ~40 orders/day
    'b9e5f': generateWeekData(1275, 42, 0.07, 0.14),   // Base ~1275/day, ~42 orders/day
    'default': generateWeekData(1200, 45, 0.05, 0.12)  // Default pattern
  },

  // Monthly data shows weekly trends
  Month: {
    '5c1f8': generateMonthData(8000, 310, 0.05, 0.15),  // Approx. weekly patterns
    '2e8a5': generateMonthData(5900, 235, 0.04, 0.12),
    '0e1b3': generateMonthData(9500, 360, 0.07, 0.18),
    '1d4f2': generateMonthData(7200, 280, 0.05, 0.14),
    'b9e5f': generateMonthData(8500, 290, 0.06, 0.16),
    'default': generateMonthData(8000, 310, 0.05, 0.15)
  },

  // Yearly data shows monthly trends
  Year: {
    '5c1f8': generateYearData(32000, 1200, 0.08, 0.20),  // Approx. monthly patterns
    '2e8a5': generateYearData(23500, 900, 0.07, 0.18),
    '0e1b3': generateYearData(38000, 1450, 0.10, 0.25),
    '1d4f2': generateYearData(29000, 1100, 0.06, 0.16),
    'b9e5f': generateYearData(35000, 1150, 0.09, 0.22),
    'default': generateYearData(32000, 1200, 0.08, 0.20)
  }
};

// Hourly sales data for each merchant and time period
export const mockHourlySales = {
  // Base patterns that will be used for all periods
  patterns: {
    '5c1f8': [
      { hour: 0, sales: 50 },
      { hour: 1, sales: 30 },
      { hour: 2, sales: 15 },
      { hour: 3, sales: 5 },
      { hour: 4, sales: 0 },
      { hour: 5, sales: 20 },
      { hour: 6, sales: 50 },
      { hour: 7, sales: 100 },
      { hour: 8, sales: 150 },
      { hour: 9, sales: 175 },
      { hour: 10, sales: 200 },
      { hour: 11, sales: 250 },
      { hour: 12, sales: 300 },
      { hour: 13, sales: 275 },
      { hour: 14, sales: 225 },
      { hour: 15, sales: 200 },
      { hour: 16, sales: 225 },
      { hour: 17, sales: 250 },
      { hour: 18, sales: 275 },
      { hour: 19, sales: 250 },
      { hour: 20, sales: 200 },
      { hour: 21, sales: 150 },
      { hour: 22, sales: 100 },
      { hour: 23, sales: 75 }
    ],
    '2e8a5': [
      { hour: 0, sales: 35 },
      { hour: 1, sales: 20 },
      { hour: 2, sales: 10 },
      { hour: 3, sales: 0 },
      { hour: 4, sales: 0 },
      { hour: 5, sales: 15 },
      { hour: 6, sales: 40 },
      { hour: 7, sales: 80 },
      { hour: 8, sales: 120 },
      { hour: 9, sales: 140 },
      { hour: 10, sales: 160 },
      { hour: 11, sales: 180 },
      { hour: 12, sales: 200 },
      { hour: 13, sales: 190 },
      { hour: 14, sales: 175 },
      { hour: 15, sales: 160 },
      { hour: 16, sales: 180 },
      { hour: 17, sales: 200 },
      { hour: 18, sales: 190 },
      { hour: 19, sales: 175 },
      { hour: 20, sales: 150 },
      { hour: 21, sales: 120 },
      { hour: 22, sales: 80 },
      { hour: 23, sales: 60 }
    ],
    '0e1b3': [
      { hour: 0, sales: 70 },
      { hour: 1, sales: 40 },
      { hour: 2, sales: 20 },
      { hour: 3, sales: 10 },
      { hour: 4, sales: 5 },
      { hour: 5, sales: 30 },
      { hour: 6, sales: 75 },
      { hour: 7, sales: 125 },
      { hour: 8, sales: 175 },
      { hour: 9, sales: 200 },
      { hour: 10, sales: 225 },
      { hour: 11, sales: 275 },
      { hour: 12, sales: 325 },
      { hour: 13, sales: 300 },
      { hour: 14, sales: 250 },
      { hour: 15, sales: 225 },
      { hour: 16, sales: 250 },
      { hour: 17, sales: 300 },
      { hour: 18, sales: 350 },
      { hour: 19, sales: 325 },
      { hour: 20, sales: 250 },
      { hour: 21, sales: 200 },
      { hour: 22, sales: 150 },
      { hour: 23, sales: 100 }
    ],
    '1d4f2': [
      { hour: 0, sales: 55 },
      { hour: 1, sales: 35 },
      { hour: 2, sales: 15 },
      { hour: 3, sales: 5 },
      { hour: 4, sales: 0 },
      { hour: 5, sales: 25 },
      { hour: 6, sales: 60 },
      { hour: 7, sales: 110 },
      { hour: 8, sales: 160 },
      { hour: 9, sales: 185 },
      { hour: 10, sales: 210 },
      { hour: 11, sales: 235 },
      { hour: 12, sales: 275 },
      { hour: 13, sales: 250 },
      { hour: 14, sales: 225 },
      { hour: 15, sales: 200 },
      { hour: 16, sales: 225 },
      { hour: 17, sales: 275 },
      { hour: 18, sales: 285 },
      { hour: 19, sales: 260 },
      { hour: 20, sales: 200 },
      { hour: 21, sales: 160 },
      { hour: 22, sales: 110 },
      { hour: 23, sales: 85 }
    ],
    'b9e5f': [
      { hour: 0, sales: 65 },
      { hour: 1, sales: 45 },
      { hour: 2, sales: 25 },
      { hour: 3, sales: 10 },
      { hour: 4, sales: 5 },
      { hour: 5, sales: 30 },
      { hour: 6, sales: 70 },
      { hour: 7, sales: 120 },
      { hour: 8, sales: 170 },
      { hour: 9, sales: 195 },
      { hour: 10, sales: 220 },
      { hour: 11, sales: 270 },
      { hour: 12, sales: 320 },
      { hour: 13, sales: 290 },
      { hour: 14, sales: 240 },
      { hour: 15, sales: 215 },
      { hour: 16, sales: 240 },
      { hour: 17, sales: 290 },
      { hour: 18, sales: 320 },
      { hour: 19, sales: 290 },
      { hour: 20, sales: 240 },
      { hour: 21, sales: 190 },
      { hour: 22, sales: 140 },
      { hour: 23, sales: 95 }
    ],
    'default': [
      { hour: 0, sales: 50 },
      { hour: 1, sales: 30 },
      { hour: 2, sales: 15 },
      { hour: 3, sales: 5 },
      { hour: 4, sales: 0 },
      { hour: 5, sales: 20 },
      { hour: 6, sales: 50 },
      { hour: 7, sales: 100 },
      { hour: 8, sales: 150 },
      { hour: 9, sales: 175 },
      { hour: 10, sales: 200 },
      { hour: 11, sales: 250 },
      { hour: 12, sales: 300 },
      { hour: 13, sales: 275 },
      { hour: 14, sales: 225 },
      { hour: 15, sales: 200 },
      { hour: 16, sales: 225 },
      { hour: 17, sales: 250 },
      { hour: 18, sales: 275 },
      { hour: 19, sales: 250 },
      { hour: 20, sales: 200 },
      { hour: 21, sales: 150 },
      { hour: 22, sales: 100 },
      { hour: 23, sales: 75 }
    ]
  }
};

// Daily sales data for each merchant and time period
export const mockDailySales = {
  Week: {
    '5c1f8': [
      { day: 'Monday', sales: 950 },
      { day: 'Tuesday', sales: 1105 },
      { day: 'Wednesday', sales: 1230 },
      { day: 'Thursday', sales: 1350 },
      { day: 'Friday', sales: 1587 },
      { day: 'Saturday', sales: 1200 },
      { day: 'Sunday', sales: 825 }
    ],
    '2e8a5': [
      { day: 'Monday', sales: 740 },
      { day: 'Tuesday', sales: 830 },
      { day: 'Wednesday', sales: 910 },
      { day: 'Thursday', sales: 990 },
      { day: 'Friday', sales: 1100 },
      { day: 'Saturday', sales: 880 },
      { day: 'Sunday', sales: 620 }
    ],
    '0e1b3': [
      { day: 'Monday', sales: 1150 },
      { day: 'Tuesday', sales: 1320 },
      { day: 'Wednesday', sales: 1450 },
      { day: 'Thursday', sales: 1580 },
      { day: 'Friday', sales: 1850 },
      { day: 'Saturday', sales: 1500 },
      { day: 'Sunday', sales: 1100 }
    ],
    '1d4f2': [
      { day: 'Monday', sales: 900 },
      { day: 'Tuesday', sales: 1050 },
      { day: 'Wednesday', sales: 1150 },
      { day: 'Thursday', sales: 1250 },
      { day: 'Friday', sales: 1450 },
      { day: 'Saturday', sales: 1100 },
      { day: 'Sunday', sales: 750 }
    ],
    'b9e5f': [
      { day: 'Monday', sales: 1000 },
      { day: 'Tuesday', sales: 1150 },
      { day: 'Wednesday', sales: 1300 },
      { day: 'Thursday', sales: 1400 },
      { day: 'Friday', sales: 1650 },
      { day: 'Saturday', sales: 1400 },
      { day: 'Sunday', sales: 950 }
    ],
    'default': [
      { day: 'Monday', sales: 950 },
      { day: 'Tuesday', sales: 1105 },
      { day: 'Wednesday', sales: 1230 },
      { day: 'Thursday', sales: 1350 },
      { day: 'Friday', sales: 1587 },
      { day: 'Saturday', sales: 1200 },
      { day: 'Sunday', sales: 825 }
    ]
  },
  Month: {
    '5c1f8': [
      { day: 'Monday', sales: 3800 },
      { day: 'Tuesday', sales: 4420 },
      { day: 'Wednesday', sales: 4920 },
      { day: 'Thursday', sales: 5400 },
      { day: 'Friday', sales: 6348 },
      { day: 'Saturday', sales: 4800 },
      { day: 'Sunday', sales: 3300 }
    ],
    '0e1b3': [
      { day: 'Monday', sales: 4600 },
      { day: 'Tuesday', sales: 5280 },
      { day: 'Wednesday', sales: 5800 },
      { day: 'Thursday', sales: 6320 },
      { day: 'Friday', sales: 7400 },
      { day: 'Saturday', sales: 6000 },
      { day: 'Sunday', sales: 4400 }
    ],
    'default': [
      { day: 'Monday', sales: 3800 },
      { day: 'Tuesday', sales: 4420 },
      { day: 'Wednesday', sales: 4920 },
      { day: 'Thursday', sales: 5400 },
      { day: 'Friday', sales: 6348 },
      { day: 'Saturday', sales: 4800 },
      { day: 'Sunday', sales: 3300 }
    ]
  },
  Year: {
    '5c1f8': [
      { day: 'Monday', sales: 47500 },
      { day: 'Tuesday', sales: 55250 },
      { day: 'Wednesday', sales: 61500 },
      { day: 'Thursday', sales: 67500 },
      { day: 'Friday', sales: 79350 },
      { day: 'Saturday', sales: 60000 },
      { day: 'Sunday', sales: 41250 }
    ],
    '0e1b3': [
      { day: 'Monday', sales: 57500 },
      { day: 'Tuesday', sales: 66000 },
      { day: 'Wednesday', sales: 72500 },
      { day: 'Thursday', sales: 79000 },
      { day: 'Friday', sales: 92500 },
      { day: 'Saturday', sales: 75000 },
      { day: 'Sunday', sales: 55000 }
    ],
    'default': [
      { day: 'Monday', sales: 47500 },
      { day: 'Tuesday', sales: 55250 },
      { day: 'Wednesday', sales: 61500 },
      { day: 'Thursday', sales: 67500 },
      { day: 'Friday', sales: 79350 },
      { day: 'Saturday', sales: 60000 },
      { day: 'Sunday', sales: 41250 }
    ]
  }
};

/**
 * Helper function to generate weekly sales data
 * @param {number} baseSales - Base daily sales amount
 * @param {number} baseOrders - Base daily orders count
 * @param {number} minVariation - Minimum random variation (percentage)
 * @param {number} maxVariation - Maximum random variation (percentage)
 * @returns {Array} Array of daily data points
 */
function generateWeekData(baseSales, baseOrders, minVariation, maxVariation) {
  const today = new Date(REFERENCE_DATE);
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Apply day of week pattern
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    let dayMultiplier = 1.0;

    // Weekends generally busier for restaurants
    if (dayOfWeek === 0) dayMultiplier = 0.7; // Sunday
    else if (dayOfWeek === 5) dayMultiplier = 1.3; // Friday
    else if (dayOfWeek === 6) dayMultiplier = 1.0; // Saturday
    else if (dayOfWeek === 1) dayMultiplier = 0.8; // Monday
    else if (dayOfWeek === 2) dayMultiplier = 0.9; // Tuesday
    else if (dayOfWeek === 3) dayMultiplier = 1.0; // Wednesday
    else if (dayOfWeek === 4) dayMultiplier = 1.1; // Thursday

    // Add some randomness within specified range
    const randomFactor = 1 + (Math.random() * (maxVariation - minVariation) + minVariation);

    const dailySales = Math.round(baseSales * dayMultiplier * randomFactor * 100) / 100;
    const dailyOrders = Math.round(baseOrders * dayMultiplier * randomFactor);

    result.push({
      date: date.toISOString(),
      sales: dailySales,
      orders: dailyOrders
    });
  }

  return result;
}

/**
 * Helper function to generate monthly sales data
 * @param {number} baseWeeklySales - Base weekly sales amount
 * @param {number} baseWeeklyOrders - Base weekly orders count
 * @param {number} minVariation - Minimum random variation (percentage)
 * @param {number} maxVariation - Maximum random variation (percentage)
 * @returns {Array} Array of daily data points for a month
 */
function generateMonthData(baseWeeklySales, baseWeeklyOrders, minVariation, maxVariation) {
  const today = new Date(REFERENCE_DATE);
  const result = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Apply day of week pattern
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    let dayMultiplier = 1.0;

    // Weekends generally busier for restaurants
    if (dayOfWeek === 0) dayMultiplier = 0.7; // Sunday
    else if (dayOfWeek === 5) dayMultiplier = 1.3; // Friday
    else if (dayOfWeek === 6) dayMultiplier = 1.0; // Saturday
    else if (dayOfWeek === 1) dayMultiplier = 0.8; // Monday
    else if (dayOfWeek === 2) dayMultiplier = 0.9; // Tuesday
    else if (dayOfWeek === 3) dayMultiplier = 1.0; // Wednesday
    else if (dayOfWeek === 4) dayMultiplier = 1.1; // Thursday

    // Apply weekly pattern (some weeks are busier than others)
    const weekOfMonth = Math.floor(i / 7);
    let weekMultiplier = 1.0;

    if (weekOfMonth === 0) weekMultiplier = 1.1; // Last week of month (payday)
    else if (weekOfMonth === 1) weekMultiplier = 0.9; // Second-to-last week
    else if (weekOfMonth === 2) weekMultiplier = 0.85; // Third-to-last week
    else if (weekOfMonth === 3) weekMultiplier = 0.95; // Fourth-to-last week

    // Add some randomness within specified range
    const randomFactor = 1 + (Math.random() * (maxVariation - minVariation) + minVariation);

    const dailyBaseSales = baseWeeklySales / 7;
    const dailyBaseOrders = baseWeeklyOrders / 7;

    const dailySales = Math.round(dailyBaseSales * dayMultiplier * weekMultiplier * randomFactor * 100) / 100;
    const dailyOrders = Math.round(dailyBaseOrders * dayMultiplier * weekMultiplier * randomFactor);

    result.push({
      date: date.toISOString(),
      sales: dailySales,
      orders: dailyOrders
    });
  }

  return result;
}

/**
 * Helper function to generate yearly sales data
 * @param {number} baseWeeklySales - Base weekly sales amount
 * @param {number} baseWeeklyOrders - Base weekly orders count
 * @param {number} minVariation - Minimum random variation (percentage)
 * @param {number} maxVariation - Maximum random variation (percentage)
 * @returns {Array} Array of daily data points for a year
 */
function generateYearData(baseWeeklySales, baseWeeklyOrders, minVariation, maxVariation) {
  const today = new Date(REFERENCE_DATE);
  const result = [];

  // For yearly data, we'll use weekly aggregates
  // We'll generate 52 weeks of data
  for (let i = 51; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - (i * 7));

    // Apply seasonal patterns
    // Month 0 = January, 11 = December
    const month = date.getMonth();
    let monthMultiplier = 1.0;

    // Example seasonal pattern:
    // - Summer months (5-7 = June-August): Higher sales
    // - Winter holidays (11 = December): Higher sales
    // - Post-holiday (0 = January): Lower sales
    // - Spring break (2-3 = March-April): Moderate increase
    if (month === 11) monthMultiplier = 1.3; // December
    else if (month === 0) monthMultiplier = 0.8; // January
    else if (month >= 5 && month <= 7) monthMultiplier = 1.2; // June-August
    else if (month >= 2 && month <= 3) monthMultiplier = 1.1; // March-April
    else if (month === 10) monthMultiplier = 1.1; // November (Thanksgiving)
    else if (month === 1) monthMultiplier = 0.85; // February
    else if (month === 8) monthMultiplier = 1.05; // September (back to school)
    else if (month === 9) monthMultiplier = 1.0; // October
    else if (month === 4) monthMultiplier = 1.05; // May

    // Add some randomness within specified range
    const randomFactor = 1 + (Math.random() * (maxVariation - minVariation) + minVariation);

    const weeklySales = Math.round(baseWeeklySales * monthMultiplier * randomFactor * 100) / 100;
    const weeklyOrders = Math.round(baseWeeklyOrders * monthMultiplier * randomFactor);

    result.push({
      date: date.toISOString(),
      sales: weeklySales,
      orders: weeklyOrders
    });
  }

  return result;
}

// Export everything together for easy access
export default {
  REFERENCE_DATE,
  mockDashboardStats,
  mockSalesTrend,
  mockHourlySales,
  mockDailySales,

  // Helper functions for generating data
  generateWeekData,
  generateMonthData,
  generateYearData
};