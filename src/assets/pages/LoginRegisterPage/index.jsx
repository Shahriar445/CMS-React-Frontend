import React, { useState } from "react";
import { Button, Card } from "antd";
import Login from "../../components/LoginRegistration/Login";
import Register from "../../components/LoginRegistration/Register";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {isLogin ? "User Login" : " User Register"}
        </div>
        <div style={{ marginBottom: "20px" }}>
          {isLogin ? <Login /> : <Register />}
        </div>
        <Button
          type="primary"
          block
          onClick={() => setIsLogin(!isLogin)}
          style={{
            marginTop: "20px",
          }}
        >
          {isLogin ? "Go to Register" : "Go to Login"}
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
