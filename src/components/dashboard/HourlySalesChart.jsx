/**
 * HourlySalesChart.jsx
 *
 * Displays sales data aggregated by the hour of the day, typically for a single day.
 * Offers Bar and Trend (Line) view modes. Highlights peak/slow hours.
 */
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

// --- Utilities ---
import { formatCurrency } from '../../utils/numberFormatter';
import { chartColors, getDefaultChartOptions } from '../../utils/chartUtils';

// --- Child Components ---
import Loader from '../common/Loader'; // Can be used in placeholder

// --- Styling ---
import './css/HourlySalesChart.css';
import '../dashboard/css/charts.css'; // Shared chart styles

// --- Chart.js Imports ---
import {
    Chart,
    BarController,    // Controller for bar charts
    LineController,   // Controller for line charts
    BarElement,       // Represents the bars
    LineElement,      // Represents the line
    PointElement,     // Represents points on the line
    LinearScale,      // Y-axis
    CategoryScale,    // X-axis
    Tooltip,
    Legend,           // Although hidden, register for completeness
    Filler            // For area fill in line mode
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
    Legend,
    Filler
);

/**
 * HourlySalesChart Component
 * @param {object} props - Component props
 * @param {Array<object>} props.data - Array of data points, e.g., [{ hour: 0, sales: 50 }, { hour: 1, sales: 30 }, ...]
 * @param {boolean} [props.expanded=false] - Flag indicating if the chart is in an expanded view mode.
 * @param {React.Ref} ref - Forwarded ref.
 */
