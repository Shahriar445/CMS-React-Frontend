import Register from "../../components/LoginRegistration/Register";
import Card from "antd/es/card/Card";
const RegistrationPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f0f2f5",
        }}
      >
        <Card title="Registration" style={{ width: 400 }}>
          <Register />
        </Card>
      </div>
    </>
  );
};
export default RegistrationPage;
