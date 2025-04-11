import React, { useState, useEffect, useRef } from 'react';
import Loader from '../common/Loader';

function DailySalesChart({ data }) {
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

            const labels = data.map(item => item.day);
            const values = data.map(item => item.sales);

            // Create the chart
            import('chart.js').then((ChartJS) => {
                chartInstance.current = new ChartJS.Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels,
                        datasets: [{
                            label: 'Sales by Day',
                            data: values,
                            backgroundColor: '#9b59b6'
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
                                    text: 'Day of Week'
                                }
                            }
                        },
                        animation: {
                            duration: 700,
                            easing: 'easeOutBounce',
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
        }, 700); // Staggered loading for visual effect

        return () => clearTimeout(timer);
    }, [data]);

    if (!data) {
        return (
            <div className="chart-placeholder">
                <p>No daily sales data available</p>
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

export default DailySalesChart;