// src/hooks/useTimeFilter.js
import { useState } from 'react';

const useTimeFilter = () => {
  const [timeFilter, setTimeFilter] = useState('today'); // Default filter

  const handleTimeFilterChange = (newFilter) => {
    setTimeFilter(newFilter);
    // You might want to trigger a data refresh here based on the new filter
  };

  return {
    timeFilter,
    handleTimeFilterChange,
  };
};

export default useTimeFilter;