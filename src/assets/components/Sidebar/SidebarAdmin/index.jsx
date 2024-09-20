import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

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
      <Sidebar
        style={{
          backgroundColor: "#001529",
          color: "black",
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
            icon={<DashboardOutlined style={{ iconStyle, color: "#4CAF50" }} />} // Add the icon here
            component={<Link to="/admin/dashboard" />}
            style={{
              color: "#ffff", // Light blue text
              marginBottom: "10px",
              fontSize: "20px",
            }}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            style={{
              fontSize: "20px",
              color: "#ffff",
              marginBottom: "10px",
            }}
            icon={<EyeOutlined style={{ iconStyle, color: "#2196F3" }} />}
            component={<Link to="/admin/monitor" />}
          >
            Monitoring
          </MenuItem>

          <MenuItem
            style={{ fontSize: "20px", color: "#ffffff" }}
            icon={<UserOutlined style={{ color: "#02daa3" }} />}
            component={<Link to="/admin/usermanage" />}
          >
            User Manage
          </MenuItem>
          <div style={{ padding: "2px", position: "absolute", bottom: "0", left: "0", width: "100%" }}>
        <LogoutButton />
      </div>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarAdmin;
