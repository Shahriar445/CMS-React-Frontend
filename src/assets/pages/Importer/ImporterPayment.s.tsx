import React from "react";
import { Tabs } from "antd";
import PaymentComponent from "../../components/Payment/PaymentComponent";
import InvoiceSection from "../../components/Invoices/InvoiceComponent"; // Assuming this is the invoice component you already created

const { TabPane } = Tabs;

const ImporterPayment: React.FC = () => {
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

export default ImporterPayment;
