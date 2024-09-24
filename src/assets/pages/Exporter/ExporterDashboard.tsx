import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, message } from 'antd';
import { DollarCircleOutlined, FileDoneOutlined, GlobalOutlined } from '@ant-design/icons';

interface DashboardData {
  totalDeclarations: number;
  pendingPayments: number;
  shipmentMonitoring: number;
}

const ExporterDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Function to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://localhost:7232/Exporter_Dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error.message);
        message.error('Error fetching dashboard data.');
        setDashboardData(null); // Fallback in case of error
      }
    };

    // Fetch dashboard data on component mount
    fetchDashboardData();
  }, []);

  return (
    <Card title='Dashboard Overview'>
    <Row gutter={16}>
      <Col span={8}>
        <Card
          style={{ backgroundColor: '#f0f9ff', borderColor: '#91d5ff' }}
          bordered={false}
        >
          <Statistic
            title="Total Declarations"
            value={dashboardData ? dashboardData.totalDeclarations : 'N/A'}
            valueStyle={{ color: '#1890ff' }}
            prefix={<FileDoneOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{ backgroundColor: '#fff7e6', borderColor: '#ffc069' }}
          bordered={false}
        >
          <Statistic
            title="Pending Payments"
            value={dashboardData ? dashboardData.pendingPayments : 'N/A'}
            valueStyle={{ color: '#fa8c16' }}
            prefix={<DollarCircleOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          style={{ backgroundColor: '#f6ffed', borderColor: '#b7eb8f' }}
          bordered={false}
        >
          <Statistic
            title="Shipments Monitored"
            value={dashboardData ? dashboardData.shipmentMonitoring : 'N/A'}
            valueStyle={{ color: '#52c41a' }}
            prefix={<GlobalOutlined />}
          />
        </Card>
      </Col>
      </Row>
      </Card>
  );
};

export default ExporterDashboard;
