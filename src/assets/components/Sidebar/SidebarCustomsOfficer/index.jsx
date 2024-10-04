import React from "react";
import Sider from "antd/es/layout/Sider";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  HistoryOutlined,
  BarChartOutlined,
  LockOutlined,FileTextOutlined
} from "@ant-design/icons";
import LogoutButton from "../../LoginRegistration/logoutButton";

const iconStyle = { fontSize: "24px" };

const SidebarCustomsOfficer = () => {
  return (
    <Sider
      style={{
        width: "200px",
        minHeight: "calc(100vh - 120px)",
        position: "relative",
        top: "0",
        bottom: "0",
        backgroundColor: "#fff", // Optional: set background color for the sidebar
      }}
    >
      <Menu
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
          gap: "20px",
        }}
      >
        <MenuItem
          component={<Link to="/officer/dashboard" />}
          icon={<DashboardOutlined style={{ iconStyle, color: "#4CAF50" }} />}
          style={{
            color: "black",
            marginBottom: "10px",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #e0e0e0", // Add border
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Add shadow
            transition: "all 0.3s ease", // Smooth transition on hover
          }}
        >
          Dashboard
        </MenuItem>

        <MenuItem
          component={<Link to="/officer/payment" />}
          icon={<HistoryOutlined style={{ iconStyle, color: "#c600f7" }} />}
          style={{
            color: "black",
            marginBottom: "10px",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
        >
          Payment Details
        </MenuItem>

        <MenuItem
          component={<Link to="/officer/monitor" />}
          icon={<BarChartOutlined style={{ iconStyle, color: "#ef634d" }} />}
          style={{
            color: "black",
            marginBottom: "10px",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
        >
          Monitor
        </MenuItem>

        <MenuItem
          component={<Link to="/officer/permission" />}
          icon={<LockOutlined style={{ iconStyle, color: "Highlight" }} />}
          style={{
            color: "black",
            marginBottom: "10px",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
        >
          Permission
        </MenuItem>
           <MenuItem
          component={<Link to="/officer/report" />}
          icon={<FileTextOutlined style={{ iconStyle, color: "Highlight" }} />}
          style={{
            color: "black",
            marginBottom: "10px",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
        >
          Report
        </MenuItem>

        <div
          style={{
            padding: "2px",
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
          }}
        >
          <LogoutButton />
        </div>
      </Menu>
    </Sider>
  );
};

export default SidebarCustomsOfficer;
