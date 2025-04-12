/**
 * Mock AI insights for different time periods
 * Provides actionable recommendations for merchants
 */

// Mock AI insights organized by time period
export const mockAiInsights = {
    Today: {
        '5c1f8': [
            {
                title: 'Peak Hour Alert',
                description: 'Your busiest hour today was 12 PM with 8 orders. Consider adding an extra staff member during 11:30 AM - 1:30 PM to improve preparation time.',
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
                title: 'Preparation Time Alert',
                description: 'Your average preparation time (12.8 min) has decreased by 3.0% compared to yesterday. Keep up the good work!',
                type: 'operational',
                severity: 'low'
            }
        ],
        '0e1b3': [
            {
                title: 'Peak Hour Alert',
                description: 'Your busiest hours today were 12 PM and 6 PM with 9 orders each. Consider adding extra staff during these peak periods.',
                type: 'operational',
                severity: 'medium'
            },
            {
                title: 'Inventory Alert',
                description: 'Spicy Chicken Bucket sales are 22% higher than usual for this day. Ensure you have sufficient inventory for tonight.',
                type: 'inventory',
                severity: 'high'
            },
            {
                title: 'Menu Insight',
                description: 'Chicken Sandwich with Mashed Potatoes is your most common combo today. Consider creating a special bundle deal.',
                type: 'menu',
                severity: 'medium'
            }
        ],
        'default': [
            {
                title: 'Peak Hour Alert',
                description: 'Your busiest hour today was 12 PM. Consider adding an extra staff member during lunch hours to improve preparation time.',
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
                description: 'Your top selling item today is seeing higher than usual demand. Ensure you have sufficient inventory for the evening rush.',
                type: 'inventory',
                severity: 'medium'
            }
        ]
    },
    Week: {
        '5c1f8': [
            {
                title: 'Peak Hour Opportunity',
                description: 'Your busiest hour is 12:00 PM with 52 orders on average. Consider adding an extra staff member during 11:30 AM - 1:30 PM to improve preparation time.',
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
                severity: 'medium'
            },
            {
                title: 'Pricing Optimization',
                description: 'Your "Veggie Burger" at $8.00 has a 25% lower conversion rate compared to similar items. Consider adjusting the price or enhancing the description.',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Weekend Staffing',
                description: 'Friday sales are 32% higher than your weekly average. Consider scheduling additional staff for the upcoming Friday.',
                type: 'operational',
                severity: 'high'
            }
        ],
        '0e1b3': [
            {
                title: 'Preparation Time Alert',
                description: 'Your preparation time (12.3 min) is below the platform average (14.5 min) - this is excellent! Share your best practices with your team.',
                type: 'operational',
                severity: 'low'
            },
            {
                title: 'Menu Optimization',
                description: 'Your "Family Meal" has the highest profit margin but only ranks 8th in sales. Consider featuring it more prominently in your menu.',
                type: 'menu',
                severity: 'medium'
            },
            {
                title: 'Combo Opportunity',
                description: 'Customers who order "Crispy Chicken Wings" frequently also order "Coleslaw". Creating a combo with these items could increase average order value.',
                type: 'business',
                severity: 'medium'
            },
            {
                title: 'Inventory Planning',
                description: 'Based on your 3-week trend, you should expect approximately 20% higher sales this weekend compared to last. Plan your inventory accordingly.',
                type: 'inventory',
                severity: 'high'
            },
            {
                title: 'Customer Loyalty',
                description: 'Your repeat customer rate (38%) is higher than the platform average (32%). Consider a loyalty program to further capitalize on this strength.',
                type: 'business',
                severity: 'low'
            }
        ],
        'default': [
            {
                title: 'Peak Hour Opportunity',
                description: 'Your busiest hour is 12:00 PM. Consider adding an extra staff member during peak hours to improve preparation time.',
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
                description: 'Your top selling item\'s sales have increased since last week. Ensure you have sufficient inventory for the upcoming weekend rush.',
                type: 'inventory',
                severity: 'medium'
            }
        ]
    },
    Month: {
        '5c1f8': [
            {
                title: 'Monthly Trend Analysis',
                description: 'Your sales have increased by 8.4% compared to last month, while the city average is 3.2%. Your marketing strategies are working well!',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Preparation Time Analysis',
                description: 'Your average preparation time has increased to 13.5 minutes (up 2.3% from last month). Review your kitchen workflow for potential bottlenecks.',
                type: 'operational',
                severity: 'medium'
            },
            {
                title: 'Menu Insight',
                description: 'Your best performing items this month are burgers and sandwiches. Consider expanding these categories with seasonal variants.',
                type: 'menu',
                severity: 'low'
            },
            {
                title: 'Customer Retention',
                description: 'Your repeat customer rate is 35%, down 2% from last month. Consider implementing a loyalty program or special offers for returning customers.',
                type: 'business',
                severity: 'medium'
            },
            {
                title: 'Seasonal Recommendation',
                description: 'Based on platform trends, holiday-themed menu items perform well at this time of year. Consider adding 1-2 seasonal specials.',
                type: 'menu',
                severity: 'low'
            }
        ],
        '0e1b3': [
            {
                title: 'Monthly Performance',
                description: 'You\'ve achieved a 5.3% growth in orders this month compared to last month. Chicken Sandwich and Spicy Chicken Bucket are driving this growth.',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Menu Expansion Opportunity',
                description: 'Based on customer searches in your area, there\'s high demand for spicy grilled chicken options. Consider adding this to your menu.',
                type: 'menu',
                severity: 'medium'
            },
            {
                title: 'Operational Efficiency',
                description: 'Your kitchen is most efficient during 2-5 PM with 25% faster preparation times. Consider sharing these best practices across all shifts.',
                type: 'operational',
                severity: 'medium'
            },
            {
                title: 'Competitor Analysis',
                description: 'New chicken restaurant opened 2 miles away three weeks ago. Your sales dipped initially but have recovered, suggesting your quality is preferred.',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Promotion Recommendation',
                description: 'Family Meal sales peak on Sundays. Consider a "Sunday Family Special" promotion to further boost your strongest day.',
                type: 'business',
                severity: 'medium'
            }
        ],
        'default': [
            {
                title: 'Monthly Performance',
                description: 'Your sales have increased compared to last month. Keep up the good work!',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Menu Insight',
                description: 'Your best performing categories this month are worth focusing on. Consider expanding these categories with new variants.',
                type: 'menu',
                severity: 'low'
            },
            {
                title: 'Operational Recommendation',
                description: 'Review your kitchen workflow during peak hours to identify potential efficiency improvements.',
                type: 'operational',
                severity: 'medium'
            }
        ]
    },
    Year: {
        '5c1f8': [
            {
                title: 'Annual Growth Analysis',
                description: 'Your annual sales grew 22.5% compared to the previous year, outperforming the market average of 15%. Your investments in menu quality are paying off.',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Seasonal Pattern',
                description: 'Your sales peak during summer months (June-August) and December. Consider planning special promotions for these high-volume periods.',
                type: 'business',
                severity: 'medium'
            },
            {
                title: 'Menu Evolution',
                description: 'Over the year, burger sales increased 25% while sandwich sales remained flat. Focus your innovation on your burger category.',
                type: 'menu',
                severity: 'medium'
            },
            {
                title: 'Customer Lifetime Value',
                description: 'Your average customer makes 8.3 orders per year. Implementing a loyalty program could increase this by 20-30% based on platform data.',
                type: 'business',
                severity: 'high'
            },
            {
                title: 'Operational Trend',
                description: 'Your preparation time decreased 6.8% over the year despite order volume growth. Your operational improvements are working well.',
                type: 'operational',
                severity: 'low'
            }
        ],
        '0e1b3': [
            {
                title: 'Annual Performance',
                description: 'Your annual growth of 24.2% places you in the top 10% of chicken restaurants on the platform. Your consistent quality is driving success.',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Product Line Analysis',
                description: 'Spicy menu items showed 35% higher growth than non-spicy items. Consider expanding your spicy offerings further.',
                type: 'menu',
                severity: 'medium'
            },
            {
                title: 'Seasonal Strategy',
                description: 'Your sales dip 15-20% during January-February. Consider limited-time offers during this period to boost sales.',
                type: 'business',
                severity: 'high'
            },
            {
                title: 'Long-term Trend',
                description: 'Your Family Meal has grown consistently at 5% quarter-over-quarter throughout the year. This is becoming your signature offering.',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Competitive Position',
                description: 'You\'ve increased your market share from 8.3% to 10.5% in your local area this year. You\'re positioned well against competitors.',
                type: 'business',
                severity: 'medium'
            }
        ],
        'default': [
            {
                title: 'Annual Growth Analysis',
                description: 'Your annual sales showed good growth compared to the previous year. Your investments in quality are paying off.',
                type: 'business',
                severity: 'low'
            },
            {
                title: 'Seasonal Pattern',
                description: 'Your sales show seasonal patterns. Consider planning special promotions for high-volume periods.',
                type: 'business',
                severity: 'medium'
            },
            {
                title: 'Menu Evolution',
                description: 'Analyzing your yearly data shows which categories are growing. Focus innovation on your top-growing category.',
                type: 'menu',
                severity: 'medium'
            }
        ]
    }
};

