import React, { useState } from 'react';

const RestaurantList = ({ restaurants, setSelectedRestaurantId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name:asc');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredRestaurants = restaurants
    .filter((r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (cuisineFilter ? r.cuisine === cuisineFilter : true) &&
      (locationFilter ? r.location === locationFilter : true)
    )
    .sort((a, b) => {
      const [field, dir] = sortBy.split(':');
      const multiplier = dir === 'desc' ? -1 : 1;
      return a[field] > b[field] ? multiplier : -multiplier;
    });

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Restaurants</h2>

      <input
        type="text"
        placeholder="Search by name/location/cuisine"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-2 border border-gray-600 rounded w-full bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 mb-2 border border-gray-600 rounded w-full bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="name:asc">Name (Asc)</option>
        <option value="name:desc">Name (Desc)</option>
        <option value="location:asc">Location (Asc)</option>
        <option value="location:desc">Location (Desc)</option>
      </select>

      <input
        type="text"
        placeholder="Filter by Cuisine"
        value={cuisineFilter}
        onChange={(e) => setCuisineFilter(e.target.value)}
        className="p-2 mb-2 border border-gray-600 rounded w-full bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Filter by Location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="p-2 mb-2 border border-gray-600 rounded w-full bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul className="space-y-2">
        {filteredRestaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition duration-200 cursor-pointer"
            onClick={() => setSelectedRestaurantId(restaurant.id)}
          >
            <span className="text-white">{restaurant.name}</span>{' '}
            -{' '}
            <span className="text-gray-300">{restaurant.location}</span>{' '}
            ({restaurant.cuisine})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;