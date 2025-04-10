jsx
import React, { createContext, useState } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({});

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;