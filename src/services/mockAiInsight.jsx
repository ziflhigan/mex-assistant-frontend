/**
 * Mock AI Insights data for different time periods
 */

export const mockAiInsights = {
    Today: [
        {
            title: 'Lunch Rush Alert',
            description: 'Today\'s lunch rush (12-2pm) is predicted to be 15% busier than usual. Consider adding an extra staff member.',
            type: 'operational',
            severity: 'high'
        },
        {
            title: 'Top Performer: Chocolate Milkshake',
            description: 'Chocolate Milkshake sales are up 12.4% today compared to your daily average. Consider featuring it in combo promotions.',
            type: 'menu',
            severity: 'medium'
        },
        {
            title: 'Weather Impact',
            description: 'Today\'s rainy weather has increased delivery orders by 18%. Ensure you have sufficient delivery staff.',
            type: 'operational',
            severity: 'medium'
        }
    ],

    Week: [
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

    Month: [
        {
            title: 'Revenue Growth Pattern',
            description: 'Your weekday revenue has grown 7.5% this month compared to last month, but weekend revenue is only up 2.3%. Consider weekend promotions.',
            type: 'business',
            severity: 'medium'
        },
        {
            title: 'Menu Optimization',
            description: 'The Double Patty Burger and Chocolate Milkshake have a 42% co-purchase rate. Creating a bundle could increase average order value.',
            type: 'menu',
            severity: 'medium'
        },
        {
            title: 'Operational Efficiency',
            description: 'Your average preparation time (13.5 min) is 2.1 minutes higher than the platform average. Review your kitchen workflow during peak hours.',
            type: 'operational',
            severity: 'high'
        },
        {
            title: 'Competitive Analysis',
            description: 'Three new burger restaurants opened within 2km of your location this month. Consider highlighting your unique offerings.',
            type: 'business',
            severity: 'medium'
        }
    ],

    Year: [
        {
            title: 'Seasonal Trend Identified',
            description: 'Your sales show a clear 15% increase during summer months (Jun-Aug). Plan inventory and staffing accordingly for the upcoming season.',
            type: 'business',
            severity: 'medium'
        },
        {
            title: 'Menu Evolution Opportunity',
            description: 'Chicken-based items have shown consistent growth (+18.5%) over the year while beef items remained flat. Consider expanding your chicken options.',
            type: 'menu',
            severity: 'high'
        },
        {
            title: 'Customer Retention',
            description: 'Your repeat customer rate has improved to 42% from 35% last year. Your loyalty program appears to be working well.',
            type: 'business',
            severity: 'low'
        },
        {
            title: 'Price Sensitivity Analysis',
            description: 'The 5% price increase on premium burgers in Q3 led to only a 1.2% decrease in volume, indicating low price sensitivity. Consider optimizing pricing.',
            type: 'business',
            severity: 'medium'
        }
    ]
};

export default mockAiInsights;