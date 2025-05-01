import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../styles/Reportscontent.css';
import { BiNotification } from 'react-icons/bi';
import NotificationIcon from './NotificationIcon'; // Add this import


import ReportsContentHeader from './ReportsContentHeader';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const ReportsHome = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get('http://localhost:9080/budgetportal/Budgetlimit');
      setBudgetData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching budget data');
      setLoading(false);
    }
  };

  // Process data for charts
  const processChartData = () => {
    const budgetAmounts = budgetData.map(item =>
      parseFloat(item.budgetLimit.replace(/[^0-9.-]+/g, ""))
    );
    const labels = budgetData.map(item =>
      new Date(item.startDate).toLocaleDateString()
    );

    return {
      labels,
      budgetAmounts,
    };
  };

  const { labels, budgetAmounts } = processChartData();

  // Chart configurations
  const pieChartData = {
    labels: ['Rs.50,000', 'Rs.100,000', 'Rs.150,000', 'Rs.200,000', 'Rs.250,000', 'Rs.300,000'],
    datasets: [{
      data: [
        budgetData.filter(item => item.budgetLimit.includes('50,000')).length,
        budgetData.filter(item => item.budgetLimit.includes('100,000')).length,
        budgetData.filter(item => item.budgetLimit.includes('150,000')).length,
        budgetData.filter(item => item.budgetLimit.includes('200,000')).length,
        budgetData.filter(item => item.budgetLimit.includes('250,000')).length,
        budgetData.filter(item => item.budgetLimit.includes('300,000')).length,
      ],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  };

  const barChartData = {
    labels,
    datasets: [{
      label: 'Budget Limits',
      data: budgetAmounts,
      backgroundColor: '#36A2EB',
      borderColor: '#2693e6',
      borderWidth: 1
    }]
  };

  const lineChartData = {
    labels,
    datasets: [{
      label: 'Budget Trend',
      data: budgetAmounts,
      fill: false,
      borderColor: '#FF6384',
      tension: 0.1
    }]
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="reports-dashboard">
      <div className="dashboard-header">
      <div className="title-container">
        <h1>Budget Analysis Dashboard</h1>
        </div>
        {/* <div className='notify'>
          <BiNotification className='icon' />
        </div> */}
        <NotificationIcon /> {/* Replace BiNotification with NotificationIcon component */}

      </div>

      <div className="charts-container">
        <div className="charts-row">
          <div className="chart-box">
            <h2>Budget Distribution</h2>
            <Pie
              data={pieChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Budget Limit Distribution'
                  }
                }
              }}
            />
          </div>

          <div className="chart-box">
            <h2>Budget History</h2>
            <Bar
              data={barChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Budget Amounts Over Time'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-box full-width">
          <h2>Budget Trend</h2>
          <Line
            data={lineChartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Budget Trend Analysis'
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );


};

export default ReportsHome;