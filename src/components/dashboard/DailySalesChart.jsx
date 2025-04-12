/**
 * DailySalesChart.jsx
 *
 * Displays sales data aggregated by the day of the week.
 * Allows showing an average sales line and highlights best/worst days.
 */
import React, { useState, useEffect, useRef, forwardRef } from 'react';

// --- Utilities ---
import { formatCurrency } from '../../utils/numberFormatter';
import { chartColors, getDefaultChartOptions } from '../../utils/chartUtils';
import { useTranslation } from 'react-i18next';

// --- Child Components ---
import Loader from '../common/Loader'; // Can be used in placeholder

// --- Styling ---
import './css/DailySalesChart.css';
import '../dashboard/css/charts.css'; // Shared chart styles

// --- Chart.js Imports ---
import {
    Chart,
    BarController,    // Controller for bar charts
    LineController,   // Controller for the average line overlay
    BarElement,       // Represents the bars
    LineElement,      // Represents the average line
    PointElement,     // Represents points (though hidden on avg line)
    LinearScale,      // Y-axis
    CategoryScale,    // X-axis
    Tooltip,
    Legend            // Although hidden, register for completeness
    // Filler is not strictly needed here as the line is not filled
} from 'chart.js';

// --- Chart.js Registration ---
Chart.register(
    BarController,
    LineController,
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
);

/**
 * DailySalesChart Component
 * @param {object} props - Component props
 * @param {Array<object>} props.data - Array of data points, e.g., [{ day: 'Monday', sales: 500 }, ...]
 * @param {boolean} [props.expanded=false] - Flag indicating if the chart is in an expanded view mode.
 * @param {React.Ref} ref - Forwarded ref.
 */
