import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SidebarCustomsOfficer = () => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem component={<Link to="/" />}>Dashboard</MenuItem>
        <MenuItem component={<Link to="/custome_officer/declaration" />}>
          Declaration Check
        </MenuItem>
        <MenuItem component={<Link to="/custome_officer/payment" />}>
          Payment History
        </MenuItem>
        <MenuItem component={<Link to="/custome_officer/monitoring" />}>
          Monitoring
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarCustomsOfficer;
