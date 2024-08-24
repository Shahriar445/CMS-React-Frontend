import React from 'react';
import { Card } from 'antd';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card title="Welcome to the Customs Management System" style={{ width: 300 }}>
        <p>Use the navigation bar to go to Login or Registration.</p>
      </Card>
    </div>
  );
};

export default HomePage;
