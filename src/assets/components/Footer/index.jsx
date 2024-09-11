import { Footer } from "antd/es/layout/layout";
import React from "react";

const FooterComponent = () => {
  return (
    <Footer
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        backgroundColor: "pink",
        color: "red",
        textAlign: "center",
      }}
    >
      this is footer
    </Footer>
  );
};

export default FooterComponent;
