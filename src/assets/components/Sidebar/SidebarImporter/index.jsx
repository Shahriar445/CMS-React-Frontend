import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  FileTextOutlined,
  DollarOutlined,
  MonitorOutlined,
} from "@ant-design/icons";

const iconStyle = { fontSize: "24px", color: "#ffffff" };
const SidebarImporter = () => {
  return (
    <Sidebar
      style={{
        backgroundColor: "#001529",
        color: "black",
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
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/importer/dashboard" />}
          icon={<DashboardOutlined style={{ iconStyle, color: "#4CAF50" }} />}
        >
          Dashboard
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/importer/declaration" />}
          icon={<FileTextOutlined style={{ iconStyle, color: "#ccgfff" }} />}
        >
          Declaration
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/importer/payment" />}
          icon={<DollarOutlined style={{ iconStyle, color: "#3c3cec" }} />}
        >
          Payment
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/importer/monitoring" />}
          icon={<MonitorOutlined style={{ iconStyle, color: "#ef634d" }} />}
        >
          Monitor
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarImporter;
