import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SidebarAdmin = () => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem component={<Link to="/" />}>Dashboard</MenuItem>
        <MenuItem component={<Link to="/admin/payment" />}>
          Payment History
        </MenuItem>
        <MenuItem component={<Link to="/admin/monitoring" />}>
          Monitoring
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarAdmin;
