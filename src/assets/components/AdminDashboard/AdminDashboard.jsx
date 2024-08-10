// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import DashboardFooter from './DashboardFooter';
import ManageUsers from './ManageUsers/ManageUsers';
import { fetchUserCounts } from '../../services/adminService';
import '../../css/AdminDashboard.css';
import AdminDashboardPage from '../../pages/AdminDashboardPage';
const AdminDashboard = () => {
  const [data, setData] = useState({
    totalExporters: 0,
    totalImporters: 0,
    totalCustomsOfficers: 0,
    pendingApprovals: 0,
    activeUsers: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }
        const result = await fetchUserCounts(token);
        setData({
          totalExporters: result.totalExporters || 0,
          totalImporters: result.totalImporters || 0,
          totalCustomsOfficers: result.totalCustomsOfficers || 0,
          pendingApprovals: result.pendingApprovals || 0,
          activeUsers: result.activeUsers || 0,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <DashboardHeader />
      <main>
        <Routes>
          <Route path="manage-users" element={<ManageUsers />} />
          {/* Add more routes if necessary */}
        </Routes>
        <DashboardOverview data={data} />
      </main>
      <DashboardFooter />
    </div>
  );
};

export default AdminDashboard;
