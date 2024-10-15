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
    <div className="pending-users p-4 border border-gray-300 rounded-lg shadow-md my-6 bg-gray-50">
  <h1 className="text-3xl font-bold  p-4 rounded-md flex items-center justify-center shadow-lg"
        style={{ marginBottom: "24px" }}> Dashboard</h1>
  <div className="flex gap-5 flex-wrap justify-center mt-8">
    
    {/* Card for Total Exporters */}
    <Card
      title={<><UserAddOutlined /> Total Exporters</>}
      bordered={false}
      className="bg-blue-600 text-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
    >
      <Text className="text-lg font-semibold">{data.totalExporters}</Text>
    </Card>

    {/* Card for Total Importers */}
    <Card
      title={<><UsergroupAddOutlined /> Total Importers</>}
      bordered={false}
      className="bg-green-500 text-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
    >
      <Text className="text-lg font-semibold">{data.totalImporters}</Text>
    </Card>

    {/* Card for Total Customs Officers */}
    <Card
      title={<><UserSwitchOutlined /> Total Customs Officers</>}
      bordered={false}
      className="bg-yellow-500 text-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
    >
      <Text className="text-lg font-semibold">{data.totalCustomsOfficers}</Text>
    </Card>

    {/* Card for Pending Approvals */}
    <Card
      title={<><ClockCircleOutlined /> Pending Approvals</>}
      bordered={false}
      className="bg-red-600 text-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
    >
      <Text className="text-lg font-semibold">{data.pendingApprovals}</Text>
    </Card>

    {/* Card for Active Users */}
    <Card
      title={<><UserOutlined /> Active Users</>}
      bordered={false}
      className="bg-purple-600 text-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
    >
      <Text className="text-lg font-semibold">{data.activeUsers}</Text>
    </Card>
  </div>
</div>

  );
};

export default AdminDashboard;
