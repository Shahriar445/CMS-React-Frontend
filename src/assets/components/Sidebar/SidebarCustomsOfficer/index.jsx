import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  HistoryOutlined,
  BarChartOutlined,
  LockOutlined,
} from "@ant-design/icons";
import LogoutButton from "../../LoginRegistration/logoutButton";

const SidebarCustomsOfficer = () => {
  return (
    <Sidebar
      style={{
        backgroundColor: "#001529", // Set background color
        color: "#ffffff", // Set text color
        width: "250px",
        minHeight: "calc(100vh - 120px)",
        position: "relative",
        top: "0",
        left: "0",
        bottom: "0",
      }}
    >
      <Menu
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
          marginLeft: "5px",
        }}
      >
        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/customs_officer/dashboard" />}
          icon={<DashboardOutlined style={{ color: "#4CAF50" }} />}
        >
          Dashboard
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/customs_officer/payment" />}
          icon={<HistoryOutlined style={{ color: "#c600f7" }} />}
        >
          Payment Details
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/customs_officer/report" />}
          icon={<BarChartOutlined style={{ color: "#ef634d" }} />}
        >
          Monitor
        </MenuItem>

        <MenuItem
          style={{
            fontSize: "30px",
            color: "#ffff",
            marginBottom: "10px",
          }}
          component={<Link to="/customs_officer/permission" />}
          icon={<LockOutlined style={{ color: "Highlight" }} />}
        >
          Permission
        </MenuItem>
        <div style={{ padding: "2px", position: "absolute", bottom: "0", left: "0", width: "100%" }}>
        <LogoutButton />
      </div>
      </Menu>
    </Sidebar>
  );
};

export default SidebarCustomsOfficer;
