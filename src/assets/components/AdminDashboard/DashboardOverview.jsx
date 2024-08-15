// src/assets/components/AdminDashboard/DashboardOverview.jsx
import React from 'react';
import './Design/DashboardOverview.css'; // Import overview-specific styles

const DashboardOverview = ({ data }) => {
  return (
    <section className="overview">
      <div className="overview-card">
        <h3>Total Exporters</h3>
        <p>{data.totalExporters}</p>
      </div>
      <div className="overview-card">
        <h3>Total Importers</h3>
        <p>{data.totalImporters}</p>
      </div>
      <div className="overview-card">
        <h3>Total Customs Officers</h3>
        <p>{data.totalCustomsOfficers}</p>
      </div>
      <div className="overview-card">
        <h3>Pending Approvals</h3>
        <p>{data.pendingApprovals}</p>
      </div>
      <div className="overview-card">
        <h3>Active Users</h3>
        <p>{data.activeUsers}</p>
      </div>
    </section>
  );
};

export default DashboardOverview;
