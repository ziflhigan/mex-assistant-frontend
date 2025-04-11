import React, { useState } from 'react';
import { formatCurrency } from '../../utils/numberFormatter';

function TopItemsTable({ data }) {
  const [sortConfig, setSortConfig] = useState({
    key: 'revenue',
    direction: 'desc'
  });

  if (!data || data.length === 0) {
    return <p>No item data available</p>;
  }

  // Colors for the item markers
  const colors = ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71', '#9b59b6'];

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          ...prevConfig,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'desc' };
    });
  };

  // Calculate trend percentages (placeholder)
  const getTrendValue = (index) => {
    const trends = ['+12.4%', '+8.7%', '-2.3%', '+15.8%', '+6.2%'];
    return trends[index % trends.length];
  };

  // Determine if trend is positive or negative
  const isTrendPositive = (trend) => trend.startsWith('+');

  return (
      <table className="items-table">
        <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Item Name</th>
          <th>Category</th>
          <th onClick={() => handleSort('revenue')}>Price</th>
          <th onClick={() => handleSort('quantity')}>Orders</th>
          <th>Trend</th>
        </tr>
        </thead>
        <tbody>
        {sortedData.map((item, index) => {
          const trend = getTrendValue(index);
          const trendClass = isTrendPositive(trend) ? 'trend-up' : 'trend-down';

          return (
              <tr key={index}>
                <td>
                  <div className="item-name">
                    <div className="item-color" style={{ backgroundColor: colors[index % colors.length] }}></div>
                    {item.name}
                  </div>
                </td>
                <td>{item.category || 'Food'}</td>
                <td>{formatCurrency(item.revenue / item.quantity)}</td>
                <td>{item.quantity}</td>
                <td><span className={`trend-badge ${trendClass}`}>{trend}</span></td>
              </tr>
          );
        })}
        </tbody>
      </table>
  );
}

export default TopItemsTable;