import HeaderComponent from "../assets/components/Header";
import SidebarExporter from "../assets/components/Sidebar/SidebarExporter";

const ExporterLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    
      <HeaderComponent title={'Exporter'}/>

      <div style={{ display: "flex", flex: 1, backgroundColor: "#f0f2f5" }}>
    
        <SidebarExporter />

    
        <main
          style={{
            flex: 1, 
            padding: "20px",
            marginLeft: "10px", 
            backgroundColor: "#fff",
            borderRadius: "8px", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
            minHeight: "calc(100vh - 200px)",
          }}
        >
          {children}
        </main>
      </div>

    </div>
  );
};

export default ExporterLayout;
