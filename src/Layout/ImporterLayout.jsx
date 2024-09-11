import React from "react";
import SidebarComponent from "../assets/components/Sidebar";

const ImporterLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <SidebarComponent />
      <main
        style={{ marginLeft: "100px", padding: "20px", background: "pink" }}
      >
        {children}
      </main>
    </div>
  );
};

export default ImporterLayout;
