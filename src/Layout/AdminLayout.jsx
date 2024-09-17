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
            background: "#dbd3f3",
          }}
        >
          {children}
        </main>
      </div>

      <FooterComponent />
    </div>
  );
};

export default AdminLayout;