// Helper function to get insights by merchant and time period
export const getInsightsByMerchant = (merchantId, timePeriod) => {
    // Get the data for the specified time period
    const periodData = mockAiInsights[timePeriod] || mockAiInsights['Week'];

    // Get the data for the specified merchant or use default
    return periodData[merchantId] || periodData['default'];
};

// Helper function to generate dynamic insights based on merchant performance
export const generateDynamicInsights = (merchantId, timeFilter, stats) => {
    const insights = [];

    // Add prep time insight if it's high
    if (stats && stats.prepTime > 14) {
        insights.push({
            title: 'Preparation Time Alert',
            description: `Your average preparation time (${stats.prepTime.toFixed(1)} min) is above the platform average. Consider optimizing your kitchen workflow.`,
            type: 'operational',
            severity: 'high'
        });
    }

    // Add sales insight based on performance
    if (stats && stats.totalSales) {
        // Create some benchmark comparison
        const benchmarkSales = {
            Today: 1200,
            Week: 8000,
            Month: 32000,
            Year: 380000
        };

        const benchmark = benchmarkSales[timeFilter] || benchmarkSales.Week;
        const performance = ((stats.totalSales / benchmark) * 100).toFixed(1);

        if (parseFloat(performance) > 110) {
            insights.push({
                title: 'Outstanding Performance',
                description: `Your ${timeFilter.toLowerCase()} sales are ${parseFloat(performance) - 100}% above the platform average for similar merchants. Keep up the excellent work!`,
                type: 'business',
                severity: 'low'
            });
        } else if (parseFloat(performance) < 90) {
            insights.push({
                title: 'Sales Opportunity',
                description: `Your ${timeFilter.toLowerCase()} sales are ${100 - parseFloat(performance)}% below the platform average. Consider running a special promotion to boost sales.`,
                type: 'business',
                severity: 'medium'
            });
        }
    }

    return insights;
};

export default {
    mockAiInsights,
    getInsightsByMerchant,
    generateDynamicInsights
};