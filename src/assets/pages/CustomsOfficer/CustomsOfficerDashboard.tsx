import React, { useEffect, useState } from "react";
import { Card, Col, Row, Progress } from "antd";
import {
  FileOutlined,
  HourglassOutlined,
  TruckOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface SummaryData {
  totalDeclarations: number;
  pendingShipments: number;
  runningShipments: number;
  completedShipments: number;
}

const CustomsOfficerDashboard: React.FC = () => {
  const [exporterSummary, setExporterSummary] = useState<SummaryData | null>(
    null
  );
  const [importerSummary, setImporterSummary] = useState<SummaryData | null>(
    null
  );

  const fetchSummaryData = async (
    apiUrl: string,
    role: "exporter" | "importer"
  ) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }
      const data = await response.json();
      if (role === "exporter") {
        setExporterSummary(data);
      } else {
        setImporterSummary(data);
      }
    } catch (error) {
      console.error(`Error fetching ${role} summary data:`, error);
    }
  };

  useEffect(() => {
    fetchSummaryData(
      "https://localhost:7232/api/CMS/exporter-summary",
      "exporter"
    );
    fetchSummaryData(
      "https://localhost:7232/api/CMS/importer-summary",
      "importer"
    );
  }, []);

  const calculatePercentage = (completed: number, total: number) => {
    return total ? Math.round((completed / total) * 100) : 0;
  };

  const totalStyle: React.CSSProperties = {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1890ff",
    textAlign: "center",
  };

  const headerStyles = {
    totalDeclarations: { backgroundColor: "#e6f7ff" },
    pendingShipments: { backgroundColor: "#fffbe6" },
    runningShipments: { backgroundColor: "#f6ffed" },
    completedShipments: { backgroundColor: "#e6fffb" },
  };

  // Prepare data for the chart
  const chartData = [
    {
      name: "Total Declarations",
      totalDeclarations: exporterSummary?.totalDeclarations || 0,
      pendingShipments: exporterSummary?.pendingShipments || 0,
      runningShipments: exporterSummary?.runningShipments || 0,
      completedShipments: exporterSummary?.completedShipments || 0,
    },
  ];

  const chartDataImporter = [
    {
      name: "Total Declarations",
      totalDeclarations: importerSummary?.totalDeclarations || 0,
      pendingShipments: importerSummary?.pendingShipments || 0,
      runningShipments: importerSummary?.runningShipments || 0,
      completedShipments: importerSummary?.completedShipments || 0,
    },
  ];

  const colors = ["#1890ff", "#52c41a", "#faad14", "#eb2f96", "#13c2c2"];

  return (
    <main>
      <div className="container">
        <Card
          title={
            <div style={{ textAlign: "center" }}>
              <h2 style={{ margin: 0, color: "#1890ff" }}>Exporter Summary</h2>
            </div>
          }
          size="small"
        >
          <Row gutter={16}>
            <Col span={6}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  ...headerStyles.totalDeclarations,
                }}
              >
                <FileOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                <h3 style={{ fontSize: "16px" }}>Total Declarations</h3>
                <p style={totalStyle}>
                  {exporterSummary
                    ? exporterSummary.totalDeclarations
                    : "Loading..."}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  ...headerStyles.pendingShipments,
                }}
              >
                <HourglassOutlined
                  style={{ fontSize: "24px", color: "#faad14" }}
                />
                <h3 style={{ fontSize: "16px" }}>Pending Shipments</h3>
                <p style={totalStyle}>
                  {exporterSummary
                    ? exporterSummary.pendingShipments
                    : "Loading..."}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  ...headerStyles.runningShipments,
                }}
              >
                <TruckOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
                <h3 style={{ fontSize: "16px" }}>Running Shipments</h3>
                <p style={totalStyle}>
                  {exporterSummary
                    ? exporterSummary.runningShipments
                    : "Loading..."}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  ...headerStyles.completedShipments,
                }}
              >
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: "#13c2c2" }}
                />
                <h3 style={{ fontSize: "16px" }}>Completed Shipments</h3>
                <p style={totalStyle}>
                  {exporterSummary
                    ? exporterSummary.completedShipments
                    : "Loading..."}
                </p>
                <Progress
                  percent={calculatePercentage(
                    exporterSummary?.completedShipments || 0,
                    exporterSummary?.totalDeclarations || 0
                  )}
                  status="active"
                  strokeColor="#52c41a"
                />
              </Card>
            </Col>
          </Row>
        </Card>

        <Card
          title={
            <div style={{ textAlign: "center" }}>
              <h2 style={{ margin: 0, color: "#1890ff" }}>Importer Summary</h2>
            </div>
          }
          size="small"
        >
          <Row gutter={16}>
            <Col span={6}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  ...headerStyles.totalDeclarations,
                }}
              >
                <FileOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                <h3 style={{ fontSize: "16px" }}>Total Declarations</h3>
                <p style={totalStyle}>
                  {importerSummary
                    ? importerSummary.totalDeclarations
                    : "Loading..."}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  ...headerStyles.pendingShipments,
                }}
              >
                <HourglassOutlined
                  style={{ fontSize: "24px", color: "#faad14" }}
                />
                <h3 style={{ fontSize: "16px" }}>Pending Shipments</h3>
                <p style={totalStyle}>
                  {importerSummary
                    ? importerSummary.pendingShipments
                    : "Loading..."}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  ...headerStyles.runningShipments,
                }}
              >
                <TruckOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
                <h3 style={{ fontSize: "16px" }}>Running Shipments</h3>
                <p style={totalStyle}>
                  {importerSummary
                    ? importerSummary.runningShipments
                    : "Loading..."}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  ...headerStyles.completedShipments,
                }}
              >
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: "#13c2c2" }}
                />
                <h3 style={{ fontSize: "16px" }}>Completed Shipments</h3>
                <p style={totalStyle}>
                  {importerSummary
                    ? importerSummary.completedShipments
                    : "Loading..."}
                </p>
                <Progress
                  percent={calculatePercentage(
                    importerSummary?.completedShipments || 0,
                    importerSummary?.totalDeclarations || 0
                  )}
                  status="active"
                  strokeColor="#52c41a"
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Chart Section */}
        <Card>
          <Row>
            <BarChart width={600} height={300} data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />

              <Bar
                dataKey="totalDeclarations"
                fill={colors[0]}
                name="Total Declarations"
              />
              <Bar
                dataKey="pendingShipments"
                fill={colors[1]}
                name="Pending Shipments"
              />
              <Bar
                dataKey="runningShipments"
                fill={colors[2]}
                name="Running Shipments"
              />
              <Bar
                dataKey="completedShipments"
                fill={colors[3]}
                name="Completed Shipments"
              />
            </BarChart>
            <BarChart width={600} height={300} data={chartDataImporter}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />

              {/* Create a separate Bar for each type of shipment */}
              <Bar
                dataKey="totalDeclarations"
                fill={colors[0]}
                name="Total Declarations"
              />
              <Bar
                dataKey="pendingShipments"
                fill={colors[1]}
                name="Pending Shipments"
              />
              <Bar
                dataKey="runningShipments"
                fill={colors[2]}
                name="Running Shipments"
              />
              <Bar
                dataKey="completedShipments"
                fill={colors[3]}
                name="Completed Shipments"
              />
            </BarChart>
          </Row>
        </Card>
      </div>
    </main>
  );
};

export default CustomsOfficerDashboard;
