import React from "react";
import SidebarAdmin from "../assets/components/Sidebar/SidebarAdmin";
import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";
import "../assets/style/customizeCss.css";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header at the top */}
      <HeaderComponent title={'Admin'} />

      {/* Sidebar and content layout */}
      <div style={{ display: "flex", flex: 1, padding: 0, marginTop: 0 }}>
        {/* Sidebar */}
        <SidebarAdmin />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "#f1f1f1",
            overflowY: "auto", // Ensures scroll if content is too large
            marginTop: 0, // Ensure no margin above main content
            marginLeft: "2px", // Optional if you want a small gap between sidebar and content
          }}
        >
          {children}
        </main>
      </div>

      {/* Footer can be added if required */}
      {/* <FooterComponent /> */}
    </div>
  );
};

export default AdminLayout;
