import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/numberFormatter';
import { chartColors } from '../../utils/chartUtils';
import './css/TopItemsTable.css';
import '../dashboard/css/charts.css';

function TopItemsTable({ data, expanded = false }) {
    const { t } = useTranslation();
    const [sortConfig, setSortConfig] = useState({
        key: 'revenue',
        direction: 'desc'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [highlightedRow, setHighlightedRow] = useState(null);

    // Initialize filteredData when data changes
    useEffect(() => {
        if (!data || data.length === 0) {
            setFilteredData([]);
            return;
        }

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(item => item.category || 'Uncategorized'))];
        setCategories(uniqueCategories);

        // Apply filters and sorting
        applyFilters(data, searchTerm, selectedCategory);
    }, [data]);

    // Apply filters when search or category changes
    useEffect(() => {
        if (data) {
            applyFilters(data, searchTerm, selectedCategory);
        }
    }, [searchTerm, selectedCategory]);

    const applyFilters = (items, search, category) => {
        let result = [...items];

        // Apply search filter
        if (search.trim() !== '') {
            result = result.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                (item.category && item.category.toLowerCase().includes(search.toLowerCase()))
            );
        }

        // Apply category filter
        if (category !== 'All') {
            result = result.filter(item => item.category === category);
        }

        // Apply sorting
        result = sortData(result, sortConfig);

        setFilteredData(result);
    };

    const sortData = (items, config) => {
        return [...items].sort((a, b) => {
            if (a[config.key] < b[config.key]) {
                return config.direction === 'asc' ? -1 : 1;
            }
            if (a[config.key] > b[config.key]) {
                return config.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const handleSort = (key) => {
        setSortConfig((prevConfig) => {
            if (prevConfig.key === key) {
                return {
                    ...prevConfig,
                    direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
                };
            }
            return { key, direction: 'desc' };
        });

        // Apply new sorting
        if (filteredData.length > 0) {
            setFilteredData(sortData(filteredData, {
                key,
                direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
            }));
        }
    };

    const handleRowHover = (index) => {
        setHighlightedRow(index);
    };

    if (!data || data.length === 0) {
        return (
            <div className="no-data-message">
                <i className="fas fa-shopping-basket"></i>
                <p>{t('dashboard.topItems.noData.title')}</p>
                <span>{t('dashboard.topItems.noData.subtitle')}</span>
            </div>
        );
    }

    // Colors for the item markers - use our chart colors
    const colors = [
        chartColors.accent1,
        chartColors.accent2,
        chartColors.accent4,
        chartColors.secondary,
        chartColors.accent3,
        chartColors.accent5,
        chartColors.primary,
        '#34495e'
    ];

    // Calculate trend percentages (placeholder)
    const getTrendValue = (index) => {
        const trends = ['+12.4%', '+8.7%', '-2.3%', '+15.8%', '+6.2%', '-4.1%', '+9.3%', '+3.8%'];
        return trends[index % trends.length];
    };

    // Determine if trend is positive or negative
    const isTrendPositive = (trend) => trend.startsWith('+');

    return (
        <div className="top-items-container">
            <div className="table-controls">
                <div className="search-filter">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder={t('dashboard.topItems.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="category-filter">
                    <label>{t('dashboard.topItems.category')}</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="table-container">
                <table className="items-table">
                    <thead>
                    <tr>
                        <th className="rank-column">#</th>
                        <th
                            className={sortConfig.key === 'name' ? 'active-sort' : ''}
                            onClick={() => handleSort('name')}
                        >
                            {t('dashboard.topItems.summary.topItem')}
                            <i className={`fas fa-sort${sortConfig.key === 'name' ? sortConfig.direction === 'asc' ? '-up' : '-down' : ''}`}></i>
                        </th>
                        <th>{t('dashboard.topItems.category')}</th>
                        <th
                            className={sortConfig.key === 'revenue' ? 'active-sort' : ''}
                            onClick={() => handleSort('revenue')}
                        >
                            {t('dashboard.topItems.summary.totalRevenue')}
                            <i className={`fas fa-sort${sortConfig.key === 'revenue' ? sortConfig.direction === 'asc' ? '-up' : '-down' : ''}`}></i>
                        </th>
                        <th
                            className={sortConfig.key === 'quantity' ? 'active-sort' : ''}
                            onClick={() => handleSort('quantity')}
                        >
                            {t('dashboard.topItems.summary.totalOrders')}
                            <i className={`fas fa-sort${sortConfig.key === 'quantity' ? sortConfig.direction === 'asc' ? '-up' : '-down' : ''}`}></i>
                        </th>
                        <th>{t('dashboard.charts.trend')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((item, index) => {
                        const trend = getTrendValue(index);
                        const trendClass = isTrendPositive(trend) ? 'trend-up' : 'trend-down';

                        return (
                            <tr
                                key={index}
                                className={highlightedRow === index ? 'highlighted' : ''}
                                onMouseEnter={() => handleRowHover(index)}
                                onMouseLeave={() => handleRowHover(null)}
                            >
                                <td className="rank-column">{index + 1}</td>
                                <td>
                                    <div className="item-name">
                                        <div
                                            className="item-color"
                                            style={{ backgroundColor: colors[index % colors.length] }}
                                        ></div>
                                        {item.name}
                                    </div>
                                </td>
                                <td>{item.category || 'Uncategorized'}</td>
                                <td>{formatCurrency(item.revenue / item.quantity)}</td>
                                <td>{item.quantity}</td>
                                <td>
                                        <span className={`trend-badge ${trendClass}`}>
                                            {trendClass === 'trend-up' ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>}
                                            {trend}
                                        </span>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {expanded && filteredData.length > 0 && (
                <div className="table-summary">
                    <div className="summary-card">
                        <div className="summary-title">{t('dashboard.topItems.summary.topItem')}</div>
                        <div className="summary-value">{filteredData[0]?.name}</div>
                        <div className="summary-info">{filteredData[0]?.quantity} {t('dashboard.topItems.summary.orders')}</div>
                    </div>
                    <div className="summary-card">
                        <div className="summary-title">{t('dashboard.topItems.summary.totalOrders')}</div>
                        <div className="summary-value">{filteredData.reduce((sum, item) => sum + item.quantity, 0)}</div>
                        <div className="summary-info">{t('dashboard.topItems.summary.items', { count: filteredData.length })}</div>
                    </div>
                    <div className="summary-card">
                        <div className="summary-title">{t('dashboard.topItems.summary.totalRevenue')}</div>
                        <div className="summary-value">{formatCurrency(filteredData.reduce((sum, item) => sum + item.revenue, 0))}</div>
                        <div className="summary-info">{t('dashboard.topItems.summary.average', { value: formatCurrency(filteredData.reduce((sum, item) => sum + item.revenue, 0) / filteredData.length) })}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopItemsTable;