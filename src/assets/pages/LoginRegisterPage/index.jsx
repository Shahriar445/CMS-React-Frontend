import { useState } from "react";
import { Button, Card } from "antd";
import Login from "../../components/LoginRegistration/login";
import Register from "../../components/LoginRegistration/Register";
import {Carousel} from "antd";
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{  display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
      gap: "10px",
    }}>
        <Card
        headStyle={{ textAlign: "center", background: "linear-gradient(to right, #4A90E2, #50E3C2)", color: "#fff" }} // Gradient background and white text
        title={isLogin ? "Login" : "Registration"} 
        style={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        {isLogin ? <Login /> : <Register />} {/* Render Login or Register component based on the state */}
        
        <Button block onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '10px' }}>
          {isLogin ? "Go to Register" : "Go to Login"}
        </Button>
      </Card>

      {isLogin && (
        <Card

          style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "400px", 
            height: "350px"
          }}
        >
          <Carousel autoplay>
            <div>
              <img src="./../../../../public/1.webp" alt="Slide 1" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
            </div>
            <div>
              <img src="./../../../../public/2.png" alt="Slide 2" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
            </div>
            <div>
              <img src="./../../../../public/3.jpeg" alt="Slide 3" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
            </div>
          </Carousel>
        </Card>
      )}
    </div>
  );
};

export default LoginPage;
