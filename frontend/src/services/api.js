// services/api.js
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const getRestaurants = (filters) => {
  return axios.get(`${API_BASE}/restaurants`, { params: filters });
};

export const getTopRestaurants = (filters) => {
  return axios.get(`${API_BASE}/restaurants/top-revenue`, { params: filters });
};

export const getOrderTrends = (restaurantId, filters = {}) => {
  return axios.get(`${API_BASE}/orders/trends/${restaurantId}`, { params: filters });
};