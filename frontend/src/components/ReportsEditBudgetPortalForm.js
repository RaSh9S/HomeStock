import React, { useState, useEffect } from "react";
import "../styles/ReportsBudgetPortalform.css";
import ReportsContentHeader from "./ReportsContentHeader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBudgetPortalForm() {
  const { id } = useParams(); // Get the id from the URL

  const [editedFormData, setEditedFormData] = useState({
    startDate: "",
    endDate: "",
    budgetLimit: "",
    extraNote: "",
  });

  const [errors, setErrors] = useState({}); // Store validation errors

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9080/budgetportal/Budgetlimitget/${id}`)
        .then((res) => {
          const { startDate, endDate, budgetLimit, extraNote } = res.data;

          setEditedFormData({
            startDate: startDate ? new Date(startDate).toISOString().split("T")[0] : "",
            endDate: endDate ? new Date(endDate).toISOString().split("T")[0] : "",
            budgetLimit: budgetLimit || "",
            extraNote: extraNote || "",
          });
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [id]);

  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    // if (!editedFormData.startDate) {
    //   newErrors.startDate = "Start Date is required.";
    // }

    if (!editedFormData.startDate) {
      newErrors.startDate = "Start Date is required.";
    } else if (new Date(editedFormData.startDate) < new Date()) { // Corrected reference
      newErrors.startDate = "Start Date cannot be in the past.";
    }
    

    if (!editedFormData.endDate) {
      newErrors.endDate = "End Date is required.";
    } else if (editedFormData.startDate && editedFormData.endDate < editedFormData.startDate) {
      newErrors.endDate = "End Date cannot be earlier than Start Date.";
    }

    if (!editedFormData.budgetLimit) {
      newErrors.budgetLimit = "Please select a budget limit.";
    }

    if (editedFormData.extraNote.length > 200) {
      newErrors.extraNote = "Extra Note should not exceed 200 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    axios
      .put(`http://localhost:9080/budgetportal/Budgetlimitupdate/${id}`, editedFormData)
      .then(() => navigate("/ReportsBudgetPortal_History"))
      .catch((err) => console.error("Error updating budget:", err));
  };

  const handleChange = (e) => {
    setEditedFormData({ ...editedFormData, [e.target.id]: e.target.value });
  };

  return (
    <div className="content">
      <ReportsContentHeader />
      <div className="BudgetPortal-form-container">
        <h2>Edit Budget Limit Details</h2>
        <form onSubmit={handleSubmit} className="BudgetPortal-form">

          <label className="BudgetPortal-form-label">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={editedFormData.startDate}
            onChange={handleChange}
            className="BudgetPortal-form-input"
            required
          />
          {errors.startDate && <p className="error-message">{errors.startDate}</p>}

          <br></br><br></br>

          <label className="BudgetPortal-form-label">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={editedFormData.endDate}
            onChange={handleChange}
            className="BudgetPortal-form-input"
            required
          />
          {errors.endDate && <p className="error-message">{errors.endDate}</p>}

          <br></br><br></br>

          <label className="BudgetPortal-form-label">Budget Limit:</label>
          <select
            id="budgetLimit"
            value={editedFormData.budgetLimit}
            onChange={handleChange}
            className="BudgetPortal-form-input"
            required
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

          <label className="BudgetPortal-form-label">Extra Note:</label>
          <input
            type="text"
            id="extraNote"
            value={editedFormData.extraNote}
            onChange={handleChange}
            className="BudgetPortal-form-input"
            maxLength="200"
          />
          {errors.extraNote && <p className="error-message">{errors.extraNote}</p>}

          <button type="submit" className="BudgetPortal-form-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditBudgetPortalForm;