const DailySalesChart = forwardRef(({ data, expanded = false }, ref) => {
    // --- State ---
    // Removed internal loading state
    const [activeDay, setActiveDay] = useState(null);       // For displaying details on click
    const [showAverage, setShowAverage] = useState(false); // Toggle for the average line visibility

    // --- Refs ---
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // --- Imperative Handle ---
    React.useImperativeHandle(ref, () => ({
        getCanvas: () => chartRef.current,
        getChartInstance: () => chartInstance.current
    }));

    // --- Cleanup Effect ---
    useEffect(() => {
        return () => {
            if (chartInstance.current) {
                console.log("DailySalesChart: Destroying chart instance on unmount.");
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    // --- Main Chart Rendering Effect ---
    useEffect(() => {
        console.log("DailySalesChart: useEffect triggered. Rendering with data:", data);

        // --- Guard Clauses ---
        if (!chartRef.current) {
            console.log("DailySalesChart: Canvas ref not available yet.");
            return;
        }
        if (!data || data.length === 0) {
            console.log("DailySalesChart: No data provided.");
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
            return;
        }

        // --- Get Context & Destroy Previous ---
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) {
            console.error("DailySalesChart: Failed to get canvas context.");
            return;
        }
        console.log("DailySalesChart: Canvas context acquired.");

        if (chartInstance.current) {
            console.log("DailySalesChart: Destroying previous chart instance before update.");
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        // --- Data Preparation ---
        const labels = data.map(item => item.day); // Expecting 'Monday', 'Tuesday', etc.
        const values = data.map(item => item.sales);
        console.log("DailySalesChart: Labels:", labels, "Values:", values);

        // Calculate statistics for highlighting and comparison
        const average = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        const maxValue = values.length > 0 ? Math.max(...values) : 0;
        const minValue = values.length > 0 ? Math.min(...values) : 0;

        // --- Chart Configuration ---
        try {
            const defaultOptions = getDefaultChartOptions(expanded);

            // --- Chart Instantiation ---
            chartInstance.current = new Chart(ctx, {
                // Note: Chart type is primarily 'bar', but includes a 'line' dataset.
                // Chart.js handles mixed types if controllers are registered.
                data: {
                    labels,
                    datasets: [
                        {
                            type: 'bar', // Explicitly define dataset type
                            label: 'Sales by Day',
                            data: values,
                            backgroundColor: (context) => { // Color bars based on performance
                                const value = context.raw;
                                if (value === maxValue) return chartColors.primary; // Best day
                                if (value === minValue) return chartColors.accent1; // Worst day
                                return chartColors.accent3; // Default day color (e.g., purple)
                            },
                            borderRadius: 4,
                            borderWidth: 0,
                            maxBarThickness: 60,
                            order: 1 // Ensure bars are drawn behind the line
                        },
                        // Average line dataset (conditionally visible)
                        {
                            type: 'line', // Explicitly define dataset type
                            label: 'Average Sales',
                            data: Array(labels.length).fill(average), // Fill array with average value
                            borderColor: chartColors.accent2, // E.g., Yellow
                            borderDash: [5, 5], // Dashed line style
                            borderWidth: 2,
                            pointRadius: 0, // No points on the average line
                            fill: false, // Do not fill area under average line
                            hidden: !showAverage, // Control visibility via state
                            order: 0 // Ensure line is drawn on top of bars
                        }
                    ]
                },
                options: {
                    ...defaultOptions,
                    responsive: true,
                    maintainAspectRatio: !expanded,
                    plugins: {
                        ...defaultOptions.plugins,
                        legend: { display: false }, // Hide legend
                        tooltip: {
                            ...defaultOptions.plugins?.tooltip,
                            // Filter out tooltips for the hidden average line dataset
                            filter: (tooltipItem) => tooltipItem.datasetIndex === 0, // Only show tooltips for the bar dataset
                            callbacks: {
                                title: (tooltipItems) => tooltipItems[0].label, // Day name as title
                                label: (context) => { // Formatted sales value
                                    let label = context.dataset.label || '';
                                    if (label.includes('Average')) return null; // Don't show label for average line
                                    label = 'Sales: ';
                                    if (context.parsed.y !== null) {
                                        label += formatCurrency(context.parsed.y);
                                    }
                                    return label;
                                },
                                afterLabel: (context) => { // Add extra context (Best/Worst day)
                                    const value = context.parsed.y;
                                    if (value === maxValue) return '🔥 Best day';
                                    if (value === minValue) return '📉 Slowest day';
                                    return '';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ...defaultOptions.scales?.x,
                            type: 'category', // X-axis is categorical (days)
                            title: {
                                ...defaultOptions.scales?.x?.title,
                                display: true,
                                text: 'Day of Week'
                            }
                        },
                        y: {
                            ...defaultOptions.scales?.y,
                            type: 'linear', // Y-axis is numerical (sales)
                            beginAtZero: true,
                            title: {
                                ...defaultOptions.scales?.y?.title,
                                display: true,
                                text: 'Sales ($)'
                            }
                        }
                    },
                    onClick: (e, elements) => { // Handle clicks on bars
                        // Ensure click is on the bar dataset (index 0)
                        if (elements && elements.length > 0 && elements[0].datasetIndex === 0) {
                            const index = elements[0].index;
                            const value = values[index];
                            setActiveDay({
                                day: labels[index],
                                sales: value,
                                isMax: value === maxValue,
                                isMin: value === minValue,
                                percentOfAverage: average > 0 ? ((value / average) * 100).toFixed(1) : 0
                            });
                        } else {
                            setActiveDay(null); // Clear details if clicking outside bars
                        }
                    }
                }
            });
            console.log("DailySalesChart: Chart instance created successfully.");

        } catch (error) {
            console.error("DailySalesChart: Error creating Chart.js instance:", error);
        }
    }, [data, showAverage, expanded]); // Effect dependencies

    // --- Render Logic ---
    if (!data || data.length === 0) {
        return (
            <div className={`daily-sales-chart ${expanded ? 'expanded' : ''}`}>
                <div className="chart-placeholder" style={{ height: expanded ? 'calc(100vh - 200px)' : '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <i className="fas fa-calendar-day" style={{ fontSize: '3em', color: '#ccc' }}></i>
                        <p style={{ color: '#888', marginTop: '10px' }}>No daily sales data available.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Find best day for insight text (handle empty data case)
    const bestDay = data.length > 0 ? data.reduce((max, item) => item.sales > max.sales ? item : max, data[0]) : null;

    const { t } = useTranslation();

    return (
        <div className={`daily-sales-chart ${expanded ? 'expanded' : ''}`}>
            {/* Chart options */}
            <div className="chart-options">
                <label className="average-toggle chart-control-label">
                    <input type="checkbox" checked={showAverage} onChange={() => setShowAverage(!showAverage)} aria-label="Toggle average sales line"/>
                    <span className="toggle-label"><i className="fas fa-chart-line"></i> Show Average</span>
                </label>
            </div>

            {/* Details displayed on click */}
            {activeDay && (
                <div className="day-details">
                    <button className="close-details" onClick={() => setActiveDay(null)} aria-label="Close day details">×</button>
                    <h4>{activeDay.day}</h4>
                    <div className="detail-value">{formatCurrency(activeDay.sales)}</div>
                    {activeDay.isMax && <div className="detail-tag best">Best Day</div>}
                    {activeDay.isMin && <div className="detail-tag worst">Slowest Day</div>}
                    <div className="average-comparison">
                        {activeDay.percentOfAverage >= 100 ?
                            <span className="above-average"><i className="fas fa-arrow-up"></i> {activeDay.percentOfAverage}% of avg</span> :
                            <span className="below-average"><i className="fas fa-arrow-down"></i> {activeDay.percentOfAverage}% of avg</span>
                        }
                    </div>
                </div>
            )}

            {/* Canvas container */}
            <div className="canvas-container" style={{ height: expanded ? 'calc(100vh - 250px)' : '250px', position: 'relative' }}>
                <canvas ref={chartRef} aria-label="Daily Sales Chart" role="img"></canvas>
            </div>

            {/* Simple insights below chart */}
            <div className="chart-insights">
                {bestDay && (
                    <div className="insight-item">
                        <i className="fas fa-crown"></i>
                        <span>{t('dashboard.charts.dailySales.bestDay', { day: bestDay.day })}</span>
                    </div>
                )}
                <div className="insight-item">
                    <i className="fas fa-info-circle"></i>
                    <span>{t('dashboard.charts.dailySales.clickForDetails')}</span>
                </div>
            </div>
        </div>
    );
});

DailySalesChart.displayName = 'DailySalesChart';
export default DailySalesChart;