import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { formatDate } from '../../utils/dateFormatter';
import Loader from '../common/Loader';

const SalesTrendChart = forwardRef((props, ref) => {
    const { data } = props;
    const [loading, setLoading] = useState(true);
    const [showPrediction, setShowPrediction] = useState(true);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Forward the chartRef to parent component
    React.useImperativeHandle(ref, () => chartRef.current);

    useEffect(() => {
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        setLoading(true);

        const renderChart = () => {
            if (!data || data.length === 0 || !chartRef.current) {
                setLoading(false);
                return;
            }

            const ctx = chartRef.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Generate order data based on sales data
            const orderData = data.map(item => Math.round(item.sales / 25));

            // Format dates for labels
            const labels = data.map(item => formatDate(new Date(item.date), 'MM/dd'));

            // Generate prediction data (7 days into future)
            const predictedLabels = [];
            const predictedSales = [];
            const predictedOrders = [];

            if (showPrediction) {
                // Get the last date from the data
                const lastDate = new Date(data[data.length - 1].date);

                // Calculate trends for prediction
                const salesValues = data.map(item => item.sales);
                const recentSales = salesValues.slice(-5); // Last 5 days
                const salesTrend = calculateTrend(recentSales);

                // Generate dates for next 7 days
                for (let i = 1; i <= 7; i++) {
                    const nextDate = new Date(lastDate);
                    nextDate.setDate(lastDate.getDate() + i);
                    predictedLabels.push(formatDate(nextDate, 'MM/dd'));

                    // Simple prediction: last value + trend * days
                    const lastSales = salesValues[salesValues.length - 1];
                    const predictedSale = lastSales + (salesTrend * i);
                    predictedSales.push(predictedSale);
                    predictedOrders.push(Math.round(predictedSale / 25));
                }
            }

            // Create the chart
            import('chart.js').then((ChartJS) => {
                chartInstance.current = new ChartJS.Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [...labels, ...predictedLabels],
                        datasets: [
                            {
                                label: 'Sales ($)',
                                data: data.map(item => item.sales),
                                borderColor: '#00b14f',
                                backgroundColor: 'rgba(0, 177, 79, 0.1)',
                                yAxisID: 'y',
                                tension: 0.4,
                                fill: true
                            },
                            {
                                label: 'Orders',
                                data: orderData,
                                borderColor: '#3498db',
                                backgroundColor: 'rgba(52, 152, 219, 0)',
                                borderDash: [5, 5],
                                yAxisID: 'y1',
                                tension: 0.4
                            },
                            ...showPrediction ? [
                                {
                                    label: 'Predicted Sales ($)',
                                    data: Array(labels.length).fill(null).concat(predictedSales),
                                    borderColor: '#00b14f',
                                    backgroundColor: 'rgba(0, 177, 79, 0.05)',
                                    borderDash: [5, 5],
                                    yAxisID: 'y',
                                    tension: 0.4,
                                    fill: true,
                                    pointStyle: 'circle',
                                    pointRadius: 3,
                                    pointBackgroundColor: '#00b14f'
                                },
                                {
                                    label: 'Predicted Orders',
                                    data: Array(labels.length).fill(null).concat(predictedOrders),
                                    borderColor: '#3498db',
                                    backgroundColor: 'rgba(52, 152, 219, 0)',
                                    borderDash: [3, 3],
                                    yAxisID: 'y1',
                                    tension: 0.4,
                                    pointStyle: 'circle',
                                    pointRadius: 3,
                                    pointBackgroundColor: '#3498db'
                                }
                            ] : []
                        ]
                    },
                    options: {
                        responsive: true,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        plugins: {
                            tooltip: {
                                usePointStyle: true
                            },
                            legend: {
                                onClick: (e, legendItem, legend) => {
                                    // Allow toggling prediction by clicking on legend
                                    if (legendItem.text.includes('Predicted')) {
                                        setShowPrediction(!showPrediction);
                                    } else {
                                        // Default behavior for other legend items
                                        const index = legendItem.datasetIndex;
                                        const ci = legend.chart;
                                        const meta = ci.getDatasetMeta(index);
                                        meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
                                        ci.update();
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Sales ($)'
                                }
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                grid: {
                                    drawOnChartArea: false,
                                },
                                title: {
                                    display: true,
                                    text: 'Number of Orders'
                                }
                            },
                            x: {
                                grid: {
                                    color: (context) => {
                                        // Add vertical line separating actual and predicted data
                                        if (showPrediction && context.tick.value === labels.length - 1) {
                                            return 'rgba(71,177,0,0.5)';
                                        }
                                        return 'rgba(0, 0, 0, 0.1)';
                                    },
                                    lineWidth: (context) => {
                                        if (showPrediction && context.tick.value === labels.length - 1) {
                                            return 2;
                                        }
                                        return 1;
                                    }
                                }
                            }
                        },
                        animation: {
                            duration: 1000,
                            easing: 'easeOutQuart',
                        }
                    }
                });

                setLoading(false);
            }).catch(error => {
                console.error("Error loading Chart.js library:", error);
                setLoading(false);
            });
        };

        const timer = setTimeout(() => {
            renderChart();
        }, 300);

        return () => clearTimeout(timer);
    }, [data, showPrediction]);

    // Calculate simple linear trend
    const calculateTrend = (values) => {
        if (!values || values.length < 2) return 0;

        let sum = 0;
        for (let i = 1; i < values.length; i++) {
            sum += values[i] - values[i-1];
        }
        return sum / (values.length - 1);
    };

    if (!data) {
        return (
            <div className="chart-placeholder">
                <p>No sales trend data available</p>
            </div>
        );
    }

    return (
        <div className="chart-container-inner">
            <div className="chart-controls">
                <label className="prediction-toggle">
                    <input
                        type="checkbox"
                        checked={showPrediction}
                        onChange={() => setShowPrediction(!showPrediction)}
                    />
                    Show Prediction
                </label>
            </div>
            {loading ? (
                <div className="chart-loading">
                    <Loader />
                </div>
            ) : (
                <canvas ref={chartRef} height="300"></canvas>
            )}
        </div>
    );
});

SalesTrendChart.displayName = 'SalesTrendChart';

export default SalesTrendChart;