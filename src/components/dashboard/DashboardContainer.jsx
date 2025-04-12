import React, { useRef, useState, useEffect } from 'react';
import StatsGrid from './StatsGrid';
import SalesTrendChart from './SalesTrendChart';
import HourlySalesChart from './HourlySalesChart';
import DailySalesChart from './DailySalesChart';
import TopItemsTable from './TopItemsTable';
import AiInsights from './AiInsights';
import TimeFilter from '../common/TimeFilter';
import Loader from '../common/Loader';
import MerchantSelector from '../common/MerchantSelector';
import { useDashboard } from '../../contexts/DashboardContext';
import { downloadDashboardReport } from '../../utils/DownloadChartsUtil';
import './css/Dashboard.css';

function DashboardContainer() {
    // Use the dashboard context
    const {
        dashboardData,
        timeFilter,
        loading,
        error,
        lastUpdated,
        handleTimeFilterChange,
        refreshData,
        getComparisonText
    } = useDashboard();

    // New state for expandable sections
    const [expandedSection, setExpandedSection] = useState(null);
    const [showRefreshAnimation, setShowRefreshAnimation] = useState(false);

    // Chart refs for downloading and expanded view
    const salesTrendChartRef = useRef(null);
    const hourlySalesChartRef = useRef(null);
    const dailySalesChartRef = useRef(null);

    // Convert context timeFilter to display format for TimeFilter component
    const displayTimeFilter = timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1);

    // Format the last updated timestamp
    const formattedLastUpdated = lastUpdated ?
        new Date(lastUpdated).toLocaleString() :
        'Not yet loaded';

    // Handle export dashboard data
    const handleExport = () => {
        console.log("Exporting dashboard data...");
        if (dashboardData) {
            downloadDashboardReport(dashboardData, timeFilter);
        } else {
            alert("No data available to export");
        }
    };

    // Handle refresh with animation
    const handleRefresh = () => {
        setShowRefreshAnimation(true);
        refreshData();
        setTimeout(() => setShowRefreshAnimation(false), 1000);
    };

    // Handle section expansion
    const handleExpandSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    // Effect to check if data is still loading
    useEffect(() => {
        if (!loading) {
            setShowRefreshAnimation(false);
        }
    }, [loading]);

    // Debug log for data
    useEffect(() => {
        if (dashboardData) {
            console.log('Dashboard data in component:', dashboardData);
            if (dashboardData.aiInsights) {
                console.log('AI Insights available:', dashboardData.aiInsights.length);
            }
        }
    }, [dashboardData]);

    if (error) {
        return (
            <div className="dashboard-error">
                <h2>Error</h2>
                <p>{error}</p>
                <button className="retry-button" onClick={refreshData}>
                    <i className="fas fa-sync-alt"></i> Retry
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-title-area">
                    <h2 className="dashboard-title">Merchant Dashboard</h2>
                    <div className="dashboard-subtitle">
            <span className="last-updated">
              Last updated: {formattedLastUpdated}
            </span>
                        {!loading && (
                            <button
                                className={`refresh-button ${showRefreshAnimation ? 'rotating' : ''}`}
                                onClick={handleRefresh}
                                disabled={loading}
                            >
                                <i className="fas fa-sync-alt"></i>
                            </button>
                        )}
                    </div>
                </div>
                <div className="dashboard-actions">
                    <MerchantSelector />
                    <TimeFilter
                        options={['Today', 'Week', 'Month', 'Year']}
                        defaultValue={displayTimeFilter}
                        onChange={handleTimeFilterChange}
                    />
                    <button className="export-button" onClick={handleExport}>
                        <i className="fas fa-download"></i> Export Data
                    </button>
                </div>
            </div>

            {loading && !dashboardData ? (
                <div className="dashboard-loading">
                    <Loader />
                    <p className="loading-text">Loading your business insights...</p>
                </div>
            ) : (
                <>
                    <section className="stats-section">
                        <StatsGrid
                            data={dashboardData}
                            timeFrame={displayTimeFilter}
                            comparisonText={getComparisonText()}
                        />
                    </section>

                    <section className={`charts-section ${expandedSection === 'salesTrend' ? 'expanded' : ''}`}>
                        <div className="chart-container chart-container-full">
                            <div className="chart-header">
                                <div className="chart-title">
                                    <i className="fas fa-chart-line"></i> Sales & Orders Trend
                                </div>
                                <div className="chart-actions">
                                    <button onClick={() => handleExpandSection('salesTrend')}>
                                        <i className={`fas fa-${expandedSection === 'salesTrend' ? 'compress-alt' : 'expand-alt'}`}></i>
                                        {expandedSection === 'salesTrend' ? 'Collapse' : 'Expand'}
                                    </button>
                                    <button onClick={handleExport}>
                                        <i className="fas fa-download"></i> Export
                                    </button>
                                </div>
                            </div>
                            <SalesTrendChart
                                data={dashboardData?.salesTrend}
                                ref={salesTrendChartRef}
                                expanded={expandedSection === 'salesTrend'}
                            />
                        </div>

                        <div className="charts-grid">
                            <div className={`chart-container ${expandedSection === 'hourlySales' ? 'expanded' : ''}`}>
                                <div className="chart-header">
                                    <div className="chart-title">
                                        <i className="fas fa-clock"></i> Sales by Hour
                                    </div>
                                    <div className="chart-actions">
                                        <button onClick={() => handleExpandSection('hourlySales')}>
                                            <i className={`fas fa-${expandedSection === 'hourlySales' ? 'compress-alt' : 'expand-alt'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <HourlySalesChart
                                    data={dashboardData?.hourlySales}
                                    ref={hourlySalesChartRef}
                                    expanded={expandedSection === 'hourlySales'}
                                />
                            </div>

                            <div className={`chart-container ${expandedSection === 'dailySales' ? 'expanded' : ''}`}>
                                <div className="chart-header">
                                    <div className="chart-title">
                                        <i className="fas fa-calendar-day"></i> Sales by Day
                                    </div>
                                    <div className="chart-actions">
                                        <button onClick={() => handleExpandSection('dailySales')}>
                                            <i className={`fas fa-${expandedSection === 'dailySales' ? 'compress-alt' : 'expand-alt'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <DailySalesChart
                                    data={dashboardData?.dailySales}
                                    ref={dailySalesChartRef}
                                    expanded={expandedSection === 'dailySales'}
                                />
                            </div>
                        </div>
                    </section>

                    <section className={`top-items ${expandedSection === 'topItems' ? 'expanded' : ''}`}>
                        <div className="chart-header">
                            <div className="chart-title">
                                <i className="fas fa-trophy"></i> Top Selling Items
                            </div>
                            <div className="chart-actions">
                                <button onClick={() => handleExpandSection('topItems')}>
                                    <i className={`fas fa-${expandedSection === 'topItems' ? 'compress-alt' : 'expand-alt'}`}></i>
                                    {expandedSection === 'topItems' ? 'Collapse' : 'Expand'}
                                </button>
                            </div>
                        </div>
                        <TopItemsTable
                            data={dashboardData?.topItems}
                            expanded={expandedSection === 'topItems'}
                        />
                    </section>

                    <section className={`insights-container ${expandedSection === 'aiInsights' ? 'expanded' : ''}`}>
                        <div className="insights-header">
                            <div className="insights-title">
                                <i className="fas fa-lightbulb"></i>
                                AI-Powered Insights
                            </div>
                            <div className="chart-actions">
                                <button onClick={() => handleExpandSection('aiInsights')}>
                                    <i className={`fas fa-${expandedSection === 'aiInsights' ? 'compress-alt' : 'expand-alt'}`}></i>
                                    {expandedSection === 'aiInsights' ? 'Collapse' : 'View All Insights'}
                                </button>
                            </div>
                        </div>
                        <AiInsights
                            insights={dashboardData?.aiInsights || []}
                            expanded={expandedSection === 'aiInsights'}
                        />
                    </section>
                </>
            )}
        </div>
    );
}

export default DashboardContainer;