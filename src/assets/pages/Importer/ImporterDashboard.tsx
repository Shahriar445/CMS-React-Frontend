import React, { useEffect, useState } from "react";
import { Card, Statistic, Row, Col, message } from "antd";
import {
  DollarCircleOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { Bar } from "@ant-design/charts";

interface DashboardData {
  totalDeclarations: number;
  pendingPayments: number;
  shipmentMonitoring: number;
  totalRunningShipmet: number;
  totalCompletedShipment: number;
  totalRejectedShipment: number;
  totalPendingShipment: number;
}

const ImporterDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get userId from local storage
        if (!userId) {
          message.error("User ID not found.");
          return;
        }

        const response = await fetch(
          `https://localhost:7232/api/CMS/dashboardOverview/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (error: any) {
        console.error("Error fetching dashboard data:", error.message);
        message.error("Error fetching dashboard data.");
        setDashboardData(null);
      }
    };

    fetchDashboardData();
  }, []);

  const clearancePercentage = dashboardData
    ? (dashboardData.totalCompletedShipment / dashboardData.totalDeclarations) *
      100
    : 0;
  const rejectionPercentage = dashboardData
    ? (dashboardData.totalRejectedShipment / dashboardData.totalDeclarations) *
      100
    : 0;

  const chartData = [
    {
      type: "Completed",
      value: dashboardData ? dashboardData.totalCompletedShipment : 0,
    },
    {
      type: "Rejected",
      value: dashboardData ? dashboardData.totalRejectedShipment : 0,
    },
    {
      type: "Running",
      value: dashboardData ? dashboardData.totalRunningShipmet : 0,
    },
    {
      type: "Pending",
      value: dashboardData ? dashboardData.totalPendingShipment : 0,
    },
  ];
  const chartConfig = {
    data: chartData,
    xField: "value",
    yField: "type",
    colorField: "type",
    color: ({ type }: any) => {
      switch (type) {
        case "Completed":
          return "#1890ff";
        case "Rejected":
          return "#ff4d4f";
        case "Running":
          return "#f5222d";
        case "Pending":
          return "#faad14";
        default:
          return "#000";
      }
    },
    barWidthRatio: 0.4,
  };
  return (
    <Card title="Dashboard Overview">
      <Row gutter={16}>
        <Col span={8}>
          <Card
            style={{ backgroundColor: "#f0f6ff", borderColor: "#91d5ff" }}
            bordered={false}
          >
            <Statistic
              title="Total Declarations"
              value={dashboardData ? dashboardData.totalDeclarations : "N/A"}
              valueStyle={{ color: "#1890ff" }}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ backgroundColor: "#fff7e6", borderColor: "#ffc069" }}
            bordered={false}
          >
            <Statistic
              title="Pending Payments"
              value={dashboardData ? dashboardData.pendingPayments : "N/A"}
              valueStyle={{ color: "#fa8c16" }}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ backgroundColor: "#f6ffed", borderColor: "#b7eb8f" }}
            bordered={false}
          >
            <Statistic
              title="Shipments Monitored"
              value={dashboardData ? dashboardData.shipmentMonitoring : "N/A"}
              valueStyle={{ color: "#52c41a" }}
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card
            style={{ backgroundColor: "#fff2f0", borderColor: "#ffccc7" }}
            bordered={false}
          >
            <Statistic
              title="Running Shipments"
              value={
                dashboardData ? dashboardData.totalCompletedShipment : "N/A"
              }
              valueStyle={{ color: "#f5222d" }}
              prefix={<SyncOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ backgroundColor: "#e6f7ff", borderColor: "#91d5ff" }}
            bordered={false}
          >
            <Statistic
              title="Completed Shipments"
              value={
                dashboardData ? dashboardData.totalCompletedShipment : "N/A"
              }
              valueStyle={{ color: "#1890ff" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ backgroundColor: "#fff1f0", borderColor: "#ff7875" }}
            bordered={false}
          >
            <Statistic
              title="Rejected Shipments"
              value={
                dashboardData ? dashboardData.totalRejectedShipment : "N/A"
              }
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card
            style={{ backgroundColor: "#fffbe6", borderColor: "#ffe58f" }}
            bordered={false}
          >
            <Statistic
              title="Total Pending Shipments"
              value={dashboardData ? dashboardData.totalPendingShipment : "N/A"}
              valueStyle={{ color: "#faad14" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>{" "}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Shipment Status Distribution" bordered={false}>
            <Bar {...chartConfig} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ImporterDashboard;
