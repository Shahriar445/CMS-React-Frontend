import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";

import LoginPage from "../assets/pages/LoginRegisterPage";

function HomeLayout() {
  return (
    <div>
      <HeaderComponent />

      <LoginPage />

      <FooterComponent />
    </div>
  );
}

export default HomeLayout;
