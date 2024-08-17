// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


import { fetchUserCounts } from '../../services/adminService';
import '../../css/AdminDashboard.css';

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
    
      <main>
      <h1>admin content</h1>
      </main>
      
    </div>
  );
};

export default AdminDashboard;
