import React from "react";
import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";
import SidebarExporter from "../assets/components/Sidebar/SidebarExporter";

const ExporterLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div style={{ display: "flex" }}>
        <SidebarExporter />
        <main
          style={{
            marginLeft: "2px",
            padding: "20px",
            background: "green",
          }}
        >
          {children}
        </main>
      </div>
      <FooterComponent />
    </div>
  );
};

export default ExporterLayout;
