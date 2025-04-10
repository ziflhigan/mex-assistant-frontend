import React, { useEffect, useState, useRef } from 'react';
import StatsGrid from './StatsGrid';
import SalesTrendChart from './SalesTrendChart';
import HourlySalesChart from './HourlySalesChart';
import DailySalesChart from './DailySalesChart';
import TopItemsTable from './TopItemsTable';
import AiInsights from './AiInsights';
import TimeFilter from '../common/TimeFilter';
import Loader from '../common/Loader';
import { DashboardProvider } from '../../contexts/DashboardContext';
import { getDashboardData } from '../../services/mockService';
import { downloadDashboardReport } from '../../utils/DownloadChartsUtil';
import './Dashboard.css';

function DashboardContainer() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeFrame, setTimeFrame] = useState('Today');
    const [error, setError] = useState(null);

    // Chart refs for downloading
    const salesTrendChartRef = useRef(null);
    const hourlySalesChartRef = useRef(null);
    const dailySalesChartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // In a real app, you would pass the timeFilter to the API
                const data = await getDashboardData();
                setDashboardData(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Failed to load dashboard data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeFrame]); // Re-fetch when timeFilter changes

    const handleTimeFrameChange = (selectedTimeFrame) => {
        setTimeFrame(selectedTimeFrame);
        console.log(`Time frame changed to: ${selectedTimeFrame}`);
    };

    const handleExport = () => {
        console.log("Exporting dashboard data...");
        // Call download function
        if (dashboardData) {
            downloadDashboardReport(dashboardData, timeFrame.toLowerCase());
        } else {
            alert("No data available to export");
        }
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
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <DashboardProvider value={{ dashboardData, timeFilter: timeFrame.toLowerCase() }}>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2 className="dashboard-title">Merchant Dashboard</h2>
                    <div className="dashboard-actions">
                        <TimeFilter
                            options={['Today', 'Week', 'Month', 'Year']}
                            defaultValue={timeFrame}
                            onChange={handleTimeFrameChange}
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
                            <StatsGrid data={dashboardData} timeFrame={timeFrame} />
                        </section>

                        <section className="charts-section">
                            <div className="chart-container chart-container-full">
                                <div className="chart-header">
                                    <div className="chart-title">Sales & Orders Trend</div>
                                    <div className="chart-actions">
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
                            </div>
                            <AiInsights insights={dashboardData?.aiInsights} />
                        </section>
                    </>
                )}
            </div>
        </DashboardProvider>
    );
}

export default DashboardContainer;