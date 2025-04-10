jsx
import React from 'react';

const Table = ({ data, columns }) => {
  if (!data || !columns || data.length === 0 || columns.length === 0) {
    return <p>No data to display.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;