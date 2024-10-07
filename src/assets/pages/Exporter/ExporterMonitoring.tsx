import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  message,
  Spin,
  Progress,
  Row,
  Col,
} from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import "../../style/exporter.css"; // Add this to include external CSS file

const { Title, Text } = Typography;

interface MonitoringData {
  shipmentsProcessed: number;
  shipmentPending: number;
  currentStatus: string;
  customsClearanceRate: number;
}

const ExporterMonitoring: React.FC = () => {
  const [data, setData] = useState<MonitoringData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMonitoringOverview = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User Id not found in local stroage");
      }
      const response = await fetch(
        `https://localhost:7232/monitoring/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch monitoring overview");
      }
      const result: MonitoringData = await response.json();
      setData(result);
    } catch (error) {
      message.error("Error fetching monitoring overview: " + error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoringOverview();
  }, []);

  return (
    <Card title="Monitoring Overview" style={{ margin: 0, padding: 0 }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card className="animated-card processed-card">
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: "green" }}
                />
                <Title level={4}>Shipments Processed</Title>
                <div
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <Text style={{ fontSize: "32px", color: "green" }}>
                    {data ? data.shipmentsProcessed : "N/A"}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="animated-card pending-card">
                <SyncOutlined style={{ fontSize: "24px", color: "orange" }} />
                <Title level={4}>Shipments Pending</Title>
                <div
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <Text style={{ fontSize: "32px", color: "orange" }}>
                    {data ? data.shipmentPending : "N/A"}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="animated-card status-card">
                <Title level={4}>Current Status</Title>
                <Text
                  id="current-status"
                  style={{ fontSize: "16px", color: "#595959" }}
                >
                  {data ? `Status: ${data.currentStatus}` : "N/A"}
                </Text>
              </Card>
            </Col>
          </Row>

          {/* Clearance Rate Card centered at the bottom */}
          <Row justify="center" style={{ marginTop: "16px" }}>
            <Col span={12} style={{ textAlign: "center" }}>
              <Card className="animated-card clearance-card">
                <BarChartOutlined style={{ fontSize: "24px", color: "blue" }} />
                <Title level={4} style={{ marginTop: "8px" }}>
                  Clearance Rate
                </Title>
                <Progress
                  id="customs-clearance"
                  type="circle"
                  percent={
                    data ? parseFloat(data.customsClearanceRate.toFixed(2)) : 0
                  }
                  format={(percent) => `${percent}%`}
                  strokeColor="blue"
                />
              </Card>
            </Col>
          </Row>

          <Button
            type="primary"
            onClick={fetchMonitoringOverview}
            style={{ marginTop: "16px" }}
          >
            Refresh Overview
          </Button>
        </>
      )}
    </Card>
  );
};

export default ExporterMonitoring;
