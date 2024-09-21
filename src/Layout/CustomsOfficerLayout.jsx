import React from "react";
import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";
import SidebarCustomsOfficer from "../assets/components/Sidebar/SidebarCustomsOfficer";
import "../assets/style/customizeCss.css";

const CustomsOfficerLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header at the top */}
      <HeaderComponent title={'Customs Officer'} />

      {/* Sidebar and content layout */}
      <div style={{ display: "flex", flex: 1, padding: 0, marginTop: 0 }}>
        {/* Sidebar */}
        <SidebarCustomsOfficer />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "gray",
            overflowY: "auto", // Ensures scroll if content is too large
            marginTop: 0, // No margin above content
            marginLeft: "2px", // Small gap between sidebar and content
          }}
        >
          {children}
        </main>
      </div>

    </div>
  );
};

export default CustomsOfficerLayout;
