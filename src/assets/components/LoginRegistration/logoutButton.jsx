// src/assets/components/LogoutButton.jsx
import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    

    navigate('/');
  };

  return (
    <Button style={{marginBottom:'30px'}} type="primary" danger
      
      icon={<LogoutOutlined style={{ fontSize: "15px"  }} />}
      onClick={handleLogout} 
    >
      Logout
    
    </Button>
  );
};

export default LogoutButton;
