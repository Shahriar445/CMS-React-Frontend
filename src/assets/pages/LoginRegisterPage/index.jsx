import { useState } from "react";
import { Button, Card } from "antd";
import Login from "../../components/LoginRegistration/login";
import Register from "../../components/LoginRegistration/Register";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Card
        headStyle={{
          backgroundColor: "#f0f2f5",
          textAlign: "center",
          borderRadius: "8px",
        }}
        title="Customs Management System"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
            marginTop: "0px",
            padding: "0px",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            {isLogin ? "User Login" : "User Register"}
          </div>
        </div>
        <div style={{ marginBottom: "0px" }}>
          {isLogin ? <Login /> : <Register />}
        </div>
        <Button block onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Go to Register" : "Go to Login"}
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