const HourlySalesChart = forwardRef(({ data, expanded = false }, ref) => {
    const { t } = useTranslation();
    // --- State ---
    // Removed internal loading state
    const [activeTimeSlot, setActiveTimeSlot] = useState(null); // For displaying details on click
    const [displayMode, setDisplayMode] = useState('bar');       // 'bar' or 'heatmap' (trend line view)
    const [highlightPeaks, setHighlightPeaks] = useState(true); // Toggle color highlighting

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
                console.log("HourlySalesChart: Destroying chart instance on unmount.");
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    // --- Main Chart Rendering Effect ---
    useEffect(() => {
        console.log("HourlySalesChart: useEffect triggered. Rendering with data:", data);

        // --- Guard Clauses ---
        if (!chartRef.current) {
            console.log("HourlySalesChart: Canvas ref not available yet.");
            return;
        }
        if (!data || data.length === 0) {
            console.log("HourlySalesChart: No data provided.");
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
            return;
        }

        // --- Get Context & Destroy Previous ---
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) {
            console.error("HourlySalesChart: Failed to get canvas context.");
            return;
        }
        console.log("HourlySalesChart: Canvas context acquired.");

        if (chartInstance.current) {
            console.log("HourlySalesChart: Destroying previous chart instance before update.");
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        // --- Data Preparation ---
        const formatHour = (hour) => { // Formats 24-hour number to AM/PM string
            return hour === 0 ? '12 AM' :
                hour < 12 ? `${hour} AM` :
                    hour === 12 ? '12 PM' :
                        `${hour - 12} PM`;
        };

        const labels = data.map(item => formatHour(item.hour));
        const values = data.map(item => item.sales);
        console.log("HourlySalesChart: Labels:", labels, "Values:", values);

        // Calculate thresholds for highlighting
        const sortedValues = [...values].sort((a, b) => b - a);
        const peakThreshold = sortedValues.length > 0 ? sortedValues[Math.floor(sortedValues.length * 0.2)] : 0; // Top 20%
        const average = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        const slowThreshold = average * 0.6; // Threshold for slow hours

        // --- Chart Configuration ---
        try {
            const defaultOptions = getDefaultChartOptions(expanded);

            const getBarColor = (value) => {
                if (!highlightPeaks) return chartColors.secondary;
                if (value >= peakThreshold) return chartColors.primary; // Peak
                if (value < slowThreshold) return chartColors.accent1; // Slow
                return chartColors.secondary; // Default
            };

            let chartType, datasets;

            if (displayMode === 'bar') {
                chartType = 'bar';
                datasets = [{
                    label: 'Sales by Hour',
                    data: values,
                    backgroundColor: context => getBarColor(context.raw),
                    borderColor: context => getBarColor(context.raw), // Use same color for subtle border if needed
                    borderRadius: 4,
                    borderWidth: 0, // Typically no border needed if bg color is set
                    hoverBackgroundColor: context => getBarColor(context.raw).replace('rgb', 'rgba').replace(')', ', 0.8)'), // Slightly transparent on hover
                    maxBarThickness: 40
                }];
            } else { // 'heatmap' (Trend Line) mode
                chartType = 'line';
                datasets = [{
                    label: 'Sales by Hour',
                    data: values,
                    backgroundColor: 'rgba(52, 152, 219, 0.2)', // Area fill color
                    borderColor: chartColors.secondary,
                    pointBackgroundColor: context => getBarColor(context.raw), // Color points based on value
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: true, // Fill area under the line
                    tension: 0.3, // Slight curve
                    borderWidth: 2
                }];
            }

            // --- Chart Instantiation ---
            chartInstance.current = new Chart(ctx, {
                type: chartType,
                data: { labels, datasets },
                options: {
                    ...defaultOptions,
                    responsive: true,
                    maintainAspectRatio: !expanded,
                    plugins: {
                        ...defaultOptions.plugins,
                        legend: { display: false }, // Hide legend for this chart
                        tooltip: {
                            ...defaultOptions.plugins?.tooltip,
                            callbacks: {
                                title: (tooltipItems) => tooltipItems[0].label, // Hour as title
                                label: (context) => context.parsed.y !== null ? formatCurrency(context.parsed.y) : '', // Formatted sales value
                                afterLabel: (context) => { // Add extra info to tooltip
                                    const value = context.parsed.y;
                                    const totalSales = values.reduce((a, b) => a + b, 0);
                                    const percentOfDaily = totalSales > 0 ? ((value / totalSales) * 100).toFixed(1) : 0;
                                    const lines = [`${percentOfDaily}% of daily sales`];
                                    if (highlightPeaks) { // Only add tags if highlighting is on
                                        if (value >= peakThreshold) lines.push('🔥 Peak hour');
                                        if (value < slowThreshold) lines.push('📉 Slow hour');
                                    }
                                    return lines;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ...defaultOptions.scales?.x,
                            type: 'category', // X-axis is categorical (hours)
                            title: {
                                ...defaultOptions.scales?.x?.title,
                                display: true,
                                text: 'Hour of Day'
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
                    onClick: (e, elements) => { // Handle clicks on bars/points
                        if (elements && elements.length > 0) {
                            const index = elements[0].index;
                            const value = values[index];
                            const totalSales = values.reduce((a, b) => a + b, 0);
                            setActiveTimeSlot({
                                hour: labels[index],
                                sales: value,
                                isPeak: value >= peakThreshold,
                                isSlow: value < slowThreshold,
                                percentOfDaily: totalSales > 0 ? ((value / totalSales) * 100).toFixed(1) : 0
                            });
                        } else {
                            setActiveTimeSlot(null); // Clear details if clicking outside
                        }
                    }
                }
            });
            console.log("HourlySalesChart: Chart instance created successfully.");

        } catch (error) {
            console.error("HourlySalesChart: Error creating Chart.js instance:", error);
        }
    }, [data, displayMode, highlightPeaks, expanded]); // Effect dependencies

    // --- Helper Functions for Peak Hours Display ---
    const getPeakHours = () => {
        if (!data || data.length === 0) return [];
        const values = data.map(item => item.sales);
        if (values.length === 0) return [];
        const sortedValues = [...values].sort((a, b) => b - a);
        const peakThreshold = sortedValues[Math.floor(sortedValues.length * 0.2)];
        return data.filter(item => item.sales >= peakThreshold).map(item => item.hour).sort((a, b) => a - b);
    };

    const formatTimeRange = (hours) => { // Formats sorted hour array into readable ranges
        if (!hours || hours.length === 0) return 'N/A';
        const formatHour = (h) => h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
        let ranges = [], start = hours[0], end = hours[0];
        for (let i = 1; i < hours.length; i++) {
            if (hours[i] === end + 1) { end = hours[i]; }
            else { ranges.push(start === end ? formatHour(start) : `${formatHour(start)}-${formatHour(end)}`); start = end = hours[i]; }
        }
        ranges.push(start === end ? formatHour(start) : `${formatHour(start)}-${formatHour(end)}`);
        return ranges.join(', ');
    };

    const peakHours = getPeakHours();

    // --- Render Logic ---
    // Show placeholder if data is not yet available (parent should handle loading)
    if (!data || data.length === 0) {
        return (
            <div className={`hourly-sales-chart ${expanded ? 'expanded' : ''}`}>
                <div className="chart-placeholder" style={{ height: expanded ? 'calc(100vh - 200px)' : '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <i className="fas fa-clock" style={{ fontSize: '3em', color: '#ccc' }}></i>
                        <p style={{ color: '#888', marginTop: '10px' }}>{t('dashboard.charts.hourlySales.noData')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`hourly-sales-chart ${expanded ? 'expanded' : ''}`}>
            {/* Chart display options */}
            <div className="chart-options">
                <div className="display-toggle">
                    <button
                        className={`toggle-button ${displayMode === 'bar' ? 'active' : ''}`}
                        onClick={() => setDisplayMode('bar')} aria-pressed={displayMode === 'bar'} title={t('dashboard.charts.hourlySales.barView')}>
                        <i className="fas fa-chart-bar"></i> {t('dashboard.charts.hourlySales.bar')}
                    </button>
                    <button
                        className={`toggle-button ${displayMode === 'heatmap' ? 'active' : ''}`}
                        onClick={() => setDisplayMode('heatmap')} aria-pressed={displayMode === 'heatmap'} title={t('dashboard.charts.hourlySales.trendView')}>
                        <i className="fas fa-chart-area"></i> {t('dashboard.charts.trend')}
                    </button>
                </div>
                <label className="peak-toggle chart-control-label">
                    <input type="checkbox" checked={highlightPeaks} onChange={() => setHighlightPeaks(!highlightPeaks)} aria-label={t('dashboard.charts.hourlySales.togglePeaks')}/>
                    <span className="toggle-label"><i className="fas fa-fire"></i> {t('dashboard.charts.hourlySales.highlightPeaks')}</span>
                </label>
            </div>

            {/* Details displayed on click */}
            {activeTimeSlot && (
                <div className="timeslot-details">
                    <button className="close-details" onClick={() => setActiveTimeSlot(null)} aria-label="Close time slot details">×</button>
                    <h4>{activeTimeSlot.hour}</h4>
                    <div className="detail-value">{formatCurrency(activeTimeSlot.sales)}</div>
                    {highlightPeaks && activeTimeSlot.isPeak && <div className="detail-tag peak">Peak Hour</div>}
                    {highlightPeaks && activeTimeSlot.isSlow && <div className="detail-tag slow">Slow Hour</div>}
                    <div className="daily-percent"><span>{activeTimeSlot.percentOfDaily}% of daily sales</span></div>
                </div>
            )}

            {/* Canvas container */}
            <div className="canvas-container" style={{ height: expanded ? 'calc(100vh - 250px)' : '250px', position: 'relative' }}>
                <canvas ref={chartRef} aria-label="Hourly Sales Chart" role="img"></canvas>
            </div>

            {/* Peak hours insight text */}
            {peakHours.length > 0 && (
                <div className="peak-hour-insight">
                    <i className="fas fa-lightbulb"></i>
                    <div>
                        <strong>Peak Hours:</strong> {formatTimeRange(peakHours)}
                        <p className="insight-tip">Consider boosting promotions or staff during these times.</p>
                    </div>
                </div>
            )}
        </div>
    );
});

HourlySalesChart.displayName = 'HourlySalesChart';
export default HourlySalesChart;