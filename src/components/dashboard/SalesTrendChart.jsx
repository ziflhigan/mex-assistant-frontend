/**
 * SalesTrendChart.jsx
 *
 * This component renders a line chart displaying sales and/or order trends over time,
 * potentially including a predicted trend line and comparison data.
 * It utilizes Chart.js for rendering and manages various display modes and interactions.
 */
import React, { useState, useEffect, useRef, forwardRef } from 'react';

// --- Utilities ---
import { formatDate } from '../../utils/dateFormatter';
import { formatCurrency } from '../../utils/numberFormatter';
import { chartColors, createGradient, getDefaultChartOptions } from '../../utils/chartUtils';

// --- Child Components ---
import Loader from '../common/Loader'; // Keep Loader for potential placeholder use

// --- Styling ---
import './css/SalesTrendChart.css';
import '../dashboard/css/charts.css'; // Shared chart styles from dashboard

// --- Chart.js Imports ---
// Import necessary components from Chart.js for tree-shaking
import {
    Chart,
    LineController, // Controller for line charts
    LineElement,    // Represents the line on the chart
    PointElement,   // Represents the points on the line
    LinearScale,    // Scale for linear numerical data (Y-axes)
    CategoryScale,  // Scale for categorical data (X-axis labels)
    Tooltip,        // Plugin for displaying tooltips on hover
    Legend,         // Plugin for displaying the chart legend
    Filler          // Plugin required for area fills below lines (`fill: true`)
} from 'chart.js';

// --- Chart.js Registration ---
// Register the imported components with Chart.js.
// This needs to be done once per module load before creating any charts.
Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler
);

/**
 * SalesTrendChart Component
 * @param {object} props - Component props
 * @param {Array<object>} props.data - Array of data points, e.g., [{ date: '...', sales: 100, orders: 10 }, ...]
 * @param {boolean} [props.expanded=false] - Flag indicating if the chart is in an expanded view mode.
 * @param {React.Ref} ref - Forwarded ref to allow parent access to chart instance/canvas.
 */
