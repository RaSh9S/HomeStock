import React, { useState, useEffect } from 'react';
import '../styles/Reportscontent.css';
import ReportsContentHeader from './ReportsContentHeader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function BudgetPortalHistory() {
  const [budgetportalHistory, setBudgetPortalHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBudgetPortal();
  }, []);

  const fetchBudgetPortal = () => {
    axios.get('http://localhost:9080/budgetportal/Budgetlimit')
      .then((res) => {
        setBudgetPortalHistory(res.data);
        setFilteredHistory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching budget portal history:", err);
        alert(err.message);
      });
  };

  const handleSearch = (searchValue) => {
    if (!searchValue) {
      setFilteredHistory(budgetportalHistory);
      return;
    }

    const filtered = budgetportalHistory.filter(budget => {
      // Extract numbers from budget limit string
      const budgetAmount = budget.budgetLimit.replace(/[^0-9]/g, '');
      return budgetAmount.includes(searchValue);
    });

    setFilteredHistory(filtered);
  };

  const deleteBudgetPortal = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this budget limit?");
    if (!confirmDelete) return;

    axios.delete(`http://localhost:9080/budgetportal/Budgetlimitdelete/${id}`)
      .then(() => {
        alert('Budget Limit deleted successfully');
        fetchBudgetPortal(); // Refresh the list after deletion
      })
      .catch(error => {
        console.error('Error deleting budget limit:', error);
        alert('Failed to delete budget limit.');
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="content">
      <ReportsContentHeader onSearch={handleSearch} />
      <div className="table-content">
        <h2>Budget Limit History</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Budget Limit</th>
              <th>Extra Note</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((budgetportal, index) => (
              <tr key={budgetportal._id}>
                <td>{index + 1}</td>
                <td>{formatDate(budgetportal.startDate)}</td>
                <td>{formatDate(budgetportal.endDate)}</td>
                <td>{budgetportal.budgetLimit}</td>
                <td>{budgetportal.extraNote}</td>
                <td>
                  <Link to={`/Budgetlimitupdate/${budgetportal._id}`}>Edit</Link>
                </td>
                <td>
                  <button type="button" onClick={() => deleteBudgetPortal(budgetportal._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}