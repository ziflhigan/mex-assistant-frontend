// src/components/chat/ChatVisualization.jsx
import React from 'react';
// import { Line, Bar } from 'react-chartjs-2';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChatVisualization = ({ data }) => {
  if (!data) return null;

  // 渲染折线图
  if (data.chartType === 'line' && data.data) {
    const chartData = {
      labels: data.data.labels,
      datasets: [{
        label: data.data.seriesName || 'Data',
        data: data.data.values,
        borderColor: '#00b14f',
        backgroundColor: 'rgba(0, 177, 79, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    };

    return (
      <div className="chat-visualization">
        <h4>{data.content}</h4>
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    );
  }

  // 渲染表格
  if (data.chartType === 'table' && data.data) {
    const { columns, rows } = data.data;
    return (
      <div className="chat-visualization">
        <h4>{data.content}</h4>
        <table>
          <thead>
            <tr>{columns.map((col, i) => <th key={i}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

export default ChatVisualization;
