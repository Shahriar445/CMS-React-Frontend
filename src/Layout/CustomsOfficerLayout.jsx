import React from "react";
import HeaderComponent from "../assets/components/Header";
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
        <div style={{ position: "fixed", width: "250px", height: "100%", top: 54, left: 0 }}>
          <SidebarCustomsOfficer />
        </div>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            marginLeft: "250px", // Sidebar width offset
            padding: "20px",
            background: "#f1f1f1", // Background color for content
            overflowY: "auto", // Enables scrolling if content overflows
            height: "calc(100vh - 54px)", // Adjust height based on header size
            marginTop: "54px", // Adjust based on header height
          }}
        >
          {children}
        </main>
      </div>

      {/* Optional Footer can be added */}
      {/* <FooterComponent /> */}
    </div>
  );
};

export default CustomsOfficerLayout;
