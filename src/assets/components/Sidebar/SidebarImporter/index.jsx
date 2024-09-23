import React from "react";
import Sider from "antd/es/layout/Sider";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  FileTextOutlined,
  DollarOutlined,
  MonitorOutlined,
} from "@ant-design/icons";
import LogoutButton from "../../LoginRegistration/logoutButton";

const iconStyle = { fontSize: "24px" };

const SidebarImporter = () => {
  return (
    <Sider
      style={{
        width: "100px",
        minHeight: "calc(100vh - 120px)",
        position: "relative",
        top: "0",
        bottom: "0",
        backgroundColor: "#fff", // Dark sidebar color
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
          component={<Link to="/importer/dashboard" />}
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
          component={<Link to="/importer/declaration" />}
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
          component={<Link to="/importer/payment" />}
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
          component={<Link to="/importer/monitoring" />}
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

export default SidebarImporter;
