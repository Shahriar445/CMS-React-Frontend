import React from "react";
import SidebarImporter from "../assets/components/Sidebar/SidebarImporter";
import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";
import "../assets/style/customizeCss.css";
const ImporterLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div style={{ display: "flex" }}>
        <SidebarImporter />
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

export default ImporterLayout;
