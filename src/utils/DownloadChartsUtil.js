/**
 * Utility functions for downloading chart data and images
 */

// Function to download a single chart as an image
export const downloadChartAsImage = (chartRef, filename = 'chart.png') => {
    if (!chartRef || !chartRef.current) {
        console.error('No chart reference provided');
        return;
    }

    const canvas = chartRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = image;
    link.click();
};

// Function to download chart data as CSV
export const downloadChartDataAsCSV = (data, labels, filename = 'chart-data.csv') => {
    if (!data || !labels || data.length === 0) {
        console.error('No data provided for download');
        return;
    }

    // Create CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Add header row
    csvContent += 'Label,Value\n';

    // Add data rows
    data.forEach((value, index) => {
        csvContent += `${labels[index]},${value}\n`;
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Function to download all dashboard data as a single report
export const downloadDashboardReport = (dashboardData, timeFilter) => {
    if (!dashboardData) {
        console.error('No dashboard data available');
        return;
    }

    // Create a zip file with all charts and data
    import('jszip').then(({ default: JSZip }) => {
        const zip = new JSZip();
        const reportFolder = zip.folder("dashboard-report");

        // Add a JSON file with all raw data
        reportFolder.file("dashboard-data.json", JSON.stringify(dashboardData, null, 2));

        // Create a report summary
        let reportSummary = `# Dashboard Report - ${new Date().toLocaleDateString()}\n\n`;
        reportSummary += `Time period: ${timeFilter}\n\n`;

        // Add key stats
        reportSummary += `## Key Statistics\n\n`;
        reportSummary += `- Total Sales: $${dashboardData.totalSales.toLocaleString()}\n`;
        reportSummary += `- Total Orders: ${dashboardData.totalOrders.toLocaleString()}\n`;
        reportSummary += `- Average Order Value: $${dashboardData.averageOrderValue.toFixed(2)}\n\n`;

        // Add chart data descriptions
        if (dashboardData.salesTrend) {
            reportSummary += `## Sales Trend\n\n`;
            reportSummary += `Sales data available for ${dashboardData.salesTrend.length} time periods.\n`;
            reportSummary += `Peak sales: $${Math.max(...dashboardData.salesTrend.map(item => item.sales)).toLocaleString()}\n\n`;
        }

        if (dashboardData.hourly) {
            reportSummary += `## Hourly Sales\n\n`;
            reportSummary += `Peak hour: ${dashboardData.hourlySales.reduce((peak, current) =>
                current.sales > peak.sales ? current : peak).hour}\n\n`;
        }

        if (dashboardData.topItems) {
            reportSummary += `## Top Items\n\n`;
            dashboardData.topItems.slice(0, 3).forEach((item, index) => {
                reportSummary += `${index + 1}. ${item.name}: ${item.quantity} orders, $${item.revenue.toLocaleString()}\n`;
            });
            reportSummary += `\n`;
        }

        // Add the report summary
        reportFolder.file("report-summary.md", reportSummary);

        // Generate the zip file
        zip.generateAsync({ type: 'blob' }).then(function(content) {
            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `dashboard-report-${timeFilter}.zip`;
            link.click();
        });
    }).catch(error => {
        console.error("Error generating report:", error);
        alert("Failed to generate report. Please try again later.");
    });
};

// Function to capture all charts as images
export const captureAllCharts = (chartRefs) => {
    if (!chartRefs || Object.keys(chartRefs).length === 0) {
        console.error('No chart references provided');
        return null;
    }

    const images = {};

    Object.keys(chartRefs).forEach(key => {
        if (chartRefs[key] && chartRefs[key].current) {
            const canvas = chartRefs[key].current;
            images[key] = canvas.toDataURL('image/png');
        }
    });

    return images;
};