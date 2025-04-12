import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StatCard from '../common/StatCard';
import { useDashboard } from '../../contexts/DashboardContext';
import './css/StatsGrid.css';

const StatsGrid = ({ timeFrame }) => {
    const { t } = useTranslation();
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
            title: t('dashboard.stats.totalSales.title'),
            value: totalSales,
            change: t('dashboard.stats.comparison.since', { period: comparisonText }),
            icon: 'dollar-sign',
            iconColor: 'var(--grab-green)',
            formatType: 'currency',
            changeDirection: Math.random() > 0.3 ? 'positive' : 'negative',
            additionalInfo: t('dashboard.stats.totalSales.info')
        },
        {
            title: t('dashboard.stats.totalOrders.title'),
            value: totalOrders,
            change: t('dashboard.stats.comparison.since', { period: comparisonText }),
            icon: 'shopping-bag',
            iconColor: 'var(--accent-blue)',
            formatType: 'number',
            changeDirection: Math.random() > 0.3 ? 'positive' : 'negative',
            additionalInfo: t('dashboard.stats.totalOrders.info')
        },
        {
            title: t('dashboard.stats.averageOrderValue.title'),
            value: averageOrderValue,
            change: t('dashboard.stats.comparison.since', { period: comparisonText }),
            icon: 'receipt',
            iconColor: 'var(--accent-purple)',
            formatType: 'currency',
            changeDirection: Math.random() > 0.5 ? 'positive' : 'negative',
            additionalInfo: t('dashboard.stats.averageOrderValue.info')
        },
        {
            title: t('dashboard.stats.preparationTime.title'),
            value: prepTime,
            change: t('dashboard.stats.comparison.since', { period: comparisonText }),
            icon: 'clock',
            iconColor: 'var(--accent-orange)',
            formatType: 'minutes',
            changeDirection: Math.random() > 0.7 ? 'positive' : 'negative',
            additionalInfo: t('dashboard.stats.preparationTime.info')
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