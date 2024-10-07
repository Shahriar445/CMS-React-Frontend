import React, { useEffect, useState } from "react";
import { Table, Tag, message, Input } from "antd";
import {
  DollarOutlined,
  FileTextOutlined,
  UserOutlined,
  ClockCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface PaymentData {
  paymentId: string;
  userId: string;
  amount: number;
  date: string;
  status: string;
  declarationId: string;
  productName: string;
}

const CustomsOfficerPayment: React.FC = () => {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredPayments, setFilteredPayments] = useState<PaymentData[]>([]);

  // Fetch the payment history
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch(
          "https://localhost:7232/payment-history-show"
        );
        const data = await response.json();
        setPayments(data);
        setFilteredPayments(data); // Initialize filtered payments with all payments
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        message.error("Failed to load payment history.");
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  // Filter the data when search text changes
  useEffect(() => {
    const filteredData = payments.filter(
      (payment) =>
        String(payment.paymentId)
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        String(payment.userId)
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        String(payment.declarationId)
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        String(payment.productName)
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
    setFilteredPayments(filteredData);
  }, [searchText, payments]); // Re-filter the data whenever searchText or payments change

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
      render: (text: string) => (
        <span>
          <FileTextOutlined /> {text}
        </span>
      ),
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (text: string) => (
        <span>
          <UserOutlined /> {text}
        </span>
      ),
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <span>
          <DollarOutlined /> {amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <span>
          <ClockCircleOutlined /> {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Completed" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Declaration ID",
      dataIndex: "declarationId",
      key: "declarationId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment History</h2>

      <Input
        placeholder="Search Payment ID, User ID, Declaration ID, or Product Name"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "20px", width: "40%" }}
      />

      <Table
        className="p-5 bg-gray-100 rounded shadow-md"
        columns={columns}
        dataSource={filteredPayments}
        loading={loading}
        rowKey="paymentId"
        bordered
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default CustomsOfficerPayment;
