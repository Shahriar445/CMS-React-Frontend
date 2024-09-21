import { useEffect, useState } from 'react';
import { Card, Col, Row, Spin, Alert } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label, Cell } from 'recharts';

const AdminMonitor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://localhost:7232/admin-monitor'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Admin Monitor</h1>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="User Activity" bordered={false}>
            <BarChartComponent data={data} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

// Define colors for different bars
const colors = ['#4096ff', '#ff4d4f', '#36cfc9', '#ffa940', '#a0d911', '#9254de'];

// Bar Chart component with different colors and shapes
const BarChartComponent = ({ data }) => {
  return (
    <BarChart width={600} height={300} data={data}>
      {/* X Axis - User Names */}
      <XAxis dataKey="name">
        <Label value="User Name" offset={-5} position="insideBottom" />
      </XAxis>
      
      {/* Y Axis - Login Count */}
      <YAxis>
        <Label value="Login Count" angle={-90} position="insideLeft" />
      </YAxis>
      
      {/* Tooltips and Legends */}
      <Tooltip />
      <Legend />
      
      {/* Bar Data with different colors and shapes */}
      <Bar dataKey="value" fill="#4096ff">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default AdminMonitor;
