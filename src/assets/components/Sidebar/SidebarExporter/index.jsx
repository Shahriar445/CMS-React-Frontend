import React from "react";
import Sider from "antd/es/layout/Sider";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  FileTextOutlined,
  DollarOutlined,
  MonitorOutlined,UnorderedListOutlined 
} from "@ant-design/icons";
import LogoutButton from "../../LoginRegistration/logoutButton";

const iconStyle = { fontSize: "24px" };

const SidebarExporter = () => {
  return (
    <Sider className="bg-gray-200"
      style={{
        width: "200px",
        minHeight: "calc(100vh - 120px)",
        position: "relative",
        top: "0",
        bottom: "0",
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
          icon={
            <DashboardOutlined style={{ ...iconStyle, color: "#4CAF50" }} />
          }
          component={<Link to="/exporter/dashboard" />}
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
          icon={
            <FileTextOutlined style={{ ...iconStyle, color: "#00CCFF" }} />
          }
          component={<Link to="/exporter/declaration" />}
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
          Declaration
        </MenuItem>

        <MenuItem
          icon={<DollarOutlined style={{ ...iconStyle, color: "#3C3CEC" }} />}
          component={<Link to="/exporter/payment" />}
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
          Payment
        </MenuItem>

        <MenuItem
          icon={
            <MonitorOutlined style={{ ...iconStyle, color: "#EF634D" }} />
          }
          component={<Link to="/exporter/monitoring" />}
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
          Monitor
        </MenuItem>

          <MenuItem
          icon={
            <UnorderedListOutlined  style={{ ...iconStyle, color: "#FF8C00" }} />
          }
          component={<Link to="/exporter/list" />}
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
          List Shipment
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

export default SidebarExporter;
