jsx
import React from 'react';

const Sidebar = () => {
  return (
    <aside>
      {/* Sidebar content here */}
      <nav>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Chat</a></li>
          {/* Add more navigation items */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;