import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";

import LoginPage from "../assets/pages/LoginRegisterPage";

function HomeLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderComponent />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          <LoginPage />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
