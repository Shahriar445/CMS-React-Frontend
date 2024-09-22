import  { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { FileTextOutlined, CreditCardOutlined, TruckOutlined } from '@ant-design/icons';

const ImporterDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalDeclarations: null,
    pendingPayments: null,
    shipmentsMonitored: null
  });

  const [loading, setLoading] = useState(true);

  // Function to fetch dashboard overview data
  const fetchDashboardOverview = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }

      const response = await fetch(`https://localhost:7232/api/CMS/dashboardOverview/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard overview');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard overview:', error.message);
      return null;
    }
  };

  // Function to update dashboard overview data
  const updateDashboardOverview = async () => {
    const data = await fetchDashboardOverview();
    if (data) {
      setDashboardData({
        totalDeclarations: data.totalDeclarations,
        pendingPayments: data.pendingPayments,
        shipmentsMonitored: data.shipmentMonitoring
      });
    } else {
      // Handle error case or display default values
      setDashboardData({
        totalDeclarations: 'N/A',
        pendingPayments: 'N/A',
        shipmentsMonitored: 'N/A'
      });
    }
    setLoading(false); // Set loading to false after fetching data
  };

  // Use useEffect to fetch the data when the component mounts
  useEffect(() => {
    updateDashboardOverview();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
        <h1>Importer Dashboard</h1>

      <main>
        <section id="dashboard-overview">
          <div className="overview-cards" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Card style={{ width: 300 }} loading={loading} bordered={false}>
              <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <h3>Total Declarations</h3>
              <p>{dashboardData.totalDeclarations ?? <Spin />}</p>
            </Card>
            <Card style={{ width: 300 }} loading={loading} bordered={false}>
              <CreditCardOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
              <h3>Pending Payments</h3>
              <p>{dashboardData.pendingPayments ?? <Spin />}</p>
            </Card>
            <Card style={{ width: 300 }} loading={loading} bordered={false}>
              <TruckOutlined style={{ fontSize: '48px', color: '#faad14' }} />
              <h3>Shipments Monitored</h3>
              <p>{dashboardData.shipmentsMonitored ?? <Spin />}</p>
            </Card>
          </div>
        </section>
      </main>

  
    </div>
  );
};

export default ImporterDashboard;
