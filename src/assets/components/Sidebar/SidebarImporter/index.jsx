import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SidebarImporter = () => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem>
          <Link to="/">Dashboard</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/importer/declaration">Declaration</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/importer/payment">Payment</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/importer/monitoring">Monitoring</Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarImporter;
