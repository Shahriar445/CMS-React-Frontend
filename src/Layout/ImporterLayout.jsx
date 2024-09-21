import SidebarImporter from "../assets/components/Sidebar/SidebarImporter";
import HeaderComponent from "../assets/components/Header";
import FooterComponent from "../assets/components/Footer";
import "../assets/style/customizeCss.css";

const ImporterLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header at the top */}
      <HeaderComponent title={'Importer'} />

      {/* Sidebar and content layout */}
      <div style={{ display: "flex", flex: 1, padding: 0, marginTop: 0 }}>
        {/* Sidebar */}
        <SidebarImporter />

        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "#dbd3f3",
            overflowY: "auto", // Ensures scroll if content is too large
            marginTop: 0, // Ensure no margin above main content
          }}
        >
          {children}
        </main>
      </div>

      {/* Footer can be added if required */}
      {/* <FooterComponent /> */}
    </div>
  );
};

export default ImporterLayout;
