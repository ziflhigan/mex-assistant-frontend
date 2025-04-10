jsx
import React from 'react';

function TopItemsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Sales</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Item 1</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Item 2</td>
          <td>80</td>
        </tr>
        <tr>
          <td>Item 3</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TopItemsTable;