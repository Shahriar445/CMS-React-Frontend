
import { Header } from "antd/es/layout/layout";

const HeaderComponent = ({ title }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#4096ff] to-[#87cefa]"> 
      <Header className="flex items-center justify-center h-16 text-white" style={{ background: 'none' }}>
        <h1 className="text-3xl font-bold uppercase"> 
          {title || "Customs Management System"}
        </h1>
      </Header>
    </div>
  );
};

export default HeaderComponent;
