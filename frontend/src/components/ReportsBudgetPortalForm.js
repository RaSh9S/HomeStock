import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ReportsBudgetPortalform.css';
import '../styles/Reportscontent.css';
import ReportsContentHeader from './ReportsContentHeader';

const BudgetLimitForm = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [extraNote, setExtraNote] = useState('');
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBudgetLimits, setFilteredBudgetLimits] = useState([]);

  function validateForm() {
    const newErrors = {};

    if (!startDate) {
      newErrors.startDate = "Start Date is required.";
    } else if (new Date(startDate) < new Date()) {
      newErrors.startDate = "Start Date cannot be in the past.";
    }

    if (!endDate) {
      newErrors.endDate = "End Date is required.";
    } else if (new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = "End Date cannot be earlier than Start Date.";
    }

    if (!budgetLimit) {
      newErrors.budgetLimit = "Please select a Budget Limit.";
    }

    if (extraNote.length > 200) {
      newErrors.extraNote = "Extra Note cannot exceed 200 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function sendData(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newBudgetPortal = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      budgetLimit: budgetLimit, // Keeping the Rs. format
      extraNote
    };

    axios.post('http://localhost:9080/budgetportal/Budgetlimitadd', newBudgetPortal)
      .then(() => {
        alert('Budget Limit Added successfully!');
        navigate('/ReportsBudgetPortal_History'); // Navigate after success
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      setFilteredBudgetLimits([]);
      return;
    }

    const searchValue = Number(value.replace(/[^0-9]/g, ''));
    const filtered = [50000, 100000, 150000, 200000, 250000, 300000].filter(limit =>
      limit.toString().includes(searchValue.toString())
    );

    setFilteredBudgetLimits(filtered.map(limit => `Rs.${limit.toLocaleString()}/=`));
  };

  return (
    <div className="content">
      <ReportsContentHeader onSearch={handleSearch} />
      <div className="BudgetPortal-form-container">
        <h2>Budget Limit Details</h2>
        {searchTerm && filteredBudgetLimits.length > 0 && (
          <div className="search-results">
            <h3>Matching Budget Limits:</h3>
            <ul>
              {filteredBudgetLimits.map((limit, index) => (
                <li key={index} onClick={() => setBudgetLimit(limit)}>
                  {limit}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={sendData} className="BudgetPortal-form">
          <label htmlFor="StartDate" className="BudgetPortal-form-label">
            Start Date:
          </label>
          <input
            type="date"
            id="StartDate"
            className={`BudgetPortal-form-input ${errors.startDate ? 'input-error' : ''}`}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {errors.startDate && <p className="error-message">{errors.startDate}</p>}

          <br></br><br></br>

          <label htmlFor="EndDate" className="BudgetPortal-form-label">
            End Date:
          </label>
          <input
            type="date"
            id="EndDate"
            className="BudgetPortal-form-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {errors.endDate && <p className="error-message">{errors.endDate}</p>}

          <br></br><br></br>

          <label htmlFor="BudgetLimit" className="BudgetPortal-form-label">
            Budget Limit:
          </label>
          <select
            id="BudgetLimit"
            className="BudgetPortal-form-input"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(e.target.value)}
          >
            <option value="">Select Budget Limit</option>
            <option value="Rs.50,000/=">Rs.50,000/=</option>
            <option value="Rs.100,000/=">Rs.100,000/=</option>
            <option value="Rs.150,000/=">Rs.150,000/=</option>
            <option value="Rs.200,000/=">Rs.200,000/=</option>
            <option value="Rs.250,000/=">Rs.250,000/=</option>
            <option value="Rs.300,000/=">Rs.300,000/=</option>
          </select>
          <br></br><br></br>

          {errors.budgetLimit && <p className="error-message">{errors.budgetLimit}</p>}

          <br></br>

          <label htmlFor="ExtraNote" className="BudgetPortal-form-label">
            Extra Note:
          </label>
          <input
            type="text"
            id="ExtraNote"
            className="BudgetPortal-form-input"
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
          />
          {errors.extraNote && <p className="error-message">{errors.extraNote}</p>}

          <button type="submit" className="BudgetPortal-form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetLimitForm;
