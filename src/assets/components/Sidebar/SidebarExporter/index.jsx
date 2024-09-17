import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SidebarExporter = () => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem component={<Link to="/exporter/dashboard" />}>
          Dashboard
        </MenuItem>
        <MenuItem component={<Link to="/exporter/declaration" />}>
          Declaration
        </MenuItem>
        <MenuItem component={<Link to="/exporter/payment" />}>Payment</MenuItem>
        <MenuItem component={<Link to="/exporter/monitoring" />}>
          Monitoring
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarExporter;
