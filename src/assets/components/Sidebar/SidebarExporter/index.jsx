import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  FileTextOutlined,
  DollarOutlined,
  MonitorOutlined,
} from "@ant-design/icons";

const iconStyle = { fontSize: "24px" };

const SidebarExporter = () => {
  return (
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
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/exporter/dashboard" />}
          icon={<DashboardOutlined style={{ color: "#4CAF50", iconStyle }} />}
        >
          Dashboard
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/exporter/declaration" />}
          icon={<FileTextOutlined style={{ color: "#ccgfff" }} />}
        >
          Declaration
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/exporter/payment" />}
          icon={<DollarOutlined style={{ color: "#3c3cec" }} />}
        >
          Payment
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/exporter/monitoring" />}
          icon={<MonitorOutlined style={{ color: "#ef634d" }} />}
        >
          Monitoring
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarExporter;
