import React from 'react';

const TopRestaurants = ({ restaurants }) => {
  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Top 3 Restaurants by Revenue</h2>
      <ul className="space-y-2">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition duration-200">
            <span className="text-white">{restaurant.name}</span> - 
            <span className="text-yellow-300">Revenue: ${restaurant.revenue || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRestaurants;