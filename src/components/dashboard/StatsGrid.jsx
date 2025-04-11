import React from 'react';
import StatCard from '../common/StatCard';
import { useDashboard } from '../../contexts/DashboardContext';

const StatsGrid = ({ timeFrame }) => {
    const { dashboardData } = useDashboard();

    if (!dashboardData) {
        return <div className="stats-grid skeleton-stats"></div>;
    }

    const { totalSales, totalOrders, averageOrderValue } = dashboardData;

    // Placeholder for preparation time (not in original data)
    const prepTime = 13.2;

    // Time-based comparison text
    const comparisonText = timeFrame === 'Today' ? 'yesterday' :
        timeFrame === 'Week' ? 'last week' :
            timeFrame === 'Month' ? 'last month' : 'last year';

    const stats = [
        {
            title: 'Total Sales',
            value: totalSales,
            change: `12.5% since ${comparisonText}`,
            icon: 'dollar-sign',
            iconColor: 'var(--grab-green)',
            formatType: 'currency',
            changeDirection: 'positive'
        },
        {
            title: 'Total Orders',
            value: totalOrders,
            change: `8.3% since ${comparisonText}`,
            icon: 'shopping-bag',
            iconColor: 'var(--accent-blue)',
            formatType: 'number',
            changeDirection: 'positive'
        },
        {
            title: 'Average Order Value',
            value: averageOrderValue,
            change: `3.7% since ${comparisonText}`,
            icon: 'receipt',
            iconColor: 'var(--accent-purple)',
            formatType: 'currency',
            changeDirection: 'positive'
        },
        {
            title: 'Avg Preparation Time',
            value: prepTime,
            change: `5.1% since ${comparisonText}`,
            icon: 'clock',
            iconColor: 'var(--accent-orange)',
            formatType: 'minutes',
            changeDirection: 'negative'
        }
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    icon={stat.icon}
                    iconColor={stat.iconColor}
                    formatType={stat.formatType}
                    changeDirection={stat.changeDirection}
                />
            ))}
        </div>
    );
};

export default StatsGrid;