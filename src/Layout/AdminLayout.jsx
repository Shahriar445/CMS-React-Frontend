import React from "react";

import SidebarAdmin from "../assets/components/Sidebar/SidebarAdmin";
import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";
import "../assets/style/customizeCss.css";
const AdminLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div style={{ display: "flex" }}>
        <SidebarAdmin />
        <main
          style={{
            marginLeft: "2px",
            padding: "20px",
            background: "#f1f1f1",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
