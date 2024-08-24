import React from 'react';
import { Image, Space, Typography,Badge } from 'antd';
import { MailOutlined, BellFilled } from '@ant-design/icons'; // Correct import for icons

const HeaderComponent = () => {
  return (
    <div className="AppHeader">
  
      <Typography.Title>
        Customs Management System
      </Typography.Title>
      <Space >
        <Badge>

       
        <MailOutlined style={{ fontSize: '24px' }} /> </Badge>
        <Badge>

  
        <BellFilled style={{ fontSize: '24px' }} />
        </Badge>
      </Space>
    </div>
  );
};

export default HeaderComponent;
