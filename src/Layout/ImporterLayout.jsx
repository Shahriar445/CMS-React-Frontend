import React from "react";
import SidebarComponent from "../assets/components/Sidebar";
import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";

const ImporterLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <main
          style={{ marginLeft: "100px", padding: "20px", background: "pink" }}
        >
          {children}
        </main>
      </div>

      <FooterComponent />
    </div>
  );
};

export default ImporterLayout;
