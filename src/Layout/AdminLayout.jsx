import React from "react";
import SidebarAdmin from "../assets/components/Sidebar/SidebarAdmin";
import HeaderComponent from "../assets/components/Header";
import "../assets/style/customizeCss.css";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header at the top */}
      <HeaderComponent title={'Admin'} />

      {/* Sidebar and content layout */}
      <div style={{ display: "flex", flex: 1, padding: 0, marginTop: 0 }}>
        {/* Sidebar */}
        <div style={{ position: "fixed", width: "250px", height: "100%", top: 54, left: 0 }}>
          <SidebarAdmin />
        </div>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            marginLeft: "250px", // Offset for the sidebar width
            padding: "20px",
            background: "#f1f1f1",
            overflowY: "auto", // Enables vertical scrolling for the main content
            height: "calc(100vh - 54px)", // Adjust height based on header size
            marginTop: "54px", // Adjust based on header height
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
