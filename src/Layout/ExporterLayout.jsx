import HeaderComponent from "../assets/components/Header";
import SidebarExporter from "../assets/components/Sidebar/SidebarExporter";

const ExporterLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderComponent title={'Exporter'} />

      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ position: "fixed", width: "250px", height: "100%", top: 54, left: 0 }}>
          <SidebarExporter />
        </div>

        <main
          style={{
            flex: 1,
            marginLeft: "200px",
            padding: "0px",
            
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            height: "calc(100vh - 54px)",
            marginTop: "80px",
            overflowY: "auto",
            
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default ExporterLayout;
