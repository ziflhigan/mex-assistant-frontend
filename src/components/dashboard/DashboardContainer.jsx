import React, {useRef } from 'react';
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
import './Dashboard.css';

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

    // Chart refs for downloading
    const salesTrendChartRef = useRef(null);
    const hourlySalesChartRef = useRef(null);
    const dailySalesChartRef = useRef(null);

    // Convert context timeFilter to display format for TimeFilter component
    const displayTimeFilter = timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1);

    // Format the last updated timestamp
    const formattedLastUpdated = lastUpdated ?
        new Date(lastUpdated).toLocaleString() :
        'Not yet loaded';

    const handleExport = () => {
        console.log("Exporting dashboard data...");
        // Call download function
        if (dashboardData) {
            downloadDashboardReport(dashboardData, timeFilter);
        } else {
            alert("No data available to export");
        }
    };

    const handleRefresh = () => {
        refreshData();
    };

    const handleViewAll = (section) => {
        console.log(`View all clicked for ${section}`);
        alert(`Viewing all items in ${section}`);
    };

    if (error) {
        return (
            <div className="dashboard-error">
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={refreshData}>Retry</button>
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
                            <button className="refresh-button" onClick={handleRefresh}>
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
                </div>
            ) : (
                <>
                    <section className="stats-section">
                        <StatsGrid data={dashboardData} timeFrame={displayTimeFilter} comparisonText={getComparisonText()} />
                    </section>

                    <section className="charts-section">
                        <div className="chart-container chart-container-full">
                            <div className="chart-header">
                                <div className="chart-title">Sales & Orders Trend</div>
                                <div className="chart-actions">
                                    <button onClick={() => handleViewAll('salesTrend')}>
                                        <i className="fas fa-expand"></i> View Full
                                    </button>
                                    <button onClick={handleExport}>
                                        <i className="fas fa-download"></i> Export
                                    </button>
                                </div>
                            </div>
                            <SalesTrendChart
                                data={dashboardData?.salesTrend}
                                ref={salesTrendChartRef}
                            />
                        </div>

                        <div className="charts-grid">
                            <div className="chart-container">
                                <div className="chart-header">
                                    <div className="chart-title">Sales by Hour</div>
                                    <div className="chart-actions">
                                        <button onClick={() => handleViewAll('hourlySales')}>View All</button>
                                    </div>
                                </div>
                                <HourlySalesChart
                                    data={dashboardData?.hourlySales}
                                    ref={hourlySalesChartRef}
                                />
                            </div>
                            <div className="chart-container">
                                <div className="chart-header">
                                    <div className="chart-title">Sales by Day</div>
                                    <div className="chart-actions">
                                        <button onClick={() => handleViewAll('dailySales')}>View All</button>
                                    </div>
                                </div>
                                <DailySalesChart
                                    data={dashboardData?.dailySales}
                                    ref={dailySalesChartRef}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="top-items">
                        <div className="chart-header">
                            <div className="chart-title">Top Selling Items</div>
                            <div className="chart-actions">
                                <button onClick={() => handleViewAll('topItems')}>View All</button>
                            </div>
                        </div>
                        <TopItemsTable data={dashboardData?.topItems} />
                    </section>

                    <section className="insights-container">
                        <div className="insights-header">
                            <div className="insights-title">
                                <i className="fas fa-lightbulb"></i>
                                AI-Powered Insights
                            </div>
                            <div className="chart-actions">
                                <button onClick={() => handleViewAll('aiInsights')}>View All Insights</button>
                            </div>
                        </div>
                        <AiInsights insights={dashboardData?.aiInsights} />
                    </section>
                </>
            )}
        </div>
    );
}

export default DashboardContainer;