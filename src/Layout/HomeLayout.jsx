import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";
import Login from "../assets/components/LoginRegistration/login";
import Register from "../assets/components/LoginRegistration/Register";

import { useState } from "react";

function HomeLayout  () {
    const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <HeaderComponent />
      <div>
      <h1>Authentication System</h1>
      {isLogin ? <Login /> : <Register />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Go to Register' : 'Go to Login'}
      </button>
    </div>
       

      <FooterComponent />
    </div>
  );
};

export default HomeLayout;
