import React from "react";
import { Header } from "antd/es/layout/layout";

const HeaderComponent = () => {
  return (
    <>
      <Header
        style={{
          textAlign: "center",
          color: "#fff",
          height: 64,
          paddingInline: 48,
          lineHeight: "64px",
          backgroundColor: "#4096ff",
        }}
      >
        CMS
      </Header>
    </>
  );
};

export default HeaderComponent;
