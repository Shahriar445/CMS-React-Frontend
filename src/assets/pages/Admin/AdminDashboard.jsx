import React, { useEffect, useState } from 'react';
import { Card, Typography, message } from 'antd';
const { Text } = Typography;

const AdminDashboard = () => {
    const [data, setData] = useState({
        totalExporters: 0,
        totalImporters: 0,
        totalCustomsOfficers: 0,
        pendingApprovals: 0,
        activeUsers: 0
    });

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token');
                
                // Check if token exists
                if (!token) {
                    message.error('You are not authorized to view this page. Please log in.');
                    window.location.href = '/login'; // Redirect to login page if no token
                    return;
                }

                // Fetch data with the Authorization header
                const response = await fetch('https://localhost:7232/api/CMS/user-counts', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
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

        // Call fetchData when component is mounted
        fetchData();
    }, []);

    return (
        <div style={{ width: '100%', padding: '0px' }}>
            <h1>Admin Dashboard</h1>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Card title="Total Exporters" bordered={false} style={{ width: 300 }}>
                    <Text>{data.totalExporters}</Text>
                </Card>

                <Card title="Total Importers" bordered={false} style={{ width: 300 }}>
                    <Text>{data.totalImporters}</Text>
                </Card>

                <Card title="Total Customs Officers" bordered={false} style={{ width: 300 }}>
                    <Text>{data.totalCustomsOfficers}</Text>
                </Card>

                <Card title="Pending Approvals" bordered={false} style={{ width: 300 }}>
                    <Text>{data.pendingApprovals}</Text>
                </Card>

                <Card title="Active Users" bordered={false} style={{ width: 300 }}>
                    <Text>{data.activeUsers}</Text>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
