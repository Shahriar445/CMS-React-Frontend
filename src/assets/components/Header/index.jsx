import React from "react";
import { Header } from "antd/es/layout/layout";

const HeaderComponent = ({ title }) => {
  return (
    <div style={{ padding: '0px' }}>
      <Header
        style={{
          textAlign: "center",
          color: "#fff",
          height: "54px", // Ensure the height is consistent
          lineHeight: "54px", // Align text vertically
          paddingInline: "0px", // Remove side padding if not needed
          backgroundColor: "#4096ff", // Header background color
          position: "fixed", // Fix header to the top
          width: "100%", // Make sure it spans the full width
          top: 0,
          left: 0,
          zIndex: 1000, // Ensure it's above other content
        }}
      >
        {title || "CMS"} {/* Default title is CMS */}
      </Header>
    </div>
  );
};

export default HeaderComponent;
