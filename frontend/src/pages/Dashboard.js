import React, { useState, useEffect, useCallback } from 'react';
import RestaurantList from '../components/RestaurantList';
import OrderTrends from '../components/OrderTrends';
import TopRestaurants from '../components/TopRestaurants';
import { getRestaurants, getTopRestaurants } from '../services/api';

const Dashboard = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    start_date: '2025-06-22',
    end_date: '2025-06-29',
    min_amount: '',
    max_amount: '',
    min_hour: '',
    max_hour: '',
  });

  
  const fetchData = useCallback(async () => {
    try {
      const restaurantsResponse = await getRestaurants(filters);
      setRestaurants(restaurantsResponse.data.data || []);
      const topResponse = await getTopRestaurants(filters);
      setTopRestaurants(topResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [filters]); // ← fetchData depends on filters

  
  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value || '' }));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Restaurant Dashboard</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-4 bg-gray-700 p-4 rounded-lg">
        {['start_date', 'end_date', 'min_amount', 'max_amount', 'min_hour', 'max_hour'].map((name) => (
          <label key={name} className="flex flex-col">
            {name.replace('_', ' ').replace('_', ' ').charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ')}:
            <input
              type={['start_date', 'end_date'].includes(name) ? 'date' : 'number'}
              name={name}
              value={filters[name]}
              onChange={handleFilterChange}
              placeholder={
                name.includes('amount') ? 'Amount' :
                name.includes('hour') ? 'Hour' : ''
              }
              className="p-2 mt-1 border border-gray-600 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        ))}
      </div>

      {/* Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RestaurantList
          restaurants={restaurants}
          setSelectedRestaurantId={setSelectedRestaurantId}
        />
        <div>
          {selectedRestaurantId && (
            <OrderTrends restaurantId={selectedRestaurantId} filters={filters} />
          )}
          <TopRestaurants restaurants={topRestaurants} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
