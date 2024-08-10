// DashboardHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardHeader.css'; // Import header-specific styles

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin-dashboard/manage-users">Users</Link></li> {/* Updated path */}
          <li><Link to="/admin-dashboard/report-generate">Reports</Link></li> {/* Updated path */}
        </ul>
      </nav>
    </header>
  );
};

export default DashboardHeader;
