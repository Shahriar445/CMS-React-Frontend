import React from "react";
import { Tabs } from "antd";
import PaymentComponent from "../../components/Payment/PaymentComponent";
import InvoiceSection from "../../components/Invoices/InvoiceComponent"; // Make sure this is the correct path for your InvoiceComponent

const { TabPane } = Tabs;

const ExporterPayment: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Make Payment" key="1">
          <div className="p-5 bg-white rounded shadow-md">
            <PaymentComponent />
          </div>
        </TabPane>
        <TabPane tab="Invoices" key="2">
          <div className="p-5 bg-white rounded shadow-md">
            <InvoiceSection />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ExporterPayment;
