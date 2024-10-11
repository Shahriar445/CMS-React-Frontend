import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import axios from "axios";
import moment from "moment";

interface Invoice {
  invoiceId: number;
  userId: number;
  declarationId: number;
  amount: number;
  invoiceDate: string;
  paymentMethod: string;
  currency: string;
}

const InvoiceSection: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    if (userId) {
      const fetchInvoices = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7232/api/Payment/user-invoices/${userId}`
          );
          setInvoices(response.data);
        } catch (error) {
          console.error("Error fetching invoices:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchInvoices();
    } else {
      console.error("No user ID found in localStorage.");
      setLoading(false);
    }
  }, []);

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      className: "text-left",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      className: "text-left",
    },
    {
      title: "Declaration ID",
      dataIndex: "declarationId",
      key: "declarationId",
      className: "text-left",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      className: "text-left",
      render: (text: number, record: Invoice) => `${record.currency} ${text}`,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      className: "text-left",
      render: (paymentMethod: string) => (
        <Tag color={paymentMethod === "SSLCommerz" ? "green" : "blue"}>
          {paymentMethod}
        </Tag>
      ),
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      className: "text-left",
      render: (date: string) => moment(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      className: "text-center",
      render: (text: any, record: Invoice) => (
        <Space size="middle">
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              // Directly download the invoice when button is clicked
              window.open(
                `https://localhost:7232/api/Payment/${record.invoiceId}/download`
              );
            }}
          >
            Download
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Invoices</h2>
      <Table
        bordered
        columns={columns}
        dataSource={invoices}
        loading={loading}
        rowKey={(record) => record.invoiceId.toString()}
        pagination={{ pageSize: 5 }}
        className="table-auto min-w-full"
      />
    </div>
  );
};

export default InvoiceSection;
