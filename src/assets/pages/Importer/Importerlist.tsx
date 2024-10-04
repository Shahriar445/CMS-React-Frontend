import React, { useEffect, useState } from "react";
import { Table, Typography, Card, Tag, Input } from "antd";

const { Title } = Typography;
const { Search } = Input;

interface ShipmentData {
  declarationId: number;
  methodOfShipment: string;
  portOfDeparture: string;
  portOfDestination: string;
  departureDate: string;
  arrivalDate: string;
  status: string;
  productName: string;
  quantity: number;
  weight: number;
  countryOfOrigin: string;
  hscode: string;
}

const statusColors: { [key: string]: string } = {
  "In Transit": "blue",
  Running: "yellow",
  Pending: "orange",
  Rejected: "red",
  Approved: "yellow",
  Completed: "green",
};

const Importerlist: React.FC = () => {
  const [shipmentData, setShipmentData] = useState<ShipmentData[]>([]);
  const [filteredData, setFilteredData] = useState<ShipmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipmentData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(
          `https://localhost:7232/api/CMS/GetUserMonitorings/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setShipmentData(data);
        setFilteredData(data);
      } catch (error) {
        setError(
          "There has been a problem with your fetch operation: " + error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShipmentData();
  }, []);

  const handleSearch = (value: string) => {
    const filtered = shipmentData.filter(
      (item) =>
        item.productName.toLowerCase().includes(value.toLowerCase()) ||
        item.status.toLowerCase().includes(value.toLowerCase()) ||
        item.portOfDeparture.toLowerCase().includes(value.toLowerCase()) ||
        item.portOfDestination.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Declaration ID",
      dataIndex: "declarationId",
      key: "declarationId",
      width: 100,
    },
    {
      title: "Method of Shipment",
      dataIndex: "methodOfShipment",
      key: "methodOfShipment",
      width: 150,
    },
    {
      title: "Port of Departure",
      dataIndex: "portOfDeparture",
      key: "portOfDeparture",
      width: 150,
    },
    {
      title: "Port of Destination",
      dataIndex: "portOfDestination",
      key: "portOfDestination",
      width: 150,
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      key: "departureDate",
      width: 120,
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Arrival Date",
      dataIndex: "arrivalDate",
      key: "arrivalDate",
      width: 120,
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => (
        <Tag color={statusColors[status] || "gray"}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      width: 100,
    },
    {
      title: "Country of Origin",
      dataIndex: "countryOfOrigin",
      key: "countryOfOrigin",
      width: 150,
    },
    {
      title: "HS Code",
      dataIndex: "hscode",
      key: "hscode",
      width: 100,
    },
  ];

  return (
    <div>
      <main>
        <div className="monitoring-section">
          <Title level={2}>Track Your Shipments</Title>
          {error && <div style={{ color: "red" }}>{error}</div>}

          {/* Search Bar */}
          <Search
            placeholder="Search by Product Name, Status, Ports..."
            onSearch={handleSearch}
            enterButton
            style={{ marginBottom: "20px", width: "320px" }}
          />

          <Card style={{ marginTop: "20px", overflow: "hidden" }}>
            <Table
              dataSource={filteredData}
              columns={columns}
              rowKey="declarationId"
              loading={loading}
              pagination={{ pageSize: 10 }} // Pagination for 10 rows per page
              scroll={{ x: true }} // Horizontal scroll if needed
            />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Importerlist;
