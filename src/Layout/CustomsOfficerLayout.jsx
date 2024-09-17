import React from "react";
import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";
import SidebarExporter from "../assets/components/Sidebar/SidebarExporter";
import SidebarCustomsOfficer from "../assets/components/Sidebar/SidebarCustomsOfficer";

const CustomsOfficerLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div style={{ display: "flex" }}>
        <SidebarCustomsOfficer />
        <main
          style={{
            marginLeft: "2px",
            padding: "20px",
            background: "red",
          }}
        >
          {children}
        </main>
      </div>
      <FooterComponent />
    </div>
  );
};

export default CustomsOfficerLayout;
