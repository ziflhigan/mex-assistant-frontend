/**
 * Constants and configuration values for the MEX Assistant application
 * Centralizes all shared constants to ensure consistency across components
 */

// Reference date used for consistent date calculations (December 30, 2023)
export const REFERENCE_DATE = new Date('2023-12-30T00:00:00');

// Color scheme for the application (matches the CSS variables)
export const COLORS = {
    // Brand colors
    grabGreen: '#00b14f',
    grabDarkGreen: '#00843a',
    grabLightGreen: '#7ed957',
    grabGray: '#f7f7f7',
    grabDarkGray: '#4a4a4a',
    grabWhite: '#ffffff',
    grabBlack: '#222222',

    // Accent colors
    accentPurple: '#9b59b6',
    accentBlue: '#3498db',
    accentOrange: '#e67e22',
    accentRed: '#e74c3c',
    accentYellow: '#f1c40f',

    // Additional chart colors
    chartColors: [
        '#00b14f', // Primary (Grab green)
        '#3498db', // Secondary (Blue)
        '#e74c3c', // Accent1 (Red)
        '#f1c40f', // Accent2 (Yellow)
        '#9b59b6', // Accent3 (Purple)
        '#2ecc71', // Accent4 (Green)
        '#e67e22', // Accent5 (Orange)
        '#34495e'  // Dark blue/gray
    ]
};

// Time periods used for filtering
export const TIME_PERIODS = {
    TODAY: 'Today',
    WEEK: 'Week',
    MONTH: 'Month',
    YEAR: 'Year'
};

// Mapping of time period to display text
export const TIME_PERIOD_LABELS = {
    [TIME_PERIODS.TODAY]: 'Today',
    [TIME_PERIODS.WEEK]: 'This Week',
    [TIME_PERIODS.MONTH]: 'This Month',
    [TIME_PERIODS.YEAR]: 'This Year'
};

// Languages supported by the application
export const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'ms', name: 'Bahasa Melayu' },
    { code: 'th', name: 'Thai' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'zh', name: 'Chinese' }
];

// Chart types used in the application
export const CHART_TYPES = {
    SALES_TREND: 'salesTrend',
    HOURLY_SALES: 'hourlySales',
    DAILY_SALES: 'dailySales',
    TOP_ITEMS: 'topItems',
    PREP_TIME: 'prepTime'
};

// AI insight types and their icons
export const INSIGHT_TYPES = {
    OPERATIONAL: 'operational',
    MENU: 'menu',
    INVENTORY: 'inventory',
    BUSINESS: 'business'
};

export const INSIGHT_TYPE_ICONS = {
    [INSIGHT_TYPES.OPERATIONAL]: 'cogs',
    [INSIGHT_TYPES.MENU]: 'utensils',
    [INSIGHT_TYPES.INVENTORY]: 'boxes',
    [INSIGHT_TYPES.BUSINESS]: 'chart-line'
};

// Insight severity levels and their colors
export const INSIGHT_SEVERITY = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
};

export const INSIGHT_SEVERITY_COLORS = {
    [INSIGHT_SEVERITY.HIGH]: COLORS.grabGreen,
    [INSIGHT_SEVERITY.MEDIUM]: COLORS.accentBlue,
    [INSIGHT_SEVERITY.LOW]: COLORS.accentPurple
};

// API endpoint paths (would be replaced with real API endpoints in production)
export const API_ENDPOINTS = {
    DASHBOARD_DATA: '/api/dashboard',
    INSIGHTS: '/api/insights',
    MERCHANT: '/api/merchant',
    CHAT: '/api/chat'
};

// Default values
export const DEFAULTS = {
    MERCHANT_ID: '5c1f8',
    TIME_PERIOD: TIME_PERIODS.WEEK,
    LANGUAGE: 'en'
};

// Format options for displaying data
export const FORMAT_OPTIONS = {
    currency: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    },
    date: {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    },
    shortDate: {
        month: 'short',
        day: 'numeric'
    },
    time: {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    },
    percentage: {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }
};

export default {
    REFERENCE_DATE,
    COLORS,
    TIME_PERIODS,
    TIME_PERIOD_LABELS,
    LANGUAGES,
    CHART_TYPES,
    INSIGHT_TYPES,
    INSIGHT_TYPE_ICONS,
    INSIGHT_SEVERITY,
    INSIGHT_SEVERITY_COLORS,
    API_ENDPOINTS,
    DEFAULTS,
    FORMAT_OPTIONS
};