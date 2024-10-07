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
  Tabs,
} from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import "../../style/exporter.css";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
interface MonitoringData {
  shipmentsProcessed: number;
  shipmentPending: number;
  currentStatus: string;
  customsClearanceRate: number;
}
interface EmailNotification {
  id: number;
  subject: string;
  body: string;
  sentAt: string;
}

const ExporterMonitoring: React.FC = () => {
  const [data, setData] = useState<MonitoringData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<EmailNotification[]>([]);

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
  const fetchEmailNotifications = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User Id not found in local storage");
      }
      const response = await fetch(
        `https://localhost:7232/api/CMS/GetUserEmails/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch email notifications");
      }
      const result: EmailNotification[] = await response.json();
      setEmails(result);
    } catch (error) {
      message.error("Error fetching email notifications: " + error.message);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoringOverview();
    fetchEmailNotifications();
  }, []);

  // Function to sanitize HTML content
  const sanitizeHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  };
  return (
    <Card title="Monitoring Overview" style={{ margin: 0, padding: 0 }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
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

            <Row justify="center" style={{ marginTop: "16px" }}>
              <Col span={12} style={{ textAlign: "center" }}>
                <Card className="animated-card clearance-card">
                  <BarChartOutlined
                    style={{ fontSize: "24px", color: "blue" }}
                  />
                  <Title level={4} style={{ marginTop: "8px" }}>
                    Clearance Rate
                  </Title>
                  <Progress
                    id="customs-clearance"
                    type="circle"
                    percent={
                      data
                        ? parseFloat(data.customsClearanceRate.toFixed(2))
                        : 0
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
          </TabPane>

          <TabPane tab="Email Notifications" key="2">
            <Card style={{ marginTop: "16px" }}>
              {emails.length === 0 ? (
                <Text>No email notifications available.</Text>
              ) : (
                emails.map((email) => (
                  <Card key={email.id} style={{ marginBottom: "16px" }}>
                    <Title level={4}>{email.subject}</Title>
                    <Text>{sanitizeHtml(email.body)}</Text>
                    <br />
                    <Text type="secondary">
                      {email.sentAt
                        ? new Date(email.sentAt).toLocaleString("en-BD", {
                            timeZone: "Asia/Dhaka",
                          })
                        : "N/A"}
                    </Text>
                  </Card>
                ))
              )}
            </Card>
          </TabPane>
        </Tabs>
      )}
    </Card>
  );
};

export default ExporterMonitoring;
