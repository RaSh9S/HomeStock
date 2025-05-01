import './App.css';
import React, { useState } from 'react';

import Header from './components/Header';
import AddItemList from './components/AddItemList';
import ShoppingList from './components/ShoppingList';
import Update from './components/EditItem';
import List from './components/List';
import Scraper from './components/Scraper';

import ReportsBudgetPortalForm from './components/ReportsBudgetPortalForm';
import ReportsLayout from './components/ReportsLayout';
import ReportsEditBudgetPortalForm from './components/ReportsEditBudgetPortalForm'; // import your Edit form
import ReportsBudgetPortal_History from './components/ReportsBudgetPortal_History';
import ReportsMonthly_Overview from './components/ReportsMonthly_Overview';
import ReportsContentHeader from './components/ReportsContentHeader';
import Reports_Home from './components/Reports_Home';
import { NotificationProvider } from './context/NotificationContext';

import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <NotificationProvider>
      <div>
        <Header />
        
        <Routes> 
        
          <Route path='/addItem' element={<AddItemList />} /> 
          <Route path='/' element={<ShoppingList/>} /> 
          <Route path='/update/:id' element={<Update/>} /> 
          <Route path='/list' element={<List/>} /> 
          <Route path='/keells' element={<Scraper/>} /> 

          <Route path="/home" element={<Navigate to="/Reports_Home" />} />
          <Route path="/Reportsadd" element={<ReportsLayout><ReportsBudgetPortalForm /></ReportsLayout>} />
          <Route path="/ReportsEditBudgetPortalForm" element={<ReportsLayout><ReportsEditBudgetPortalForm /></ReportsLayout>} />
          <Route path="/Budgetlimitupdate/:id" element={<ReportsLayout><ReportsEditBudgetPortalForm /></ReportsLayout>} />
          <Route path="/ReportsBudgetPortal_History" element={<ReportsLayout><ReportsBudgetPortal_History /></ReportsLayout>} />
          <Route path="/ReportsMonthly_Overview" element={<ReportsLayout><ReportsMonthly_Overview /></ReportsLayout>} />
          <Route path="/Pharmacydelete/:id" element={<ReportsLayout><ReportsBudgetPortal_History /></ReportsLayout>} />
          <Route path="/ReportsBudgetPortal_History/edit/:id" element={<ReportsLayout><ReportsBudgetPortal_History /></ReportsLayout>} />
          <Route path="/ReportsContent_Header" element={<ReportsLayout><ReportsContentHeader onSearch={handleSearch}/></ReportsLayout>} />
          <Route path="/Reports_Home" element={<ReportsLayout><Reports_Home /></ReportsLayout>} />
          
        </Routes>
      </div>
      </NotificationProvider>
    </Router>
  );
}

export default App;


