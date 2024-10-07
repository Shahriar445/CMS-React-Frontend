import React, { useEffect, useState } from "react";
import { Table, Spin, message, Input, Tag, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const CustomsOfficerMonitor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // New state for status filter

  const fetchMonitoringData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://localhost:7232/customsOfficerMonitor"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch monitoring data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      message.error("Error fetching monitoring data: " + error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoringData();
  }, []);

  const filteredData = data
    .filter(
      (item) =>
        item.declarationId.toString().includes(searchTerm) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) => (statusFilter ? item.status === statusFilter : true) // Apply status filter
    );

  // Function to determine tag color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Rejected":
        return "red";
      case "Completed":
        return "green";
      default:
        return "default"; // Fallback color
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Declaration ID",
      dataIndex: "declarationId",
      key: "declarationId",
    },
    {
      title: "Monitoring ID",
      dataIndex: "monitoringId",
      key: "monitoringId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color={getStatusColor(text)}>{text}</Tag>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `$${text.toFixed(2)}`,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 ">
        List of Declaration Create by Exporter and Importer
      </h2>

      <Search
        placeholder="Search by Declaration ID or Username"
        onSearch={setSearchTerm}
        enterButton
        style={{ marginBottom: 16, width: "40%" }}
      />
      <Select
        placeholder="Filter by Status"
        onChange={setStatusFilter}
        style={{ width: 200, marginBottom: 16 }}
        allowClear // Allow clearing the filter
      >
        <Option value="">All</Option>
        <Option value="Pending">Pending</Option>
        <Option value="Rejected">Rejected</Option>
        <Option value="Completed">Completed</Option>
      </Select>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          className="p-5 bg-gray-100 rounded shadow-md"
          dataSource={filteredData}
          columns={columns}
          rowKey="monitoringId" // Unique key for each row
        />
      )}
    </div>
  );
};

export default CustomsOfficerMonitor;
