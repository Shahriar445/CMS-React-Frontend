import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import {
  DashboardOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";

const iconStyle = { fontSize: "24px" };
const SidebarAdmin = () => {
  return (
    <>
      <Sidebar
        style={{
          backgroundColor: "#001529",
          color: "black",
          width: "250px",
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
              fontSize: "30px",
            }}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            style={{
              fontSize: "30px",
              color: "#ffff",
              marginBottom: "10px",
            }}
            icon={<EyeOutlined style={{ iconStyle, color: "#2196F3" }} />}
            component={<Link to="/admin/monitor" />}
          >
            Monitoring
          </MenuItem>

          <MenuItem
            style={{ fontSize: "30px", color: "#ffffff" }}
            icon={<UserOutlined style={{ color: "#02daa3" }} />}
            component={<Link to="/admin/usermanage" />}
          >
            User Manage
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarAdmin;
