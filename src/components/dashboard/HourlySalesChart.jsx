import React, { useState, useEffect, useRef } from 'react';
import Loader from '../common/Loader';

function HourlySalesChart({ data }) {
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Clean up chart when component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        // Simulate chart data processing/loading
        setLoading(true);

        const renderChart = () => {
            if (!data || data.length === 0 || !chartRef.current) {
                setLoading(false);
                return;
            }

            const ctx = chartRef.current.getContext('2d');

            // Destroy previous chart if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Format hours with AM/PM
            const labels = data.map(item => {
                const hour = item.hour;
                return hour === 0 ? '12 AM' :
                    hour < 12 ? `${hour} AM` :
                        hour === 12 ? '12 PM' :
                            `${hour - 12} PM`;
            });

            const values = data.map(item => item.sales);

            // Create the chart
            import('chart.js').then((ChartJS) => {
                chartInstance.current = new ChartJS.Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels,
                        datasets: [{
                            label: 'Sales by Hour',
                            data: values,
                            backgroundColor: '#3498db'
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Sales ($)'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Hour of Day'
                                }
                            }
                        },
                        animation: {
                            duration: 500,
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

        // Add a slight delay to simulate processing for animation effect
        const timer = setTimeout(() => {
            renderChart();
        }, 500); // Staggered loading for visual effect

        return () => clearTimeout(timer);
    }, [data]);

    if (!data) {
        return (
            <div className="chart-placeholder">
                <p>No hourly sales data available</p>
            </div>
        );
    }

    return (
        <div className="chart-container-inner">
            {loading ? (
                <div className="chart-loading">
                    <Loader />
                </div>
            ) : (
                <canvas ref={chartRef} height="250"></canvas>
            )}
        </div>
    );
}

export default HourlySalesChart;