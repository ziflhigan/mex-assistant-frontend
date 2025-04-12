import React, { useState, useEffect } from 'react';
import StatCard from '../common/StatCard';
import { useDashboard } from '../../contexts/DashboardContext';
import './css/StatsGrid.css';

const StatsGrid = ({ timeFrame }) => {
    const { dashboardData } = useDashboard();
    const [animateCards, setAnimateCards] = useState(false);

    // Trigger animation when data changes
    useEffect(() => {
        if (dashboardData) {
            setAnimateCards(true);
            const timer = setTimeout(() => setAnimateCards(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [dashboardData]);

    if (!dashboardData) {
        return <div className="stats-grid skeleton-stats"></div>;
    }

    const { totalSales, totalOrders, averageOrderValue } = dashboardData;
    
    // Calculate preparation time from data (example)
    const prepTime = 13.2; // This would be calculated from real data
    
    // More dynamic comparison text
    const getComparisonText = () => {
        const positive = Math.random() > 0.5; // In real app, would be based on actual data
        const percentage = (Math.random() * 15).toFixed(1);
        return positive ? `+${percentage}%` : `-${percentage}%`;
    };

    // Time-based comparison text
    const comparisonText = timeFrame === 'Today' ? 'yesterday' :
                          timeFrame === 'Week' ? 'last week' :
                          timeFrame === 'Month' ? 'last month' : 'last year';

    const stats = [
        {
            title: 'Total Sales',
            value: totalSales,
            change: `${getComparisonText()} since ${comparisonText}`,
            icon: 'dollar-sign',
            iconColor: 'var(--grab-green)',
            formatType: 'currency',
            changeDirection: Math.random() > 0.3 ? 'positive' : 'negative', // More dynamic
            additionalInfo: 'Total revenue from all orders'
        },
        {
            title: 'Total Orders',
            value: totalOrders,
            change: `${getComparisonText()} since ${comparisonText}`,
            icon: 'shopping-bag',
            iconColor: 'var(--accent-blue)',
            formatType: 'number',
            changeDirection: Math.random() > 0.3 ? 'positive' : 'negative',
            additionalInfo: 'Number of completed transactions'
        },
        {
            title: 'Average Order Value',
            value: averageOrderValue,
            change: `${getComparisonText()} since ${comparisonText}`,
            icon: 'receipt',
            iconColor: 'var(--accent-purple)',
            formatType: 'currency',
            changeDirection: Math.random() > 0.5 ? 'positive' : 'negative',
            additionalInfo: 'Average revenue per transaction'
        },
        {
            title: 'Avg Preparation Time',
            value: prepTime,
            change: `${getComparisonText()} since ${comparisonText}`,
            icon: 'clock',
            iconColor: 'var(--accent-orange)',
            formatType: 'minutes',
            changeDirection: Math.random() > 0.7 ? 'positive' : 'negative',
            additionalInfo: 'Time from order to pickup'
        }
    ];

    return (
        <div className={`stats-grid ${animateCards ? 'animate' : ''}`}>
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
                    additionalInfo={stat.additionalInfo}
                    animationDelay={index * 100}
                />
            ))}
        </div>
    );
};

export default StatsGrid;