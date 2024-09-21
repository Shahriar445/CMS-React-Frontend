import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {
  DashboardOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import LogoutButton from "../../LoginRegistration/logoutButton";
const iconStyle = { fontSize: "24px" };
const SidebarAdmin = () => {
  return (
    <>
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
            icon={
              <DashboardOutlined
                style={{ iconStyle, color: "#4CAF50", padding: "0px" }}
              />
            } // Add the icon here
            component={<Link to="/admin/dashboard" />}
            style={{
              color: "black", // Light blue text
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
            style={{
              fontSize: "20px",
              color: "black",
              marginBottom: "10px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0", // Add border
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Add shadow
              transition: "all 0.3s ease", // Smooth transition on hover
            }}
            icon={<EyeOutlined style={{ iconStyle, color: "#2196F3" }} />}
            component={<Link to="/admin/monitor" />}
          >
            Monitor
          </MenuItem>

          <MenuItem
            style={{
              fontSize: "20px",
              color: "black",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0", // Add border
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Add shadow
              transition: "all 0.3s ease", // Smooth transition on hover
            }}
            icon={<UserOutlined style={{ color: "#02daa3" }} />}
            component={<Link to="/admin/usermanage" />}
          >
            User Manage
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
    </>
  );
};

export default SidebarAdmin;
