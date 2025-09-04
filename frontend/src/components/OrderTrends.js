import React, { useEffect, useState } from 'react';
import { getOrderTrends } from '../services/api';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const OrderTrends = ({ restaurantId, filters }) => {
  const [trends, setTrends] = useState({ daily_orders: [], daily_revenue: [], avg_order_value: [], peak_hours: [] });

  useEffect(() => {
    getOrderTrends(restaurantId, filters).then((response) => {
      setTrends(response.data);
    }).catch((error) => console.error('Error fetching trends:', error));
  }, [restaurantId, filters]);

  const dates = trends.daily_orders.map((item) => item.date);
  if (dates.length === 0) {
    return <div className="p-4 bg-gray-700 rounded-lg text-white">No trends data available for the selected filters.</div>;
  }

  const ordersData = trends.daily_orders.map((item) => item.count || 0);
  const revenueData = trends.daily_revenue.map((item) => item.revenue || 0);
  const avgValueData = trends.avg_order_value.map((item) => item.avg_value || 0);
  const peakHoursData = dates.map((date) => trends.peak_hours[date] || 0);

  const barData = {
    labels: dates,
    datasets: [
      { 
        label: 'Daily Orders', 
        data: ordersData, 
        backgroundColor: '#5de0e6',
        borderColor: '#004aad',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: dates,
    datasets: [
      { 
        label: 'Daily Revenue', 
        data: revenueData, 
        borderColor: '#FF6384', 
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
        fill: true,
      },
      { 
        label: 'Avg Order Value', 
        data: avgValueData, 
        borderColor: '#36A2EB', 
        backgroundColor: 'rgba(54, 162, 235, 0.2)', 
        fill: true,
      },
      { 
        label: 'Peak Hour', 
        data: peakHoursData, 
        borderColor: '#FFCE56', 
        backgroundColor: 'rgba(255, 206, 86, 0.2)', 
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#ffffff' } },
      title: { display: true, text: `Trends for Restaurant ID: ${restaurantId}`, color: '#ffffff' },
    },
    scales: {
      y: { ticks: { color: '#ffffff' } },
      x: { ticks: { color: '#ffffff' } },
    },
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-md">
      <div className="my-4">
        <h3 className="text-lg text-white font-semibold">Daily Orders</h3>
        <Bar data={barData} options={options} />
      </div>
      <div className="my-4">
        <h3 className="text-lg text-white font-semibold">Revenue, Avg Value, Peak Hour</h3>
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default OrderTrends;