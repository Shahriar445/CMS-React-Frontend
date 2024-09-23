import SidebarImporter from "../assets/components/Sidebar/SidebarImporter";
import HeaderComponent from "../assets/components/Header";
import "../assets/style/customizeCss.css";

const ImporterLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header at the top */}
      <HeaderComponent title={'Importer'} />

      {/* Sidebar and content layout */}
      <div style={{ display: "flex", flex: 1, padding: 0, marginTop: 0 }}>
        {/* Sidebar */}
        <div style={{ position: "fixed", width: "150px", height: "100%", top: 54, left: 0 }}>
          <SidebarImporter />
        </div>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            marginLeft: "200px", // Offset for the sidebar width
            padding: "20px",
            background: "#dbd3f3", // Background color specific for Importer layout
            overflowY: "auto", // Ensures scrolling for overflow content
            height: "calc(100vh - 54px)", // Adjust height based on header size
            marginTop: "54px", // Offset based on header height
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
