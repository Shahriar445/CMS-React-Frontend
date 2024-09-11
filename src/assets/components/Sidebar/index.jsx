import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SidebarComponent = () => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem component={<Link to="/" />}>Dashboard</MenuItem>
        <MenuItem component={<Link to="/importer/declaration" />}>
          Declaration
        </MenuItem>
        <MenuItem component={<Link to="/importer/payment" />}>Payment</MenuItem>
        <MenuItem component={<Link to="/importer/monitoring" />}>
          Monitoring
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
