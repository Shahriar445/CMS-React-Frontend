import React, { useEffect, useState } from 'react';
import { Card, Typography, message } from 'antd';
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalExporters: 0,
    totalImporters: 0,
    totalCustomsOfficers: 0,
    pendingApprovals: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
          message.error('You are not authorized to view this page. Please log in.');
          window.location.href = '/login'; // Redirect to login if no token
          return;
        }

        // Fetch user counts
        const response = await fetch('https://localhost:7232/api/CMS/user-counts', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData({
          totalExporters: result.totalExporters || 0,
          totalImporters: result.totalImporters || 0,
          totalCustomsOfficers: result.totalCustomsOfficers || 0,
          pendingApprovals: result.pendingApprovals || 0,
          activeUsers: result.activeUsers || 0,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('An error occurred while fetching data.');
      }
    };

    fetchData(); // Call fetchData when component is mounted
  }, []);

  return (
    <div style={{ width: '100%', padding: '0px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Card for Total Exporters */}
        <Card
          title={<><UserAddOutlined /> Total Exporters</>}
          bordered={false}
          style={{ ...cardStyle, backgroundColor: '#1890ff', color: 'white' }}
        >
          <Text style={textStyle}>{data.totalExporters}</Text>
        </Card>

        {/* Card for Total Importers */}
        <Card
          title={<><UsergroupAddOutlined /> Total Importers</>}
          bordered={false}
          style={{ ...cardStyle, backgroundColor: '#52c41a', color: 'white' }}
        >
          <Text style={textStyle}>{data.totalImporters}</Text>
        </Card>

        {/* Card for Total Customs Officers */}
        <Card
          title={<><UserSwitchOutlined /> Total Customs Officers</>}
          bordered={false}
          style={{ ...cardStyle, backgroundColor: '#faad14', color: 'white' }}
        >
          <Text style={textStyle}>{data.totalCustomsOfficers}</Text>
        </Card>

        {/* Card for Pending Approvals */}
        <Card
          title={<><ClockCircleOutlined /> Pending Approvals</>}
          bordered={false}
          style={{ ...cardStyle, backgroundColor: '#fa541c', color: 'white' }}
        >
          <Text style={textStyle}>{data.pendingApprovals}</Text>
        </Card>

        {/* Card for Active Users */}
        <Card
          title={<><UserOutlined /> Active Users</>}
          bordered={false}
          style={{ ...cardStyle, backgroundColor: '#722ed1', color: 'white' }}
        >
          <Text style={textStyle}>{data.activeUsers}</Text>
        </Card>
      </div>
    </div>
  );
};

// Styles for card and text to keep them consistent
const cardStyle = {
  width: 300,
  textAlign: 'center',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const textStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

export default AdminDashboard;
