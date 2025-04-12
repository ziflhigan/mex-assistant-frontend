/**
 * Utility functions for downloading chart data and images
 */

/**
 * Downloads a single chart as an image
 * 
 * @param {Object} chartRef - Reference to the chart canvas
 * @param {string} filename - The name of the file to download
 * @param {Object} options - Additional options for download
 */
export const downloadChartAsImage = (chartRef, filename = 'chart.png', options = {}) => {
    if (!chartRef || !chartRef.current) {
      console.error('No chart reference provided');
      return;
    }
    
    try {
      const canvas = chartRef.current;
      
      // Get the image data
      const imageType = options.imageType || 'image/png';
      const quality = options.quality || 1.0;
      const image = canvas.toDataURL(imageType, quality);
      
      // Create download link
      const link = document.createElement('a');
      link.download = filename;
      link.href = image;
      link.click();
      
      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
      }, 100);
    } catch (error) {
      console.error('Error downloading chart image:', error);
      alert('Failed to download the chart image. Please try again later.');
    }
  };
  
  /**
   * Downloads chart data as CSV
   * 
   * @param {Array} data - The chart data
   * @param {Array} labels - The chart labels
   * @param {string} filename - The name of the file to download
   * @param {Object} options - Additional options for download
   */
  export const downloadChartDataAsCSV = (data, labels, filename = 'chart-data.csv', options = {}) => {
    if (!data || !labels || data.length === 0) {
      console.error('No data provided for download');
      return;
    }
    
    try {
      // Create CSV content
      let csvContent = 'data:text/csv;charset=utf-8,';
      
      // Add header row with custom column names if provided
      const headerRow = options.headerRow || ['Label', 'Value'];
      csvContent += headerRow.join(',') + '\n';
      
      // Add data rows
      data.forEach((value, index) => {
        if (index < labels.length) {
          csvContent += `"${labels[index]}",${value}\n`;
        }
      });
      
      // Support for multiple datasets
      if (options.additionalDatasets) {
        options.additionalDatasets.forEach(dataset => {
          csvContent += '\n' + (dataset.name || 'Additional Dataset') + '\n';
          csvContent += headerRow.join(',') + '\n';
          
          dataset.data.forEach((value, index) => {
            if (index < labels.length) {
              csvContent += `"${labels[index]}",${value}\n`;
            }
          });
        });
      }
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV data:', error);
      alert('Failed to download the data. Please try again later.');
    }
  };
  
  /**
   * Downloads all dashboard data as a single report
   * 
   * @param {Object} dashboardData - The dashboard data
   * @param {string} timeFilter - The current time filter
   * @param {Object} options - Additional options for download
   */
  export const downloadDashboardReport = (dashboardData, timeFilter, options = {}) => {
    if (!dashboardData) {
      console.error('No dashboard data available');
      return;
    }
    
    try {
      // Dynamically import JSZip
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
        reportSummary += `* Total Sales: $${dashboardData.totalSales?.toLocaleString() || 'N/A'}\n`;
        reportSummary += `* Total Orders: ${dashboardData.totalOrders?.toLocaleString() || 'N/A'}\n`;
        reportSummary += `* Average Order Value: $${dashboardData.averageOrderValue?.toFixed(2) || 'N/A'}\n\n`;
        
        // Add chart data descriptions
        if (dashboardData.salesTrend) {
          reportSummary += `## Sales Trend\n\n`;
          reportSummary += `Sales data available for ${dashboardData.salesTrend.length} time periods.\n`;
          
          const peakSales = Math.max(...dashboardData.salesTrend.map(item => item.sales));
          reportSummary += `Peak sales: $${peakSales.toLocaleString()}\n\n`;
          
          if (dashboardData.salesTrend.length > 0) {
            // Sales trend table
            reportSummary += "| Date | Sales | Orders |\n";
            reportSummary += "|------|-------|--------|\n";
            
            dashboardData.salesTrend.slice(0, 10).forEach(item => {
              const formattedDate = new Date(item.date).toLocaleDateString();
              const formattedSales = '$' + item.sales.toLocaleString();
              const formattedOrders = (item.orders || Math.round(item.sales / 25)).toLocaleString();
              
              reportSummary += `| ${formattedDate} | ${formattedSales} | ${formattedOrders} |\n`;
            });
            
            if (dashboardData.salesTrend.length > 10) {
              reportSummary += "| ... | ... | ... |\n";
            }
            
            reportSummary += "\n";
          }
        }
        
        if (dashboardData.hourlySales) {
          reportSummary += `## Hourly Sales\n\n`;
          
          // Find peak hour
          const peakHour = dashboardData.hourlySales.reduce((peak, current) => 
            current.sales > peak.sales ? current : peak, dashboardData.hourlySales[0]);
          
          reportSummary += `Peak hour: ${peakHour.hour}:00 with $${peakHour.sales.toLocaleString()} in sales\n\n`;
          
          if (dashboardData.hourlySales.length > 0) {
            // Hourly sales table
            reportSummary += "| Hour | Sales |\n";
            reportSummary += "|------|-------|\n";
            
            dashboardData.hourlySales.forEach(item => {
              const hourFormatted = item.hour === 0 ? '12 AM' :
                                   item.hour < 12 ? `${item.hour} AM` :
                                   item.hour === 12 ? '12 PM' :
                                   `${item.hour - 12} PM`;
              
              const salesFormatted = '$' + item.sales.toLocaleString();
              
              reportSummary += `| ${hourFormatted} | ${salesFormatted} |\n`;
            });
            
            reportSummary += "\n";
          }
        }
        
        if (dashboardData.dailySales) {
          reportSummary += `## Daily Sales\n\n`;
          
          if (dashboardData.dailySales.length > 0) {
            // Daily sales table
            reportSummary += "| Day | Sales |\n";
            reportSummary += "|-----|-------|\n";
            
            dashboardData.dailySales.forEach(item => {
              const salesFormatted = '$' + item.sales.toLocaleString();
              reportSummary += `| ${item.day} | ${salesFormatted} |\n`;
            });
            
            reportSummary += "\n";
          }
        }
        
        if (dashboardData.topItems) {
          reportSummary += `## Top Items\n\n`;
          
          if (dashboardData.topItems.length > 0) {
            // Top items table
            reportSummary += "| Rank | Item Name | Category | Price | Orders | Revenue |\n";
            reportSummary += "|------|-----------|----------|-------|--------|----------|\n";
            
            dashboardData.topItems.forEach((item, index) => {
              const price = '$' + (item.revenue / item.quantity).toFixed(2);
              const revenue = '$' + item.revenue.toLocaleString();
              
              reportSummary += `| ${index + 1} | ${item.name} | ${item.category || 'N/A'} | ${price} | ${item.quantity} | ${revenue} |\n`;
            });
            
            reportSummary += "\n";
          }
        }
        
        if (dashboardData.aiInsights) {
          reportSummary += `## AI Insights\n\n`;
          
          dashboardData.aiInsights.forEach((insight, index) => {
            reportSummary += `### ${index + 1}. ${insight.title}\n\n`;
            reportSummary += `${insight.description}\n\n`;
            if (insight.type) {
              reportSummary += `Type: ${insight.type}, Severity: ${insight.severity || 'medium'}\n\n`;
            }
          });
        }
        
        // Add metadata
        reportSummary += `\n\n---\n\nGenerated on: ${new Date().toLocaleString()}\n`;
        reportSummary += `Report period: ${timeFilter}\n`;
        if (options.merchantName) {
          reportSummary += `Merchant: ${options.merchantName}\n`;
        }
        
        // Add the report summary
        reportFolder.file("report-summary.md", reportSummary);
        
        // Create CSV files for each data section
        if (dashboardData.salesTrend && dashboardData.salesTrend.length > 0) {
          let salesTrendCsv = "Date,Sales,Orders\n";
          
          dashboardData.salesTrend.forEach(item => {
            const date = new Date(item.date).toLocaleDateString();
            const orders = item.orders || Math.round(item.sales / 25);
            salesTrendCsv += `${date},${item.sales},${orders}\n`;
          });
          
          reportFolder.file("sales-trend.csv", salesTrendCsv);
        }
        
        if (dashboardData.hourlySales && dashboardData.hourlySales.length > 0) {
          let hourlySalesCsv = "Hour,Sales\n";
          
          dashboardData.hourlySales.forEach(item => {
            hourlySalesCsv += `${item.hour},${item.sales}\n`;
          });
          
          reportFolder.file("hourly-sales.csv", hourlySalesCsv);
        }
        
        if (dashboardData.dailySales && dashboardData.dailySales.length > 0) {
          let dailySalesCsv = "Day,Sales\n";
          
          dashboardData.dailySales.forEach(item => {
            dailySalesCsv += `${item.day},${item.sales}\n`;
          });
          
          reportFolder.file("daily-sales.csv", dailySalesCsv);
        }
        
        if (dashboardData.topItems && dashboardData.topItems.length > 0) {
          let topItemsCsv = "Rank,Item Name,Category,Price,Orders,Revenue\n";
          
          dashboardData.topItems.forEach((item, index) => {
            const price = (item.revenue / item.quantity).toFixed(2);
            topItemsCsv += `${index + 1},"${item.name}","${item.category || 'N/A'}",${price},${item.quantity},${item.revenue}\n`;
          });
          
          reportFolder.file("top-items.csv", topItemsCsv);
        }
        
        // Generate the zip file
        zip.generateAsync({ type: 'blob' }).then(function(content) {
          // Create download link
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = `dashboard-report-${timeFilter}-${new Date().toISOString().split('T')[0]}.zip`;
          link.click();
          
          // Clean up
          setTimeout(() => {
            URL.revokeObjectURL(link.href);
          }, 100);
        });
      }).catch(error => {
        console.error("Error generating report:", error);
        alert("Failed to generate report. Please try again later.");
      });
    } catch (error) {
      console.error("Error preparing report:", error);
      alert("Failed to prepare report. Please try again later.");
    }
  };
  
  /**
   * Captures all charts as images
   * 
   * @param {Object} chartRefs - References to chart canvases
   * @returns {Object|null} Object with chart images as Data URLs
   */
  export const captureAllCharts = (chartRefs) => {
    if (!chartRefs || Object.keys(chartRefs).length === 0) {
      console.error('No chart references provided');
      return null;
    }
    
    try {
      const images = {};
      
      Object.keys(chartRefs).forEach(key => {
        if (chartRefs[key] && chartRefs[key].current) {
          const canvas = chartRefs[key].current;
          images[key] = canvas.toDataURL('image/png');
        }
      });
      
      return images;
    } catch (error) {
      console.error('Error capturing charts:', error);
      return null;
    }
  };
  
  /**
   * Adds a watermark to an image
   * 
   * @param {string} imageUrl - Data URL of the image
   * @param {string} text - Watermark text
   * @returns {Promise<string>} Data URL of the watermarked image
   */
  export const addWatermark = (imageUrl, text) => {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw original image
          ctx.drawImage(img, 0, 0);
          
          // Add watermark
          ctx.font = '14px Arial';
          ctx.fillStyle = 'rgba(150, 150, 150, 0.5)';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'bottom';
          ctx.fillText(text, canvas.width - 10, canvas.height - 10);
          
          resolve(canvas.toDataURL('image/png'));
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = imageUrl;
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export default {
    downloadChartAsImage,
    downloadChartDataAsCSV,
    downloadDashboardReport,
    captureAllCharts,
    addWatermark
  };