const SalesTrendChart = forwardRef(({ data, expanded = false }, ref) => {
    // --- State ---
    const [showPrediction, setShowPrediction] = useState(true); // Toggle for prediction line
    const [compareMode, setCompareMode] = useState(false);     // Toggle for comparing to a previous period
    const [selectedDataPoint, setSelectedDataPoint] = useState(null); // Info for clicked data point
    const [chartMode, setChartMode] = useState('sales');       // Controls which data to display ('sales', 'orders', 'both')

    // --- Refs ---
    const chartRef = useRef(null); // Ref for the canvas element
    const chartInstance = useRef(null); // Ref to store the Chart.js instance

    // --- Imperative Handle ---
    // Expose methods/values to the parent component via the forwarded ref.
    React.useImperativeHandle(ref, () => ({
        getCanvas: () => chartRef.current,
        getChartInstance: () => chartInstance.current,
        // Add other methods if needed, e.g., downloadChartAsImage: () => {...}
    }));

    // --- Cleanup Effect ---
    // Ensures the Chart.js instance is destroyed when the component unmounts
    // to prevent memory leaks and canvas reuse errors.
    useEffect(() => {
        // Return the cleanup function
        return () => {
            if (chartInstance.current) {
                console.log("SalesTrendChart: Destroying chart instance on unmount.");
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only on unmount

    // --- Main Chart Rendering Effect ---
    // This effect re-renders the chart whenever the data or display options change.
    useEffect(() => {
        console.log("SalesTrendChart: useEffect triggered. Rendering with data:", data);

        // --- Guard Clauses ---
        // Don't proceed if we don't have a canvas ref or valid data.
        // The parent component (`DashboardContainer`) should handle the primary loading state.
        if (!chartRef.current) {
            console.log("SalesTrendChart: Canvas ref not available yet.");
            return;
        }
        if (!data || data.length === 0) {
            console.log("SalesTrendChart: No data provided.");
            // If a previous chart instance exists, destroy it when data becomes empty
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
            return;
        }

        // --- Get Canvas Context ---
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) {
            console.error("SalesTrendChart: Failed to get canvas context.");
            return;
        }
        console.log("SalesTrendChart: Canvas context acquired.");

        // --- Destroy Previous Instance ---
        // Ensures that any existing chart on this canvas is destroyed before creating a new one.
        // This is crucial for preventing the "Canvas is already in use" error during updates.
        if (chartInstance.current) {
            console.log("SalesTrendChart: Destroying previous chart instance before update.");
            chartInstance.current.destroy();
            chartInstance.current = null; // Ensure ref is cleared
        }

        // --- Data Preparation ---
        // Format dates for X-axis labels
        const labels = data.map(item => formatDate(new Date(item.date), 'MM/dd'));

        // Generate prediction data (simple linear trend for the next 7 days)
        let predictedLabels = [];
        let predictedSales = [];
        let predictedOrders = [];

        if (showPrediction && data.length > 1) {
            console.log("SalesTrendChart: Generating prediction data");
            const lastDate = new Date(data[data.length - 1].date);
            const salesValues = data.map(item => item.sales);
            const orderValues = data.map(item => item.orders); // Needed for order prediction

            // Use a slightly longer trend calculation window if possible
            const recentSales = salesValues.slice(-Math.min(5, salesValues.length));
            const recentOrders = orderValues.slice(-Math.min(5, orderValues.length));
            const salesTrend = calculateTrend(recentSales);
            const ordersTrend = calculateTrend(recentOrders); // Calculate trend for orders too

            for (let i = 1; i <= 7; i++) {
                const nextDate = new Date(lastDate);
                nextDate.setDate(lastDate.getDate() + i);
                predictedLabels.push(formatDate(nextDate, 'MM/dd'));

                // Predict based on last actual value + trend * days ahead
                const lastSales = salesValues[salesValues.length - 1] || 0;
                const lastOrders = orderValues[orderValues.length - 1] || 0;

                // Ensure predicted values don't go below zero (or a reasonable minimum)
                const predictedSale = Math.max(0, lastSales + (salesTrend * i));
                const predictedOrder = Math.max(0, Math.round(lastOrders + (ordersTrend * i)));

                predictedSales.push(predictedSale);
                predictedOrders.push(predictedOrder);
            }
        }

        // --- Chart Configuration ---
        try {
            // Create gradients for area fills
            const salesGradient = createGradient(ctx, 'rgba(0, 177, 79, 0.4)', 'rgba(0, 177, 79, 0.05)');
            const ordersGradient = createGradient(ctx, 'rgba(52, 152, 219, 0.4)', 'rgba(52, 152, 219, 0.05)');

            // Prepare datasets based on the current chartMode
            let datasets = [];

            // Sales Dataset(s)
            if (chartMode === 'sales' || chartMode === 'both') {
                datasets.push({
                    label: 'Sales ($)',
                    data: data.map(item => item.sales),
                    borderColor: chartColors.primary,
                    backgroundColor: salesGradient,
                    yAxisID: 'y', // Primary Y-axis
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                });

                if (showPrediction) {
                    datasets.push({
                        label: 'Predicted Sales ($)',
                        data: Array(labels.length).fill(null).concat(predictedSales), // Pad with nulls for actual data range
                        borderColor: chartColors.primary,
                        backgroundColor: 'rgba(0, 177, 79, 0.05)', // Lighter fill for prediction
                        borderDash: [5, 5], // Dashed line for prediction
                        yAxisID: 'y',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 3,
                        pointBackgroundColor: chartColors.primary,
                        borderWidth: 2
                    });
                }

                if (compareMode) {
                    // Placeholder for previous period data - replace with actual fetched data if available
                    const previousPeriodData = data.map(item => item.sales * (0.7 + Math.random() * 0.2)); // Example: 70-90% of current
                    datasets.push({
                        label: 'Previous Period Sales',
                        data: previousPeriodData,
                        borderColor: '#888', // Grey color for comparison
                        backgroundColor: 'rgba(136, 136, 136, 0.05)',
                        borderDash: [2, 2], // Different dash style
                        yAxisID: 'y',
                        tension: 0.4,
                        fill: false, // Typically don't fill comparison lines
                        borderWidth: 2
                    });
                }
            }

            // Orders Dataset(s)
            if (chartMode === 'orders' || chartMode === 'both') {
                datasets.push({
                    label: 'Orders',
                    data: data.map(item => item.orders),
                    borderColor: chartColors.secondary,
                    // Fill only if 'orders' is the primary mode, otherwise use dashed line in 'both' mode
                    backgroundColor: chartMode === 'orders' ? ordersGradient : 'transparent',
                    borderDash: chartMode === 'both' ? [5, 5] : [],
                    yAxisID: chartMode === 'both' ? 'y1' : 'y', // Use secondary Y-axis in 'both' mode
                    tension: 0.4,
                    fill: chartMode === 'orders', // Fill only when it's the main focus
                    borderWidth: 2
                });

                if (showPrediction) {
                    datasets.push({
                        label: 'Predicted Orders',
                        data: Array(labels.length).fill(null).concat(predictedOrders),
                        borderColor: chartColors.secondary,
                        backgroundColor: 'rgba(52, 152, 219, 0.05)',
                        borderDash: [3, 3], // Different dash style for predicted orders
                        yAxisID: chartMode === 'both' ? 'y1' : 'y',
                        tension: 0.4,
                        fill: chartMode === 'orders', // Match fill behavior of actual orders
                        pointRadius: 3,
                        pointBackgroundColor: chartColors.secondary,
                        borderWidth: 2
                    });
                }
            }

            // Get base chart options
            const defaultOptions = getDefaultChartOptions(expanded);

            // --- Chart Instantiation ---
            chartInstance.current = new Chart(ctx, {
                type: 'line', // Specify chart type
                data: {
                    labels: [...labels, ...predictedLabels], // Combine actual and predicted labels
                    datasets: datasets
                },
                options: {
                    ...defaultOptions, // Spread default options
                    responsive: true,
                    maintainAspectRatio: !expanded, // Allow aspect ratio change when expanded
                    interaction: {
                        mode: 'index', // Show tooltips for all datasets at the same index
                        intersect: false, // Tooltip triggers even without direct hover on point/line
                    },
                    plugins: {
                        ...defaultOptions.plugins, // Spread default plugin options
                        tooltip: {
                            ...defaultOptions.plugins?.tooltip,
                            callbacks: {
                                // Custom tooltip label formatting
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        // Format as currency if the dataset label indicates sales
                                        label += context.dataset.label.includes('Sales')
                                            ? formatCurrency(context.parsed.y)
                                            : context.parsed.y; // Otherwise, show raw number (for orders)
                                    }
                                    return label;
                                }
                            }
                        },
                        legend: {
                            ...defaultOptions.plugins?.legend,
                            // Custom legend item click handler
                            onClick: (e, legendItem, legend) => {
                                // Toggle prediction visibility by clicking prediction legends
                                if (legendItem.text.includes('Predicted')) {
                                    setShowPrediction(prev => !prev); // Toggle state instead of directly manipulating
                                } else {
                                    // Default behavior for toggling dataset visibility
                                    const index = legendItem.datasetIndex;
                                    const ci = legend.chart;
                                    if (ci.isDatasetVisible(index)) {
                                        ci.hide(index);
                                        legendItem.hidden = true;
                                    } else {
                                        ci.show(index);
                                        legendItem.hidden = false;
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        // --- X Axis Configuration ---
                        x: {
                            ...defaultOptions.scales?.x,
                            type: 'category', // Explicitly set scale type for labels
                            title: {
                                display: true,
                                text: 'Date'
                            },
                            grid: {
                                ...defaultOptions.scales?.x?.grid,
                                // Custom grid line color/width for prediction separator
                                color: (context) => {
                                    if (showPrediction && context.tick && context.index === labels.length -1 ) {
                                        return 'rgba(0, 177, 79, 0.5)'; // Highlight separator line
                                    }
                                    return 'rgba(0, 0, 0, 0.05)'; // Default grid line color
                                },
                                lineWidth: (context) => {
                                    if (showPrediction && context.tick && context.index === labels.length -1 ) {
                                        return 2; // Make separator line thicker
                                    }
                                    return 1; // Default grid line width
                                }
                            }
                        },
                        // --- Y Axis (Primary - Sales or Orders) ---
                        y: {
                            ...defaultOptions.scales?.y,
                            type: 'linear', // Explicitly set scale type
                            display: true,
                            position: 'left',
                            beginAtZero: false, // Allow chart to focus on value range
                            title: {
                                ...defaultOptions.scales?.y?.title,
                                display: true,
                                // Dynamic axis title based on chart mode
                                text: chartMode === 'orders' ? 'Number of Orders' : 'Sales ($)',
                                font: { weight: 'bold' }
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)', // Explicitly set grid color
                            }
                        },
                        // --- Y Axis (Secondary - Orders in 'both' mode) ---
                        // Conditionally define the y1 axis only if chartMode is 'both'
                        ...(chartMode === 'both' && {
                            y1: {
                                type: 'linear', // Explicitly set scale type
                                display: true,
                                position: 'right',
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Number of Orders',
                                    font: { weight: 'bold' }
                                },
                                // Ensure grid lines from this axis don't clutter the chart area
                                grid: {
                                    drawOnChartArea: false,
                                    color: 'rgba(0, 0, 0, 0.05)', // Still define color for border/ticks
                                },
                                ticks: {
                                    font: { size: 11 },
                                    color: '#666',
                                }
                            }
                        })
                    },
                    // --- Interaction: Handle clicks on data points ---
                    onClick: (event, elements) => {
                        if (elements && elements.length > 0) {
                            const { datasetIndex, index } = elements[0];
                            // Avoid selecting points from the prediction padding area
                            if (chartInstance.current.data.datasets[datasetIndex].data[index] !== null) {
                                setSelectedDataPoint({
                                    dataset: chartInstance.current.data.datasets[datasetIndex],
                                    index: index,
                                    value: chartInstance.current.data.datasets[datasetIndex].data[index],
                                    label: chartInstance.current.data.labels[index]
                                });
                            } else {
                                setSelectedDataPoint(null);
                            }
                        } else {
                            setSelectedDataPoint(null); // Clear selection if clicked outside points
                        }
                    }
                }
            });
            console.log("SalesTrendChart: Chart instance created successfully.");

        } catch (error) {
            console.error("SalesTrendChart: Error creating Chart.js instance:", error);
            // Optionally: Set an error state here to display a message to the user
        }

    }, [data, showPrediction, compareMode, chartMode, expanded]); // Effect dependencies

    // --- Helper Function: Calculate Trend ---
    // Calculates a simple linear trend (average change between points)
    const calculateTrend = (values) => {
        if (!values || values.length < 2) return 0;
        let sumOfChanges = 0;
        for (let i = 1; i < values.length; i++) {
            sumOfChanges += (values[i] - values[i - 1]);
        }
        return sumOfChanges / (values.length - 1);
    };

    // --- Render Logic ---
    return (
        <div className={`chart-container-inner ${expanded ? 'expanded' : ''}`}>
            {/* Chart Controls Section */}
            <div className="chart-controls">
                <div className="chart-toggle-group">
                    {/* Prediction Toggle */}
                    <label className="prediction-toggle chart-control-label">
                        <input
                            type="checkbox"
                            checked={showPrediction}
                            onChange={() => setShowPrediction(!showPrediction)}
                            aria-label="Toggle Trend Prediction"
                        />
                        <span className="toggle-label">
                            <i className="fas fa-wand-magic-sparkles"></i> Show Prediction
                        </span>
                    </label>

                    {/* Comparison Toggle */}
                    {chartMode !== 'orders' && ( // Only show compare for sales/both modes
                        <label className="compare-toggle chart-control-label">
                            <input
                                type="checkbox"
                                checked={compareMode}
                                onChange={() => setCompareMode(!compareMode)}
                                aria-label="Toggle Previous Period Comparison"
                            />
                            <span className="toggle-label">
                              <i className="fas fa-exchange-alt"></i> Compare Period
                          </span>
                        </label>
                    )}
                </div>

                {/* Chart View Selector (Sales / Orders / Both) */}
                <div className="chart-view-selector">
                    <button
                        className={`view-button ${chartMode === 'sales' ? 'active' : ''}`}
                        onClick={() => setChartMode('sales')}
                        aria-pressed={chartMode === 'sales'}
                        title="Show Sales Trend"
                    >
                        <i className="fas fa-dollar-sign"></i> Sales
                    </button>
                    <button
                        className={`view-button ${chartMode === 'orders' ? 'active' : ''}`}
                        onClick={() => setChartMode('orders')}
                        aria-pressed={chartMode === 'orders'}
                        title="Show Orders Trend"
                    >
                        <i className="fas fa-shopping-cart"></i> Orders
                    </button>
                    <button
                        className={`view-button ${chartMode === 'both' ? 'active' : ''}`}
                        onClick={() => setChartMode('both')}
                        aria-pressed={chartMode === 'both'}
                        title="Show Both Sales and Orders Trends"
                    >
                        <i className="fas fa-chart-line"></i> Both
                    </button>
                </div>
            </div>

            {/* Selected Data Point Information Display */}
            {selectedDataPoint && (
                <div className="data-point-info">
                    <button className="close-info" onClick={() => setSelectedDataPoint(null)} aria-label="Close data point details">×</button>
                    <h4>{selectedDataPoint.label}: {selectedDataPoint.dataset.label}</h4>
                    <p className="data-value">
                        {selectedDataPoint.dataset.label.includes('Sales')
                            ? formatCurrency(selectedDataPoint.value)
                            : selectedDataPoint.value}
                    </p>
                    {/* Placeholder for comparison info - replace with real calculation */}
                    {compareMode && selectedDataPoint.dataset.label.includes('Sales') && !selectedDataPoint.dataset.label.includes('Previous') && (
                        <p className="compare-info">
                            {Math.random() > 0.5 ?
                                <span className="positive"><i className="fas fa-arrow-up"></i> {(Math.random() * 20).toFixed(1)}% vs previous</span> :
                                <span className="negative"><i className="fas fa-arrow-down"></i> {(Math.random() * 15).toFixed(1)}% vs previous</span>}
                        </p>
                    )}
                </div>
            )}

            {/* Chart Canvas Area */}
            {/* Conditionally render canvas only if data is valid */}
            {(!data || data.length === 0) ? (
                <div className="chart-placeholder" style={{ height: expanded ? 'calc(100vh - 250px)' : '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <i className="fas fa-chart-line" style={{ fontSize: '3em', color: '#ccc' }}></i>
                        <p style={{ color: '#888', marginTop: '10px' }}>No trend data available for the selected period.</p>
                    </div>
                    {/* Optionally use Loader component here */}
                    {/* <Loader /> */}
                </div>
            ) : (
                <div className="canvas-container" style={{ height: expanded ? 'calc(100vh - 250px)' : '300px', position: 'relative' }}>
                    <canvas ref={chartRef} aria-label="Sales Trend Chart" role="img"></canvas>
                </div>
            )}

            {/* Prediction Disclaimer Note */}
            {showPrediction && data && data.length > 0 && (
                <div className="prediction-note">
                    <i className="fas fa-info-circle"></i>
                    <span>Predictions are based on recent trends and may not reflect actual future performance.</span>
                </div>
            )}
        </div>
    );
});

// Set display name for better debugging in React DevTools
SalesTrendChart.displayName = 'SalesTrendChart';

export default SalesTrendChart;