import React from 'react';
import ReportsSidebar from './ReportsSidebar';

const Layout = ({ children }) => {
  

  return (
    <div className="dashboard">
       <ReportsSidebar /> {/* Render sidebar only for non-admin routes */}
      <div className="dashboard-content">
        {children} {/* Render the content */}
      </div>
    </div>
  );
};

export default Layout;