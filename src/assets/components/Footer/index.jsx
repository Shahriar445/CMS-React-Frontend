import { Footer } from "antd/es/layout/layout";
import React from "react";

const FooterComponent = () => {
  return (
    <Footer
      style={{
        position: "relative",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "#001529",
        color: "#fff",
        textAlign: "center",
        padding: "10px 0",
        borderTop: "1px solid #ccc",
        fontSize: "14px",
      }}
    >
      © 2024 Customs Management System. All Rights Reserved.
    </Footer>
  );
};

export default FooterComponent;
