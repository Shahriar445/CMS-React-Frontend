import React from "react";
import { Header } from "antd/es/layout/layout";

const HeaderComponent = () => {
  return (
    <>
      <Header
        style={{
          textAlign: "center",
          background: " #1abc9c",
          color: "white",
          fontSize: "30px",
        }}
      >
        CMS
      </Header>
    </>
  );
};

export default HeaderComponent;
