// src/pages/AdminDashboardPage.jsx
import React from 'react';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import '../CSS/AdminDashboard.css'; // Import general styles

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard-page">
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
