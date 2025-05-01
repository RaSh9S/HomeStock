import React, { useState, useEffect } from 'react';
import '../styles/Reportscontent.css';
import ReportsContentHeader from './ReportsContentHeader';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30
  },
  section: {
    margin: 10,
    padding: 10
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#27374d'
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 30
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    padding: 5,
    fontWeight: 'bold',
    flex: 1,
    fontSize: 12,
    textAlign: 'center'
  },
  tableCell: {
    padding: 5,
    flex: 1,
    fontSize: 10,
    textAlign: 'center'
  }
});

// PDF Document Component
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Monthly Budget Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Start Date</Text>
            <Text style={styles.tableHeader}>End Date</Text>
            <Text style={styles.tableHeader}>Budget Limit</Text>
            <Text style={styles.tableHeader}>Extra Note</Text>
          </View>
          {Array.isArray(data) && data.map((budget, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {new Date(budget.startDate).toLocaleDateString()}
              </Text>
              <Text style={styles.tableCell}>
                {new Date(budget.endDate).toLocaleDateString()}
              </Text>
              <Text style={styles.tableCell}>{budget.budgetLimit}</Text>
              <Text style={styles.tableCell}>{budget.extraNote}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const MonthlyOverview = () => {
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchMonthlyReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:9080/budgetportal/Reportsmonthly', {
        params: {
          month: selectedMonth,
          year: selectedYear
        }
      });
      console.log('Monthly Report Response:', response.data); // Debug log
      
      if (response.data && Array.isArray(response.data)) {
        setMonthlyReport(response.data);
      } else {
        setMonthlyReport([]);
        setError('No data received from server');
      }
    } catch (error) {
      console.error('Error fetching monthly report:', error);
      setError('Error fetching monthly report: ' + (error.response?.data?.error || error.message));
      setMonthlyReport([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:9080/budgetportal/Reportsweekly');
      
      console.log('Weekly Report Response:', response.data); // Debug log
      
      if (response.data && Array.isArray(response.data)) {
        setMonthlyReport(response.data);
      } else {
        setMonthlyReport([]);
        setError('No data received from server');
      }
    } catch (error) {
      console.error('Error fetching weekly report:', error);
      setError('Error fetching weekly report: ' + (error.response?.data?.error || error.message));
      setMonthlyReport([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyReport();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="content">
      <ReportsContentHeader />
      <div className="report-container">
        <h2 className="report-title">Monthly Overview</h2>
        <div className="report-controls">
          <select 
            value={selectedMonth} 
            onChange={handleMonthChange}
            className="month-selector"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          
          <button className="report-button" onClick={fetchMonthlyReport}>
            Generate Monthly Report
          </button>
          <button className="report-button" onClick={fetchWeeklyReport}>
            Weekly Report
          </button>
          
          {monthlyReport.length > 0 && (
            <PDFDownloadLink 
              document={<MyDocument data={monthlyReport} />} 
              fileName={`budget_report_${selectedMonth}_${selectedYear}.pdf`}
              className="report-button"
            >
              {({ loading }) => loading ? 'Preparing PDF...' : 'Download PDF'}
            </PDFDownloadLink>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="table-container">
            {monthlyReport.length > 0 ? (
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Budget Limit</th>
                    <th>Extra Note</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyReport.map((budget, index) => (
                    <tr key={budget._id || index}>
                      <td>{formatDate(budget.startDate)}</td>
                      <td>{formatDate(budget.endDate)}</td>
                      <td>{budget.budgetLimit}</td>
                      <td>{budget.extraNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No budget data available for the selected period.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyOverview;