import React, { useEffect, useState } from "react";
import { Table, Tag, Button, notification, Tabs, Modal, Input } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;

const { TabPane } = Tabs;

interface Shipment {
  shipmentId: string;
  declarationId: string;
  methodOfShipment: string;
  portOfDeparture: string;
  portOfDestination: string;
  departureDate: string;
  arrivalDate: string;
  paymentStatus: string;
  userName?: string;
  userRole?: string;
  declarationStatus?: string;
  shipmentStatus?: string;
  completedDate?: string;
}

const CustomsOfficerShipmentPermission: React.FC = () => {
  const [pendingShipments, setPendingShipments] = useState<Shipment[]>([]);
  const [runningShipments, setRunningShipments] = useState<Shipment[]>([]);
  const [rejectedShipments, setRejectedShipments] = useState<Shipment[]>([]);
  const [completeShipments, setCompleteShipments] = useState<Shipment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const [pending, running, rejected, complete] = await Promise.all([
        fetch("https://localhost:7232/api/CMS/PendingShipments").then((res) =>
          res.json()
        ),
        fetch("https://localhost:7232/api/CMS/GetRunningShipments").then(
          (res) => res.json()
        ),
        fetch("https://localhost:7232/api/CMS/GetRejectedShipments").then(
          (res) => res.json()
        ),
        fetch("https://localhost:7232/api/CMS/GetCompleteShipments").then(
          (res) => res.json()
        ),
      ]);

      setPendingShipments(pending);
      setRunningShipments(running);
      setRejectedShipments(rejected);
      setCompleteShipments(complete);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  const approveShipment = async (shipmentId: string) => {
    try {
      const response = await fetch(
        `https://localhost:7232/api/CMS/ApproveShipment/${shipmentId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        notification.success({ message: "Shipment approved." });
        fetchShipments(); // Refresh the data
      } else {
        const errorText = await response.text();
        notification.error({ message: errorText });
      }
    } catch (error) {
      console.error("Error approving shipment:", error);
    }
  };
  const completedShipment = async (shipmentId: string) => {
    try {
      const response = await fetch(
        `https://localhost:7232/api/CMS/CompletedShipment/${shipmentId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        notification.success({ message: "Shipment completed." });
        fetchShipments(); // Refresh the data
      } else {
        const errorText = await response.text();
        notification.error({ message: errorText });
      }
    } catch (error) {
      console.error("Error completed shipment:", error);
    }
  };
  const rejectShipment = async (shipmentId: string) => {
    try {
      const response = await fetch(
        `https://localhost:7232/api/CMS/RejectShipment/${shipmentId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        notification.success({ message: "Shipment rejected." });
        fetchShipments(); // Refresh the data
      } else {
        notification.error({ message: "Failed to reject shipment." });
      }
    } catch (error) {
      console.error("Error rejecting shipment:", error);
    }
  };

  const revertShipment = async (shipmentId: string) => {
    try {
      const response = await fetch(
        `https://localhost:7232/api/CMS/RevertShipmentToPending/${shipmentId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        notification.success({ message: "Shipment reverted to pending." });
        fetchShipments(); // Refresh the data
      } else {
        notification.error({ message: "Failed to revert shipment." });
      }
    } catch (error) {
      console.error("Error reverting shipment:", error);
      notification.error({ message: "An error occurred." });
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filterShipments = (shipments: Shipment[]) => {
    return shipments.filter((shipment) => {
      const searchLower = searchQuery.toLowerCase();

      // Safely access properties and convert to lowercase or use empty string
      const userName = shipment.userName ? shipment.userName.toLowerCase() : "";
      const methodOfShipment = shipment.methodOfShipment
        ? shipment.methodOfShipment.toLowerCase()
        : "";
      const portOfDeparture = shipment.portOfDeparture
        ? shipment.portOfDeparture.toLowerCase()
        : "";
      const portOfDestination = shipment.portOfDestination
        ? shipment.portOfDestination.toLowerCase()
        : "";

      return (
        String(shipment.shipmentId).includes(searchLower) ||
        String(shipment.declarationId).includes(searchLower) ||
        methodOfShipment.includes(searchLower) ||
        portOfDeparture.includes(searchLower) ||
        portOfDestination.includes(searchLower) ||
        userName.includes(searchLower)
      );
    });
  };

  const calculateRunningTime = (departureDate: string): string => {
    const now = new Date();
    const departure = new Date(departureDate);
    const diffTime = Math.abs(now.getTime() - departure.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day(s)`;
  };
  const showRevertConfirm = (shipmentId: string) => {
    confirm({
      title: "Are you sure you want to revert this shipment to pending?",
      content: "This action will move the rejected shipment back to pending.",
      okText: "Yes",
      cancelText: "No",
      onOk: () => revertShipment(shipmentId), // Call revert function if confirmed
    });
  };

  const showConfirm = (shipmentId: string) => {
    confirm({
      title: "Are you sure you want to complete this shipment?",
      content:
        "This action will move the Completed shipment. Also Send a Email to Collect their product",
      okText: "Yes",
      cancelText: "No",
      onOk: () => completedShipment(shipmentId),
    });
  };

  const activeTabStyle = {
    color: "#FF5722",
    borderBottom: "2px solid #FF5722",
  };

  const tabPaneStyle = {
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "4px",
  };
  const commonColumns = [
    {
      title: "Shipment ID",
      dataIndex: "shipmentId",
      key: "shipmentId",
      width: "120px",
    },
    {
      title: "Declaration ID",
      dataIndex: "declarationId",
      key: "declarationId",
      width: "120px",
    },

    {
      title: "Port of Departure",
      dataIndex: "portOfDeparture",
      key: "portOfDeparture",
      width: "150px",
    },
    {
      title: "Port of Destination",
      dataIndex: "portOfDestination",
      key: "portOfDestination",
      width: "150px",
    },
    {
      title: "Arrival Date",
      dataIndex: "arrivalDate",
      key: "arrivalDate",
      width: "130px",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      key: "departureDate",
      width: "130px",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },

    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <Tag color={status === "Completed" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Shipment Status",
      dataIndex: "shipmentStatus",
      key: "shipmentStatus",
      width: "120px",
      render: (status: string) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Approved"
              ? "yellow"
              : status === "Pending"
              ? "#a83632"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];
  return (
    <>
      <Input
        placeholder="Search shipments..."
        value={searchQuery}
        onChange={handleSearch}
        style={{
          marginBottom: "20px",
          width: "30%", // Increased width for better visibility
          borderRadius: "5px", // Added border radius for a smoother look
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
        prefix={<SearchOutlined />}
      />
      <Tabs defaultActiveKey="1">
        <TabPane
          tab="Pending Shipments"
          key="1"
          className="p-5 bg-gray-100 rounded shadow-md" // Tailwind classes
        >
          <Table
            columns={[
              ...commonColumns,
              {
                title: "User Name", // Added userName column
                dataIndex: "userName",
                key: "userName",
                width: "150px",
              },
              {
                title: "User Role", // Added userRole column
                dataIndex: "userRole",
                key: "userRole",
                width: "150px",
                render: (role: string) => {
                  let color = "";
                  switch (role) {
                    case "Importer":
                      color = "blue";
                      break;
                    case "Exporter":
                      color = "green";
                      break;

                    default:
                      color = "gray";
                  }
                  return <Tag color={color}>{role}</Tag>;
                },
              },

              {
                title: "Actions",
                key: "actions",
                render: (_: any, record: Shipment) => (
                  <span>
                    <Button
                      type="primary"
                      onClick={() => approveShipment(record.shipmentId)}
                      disabled={record.paymentStatus !== "Completed"}
                      icon={<CheckCircleOutlined />}
                      style={{ width: "100%" }}
                    >
                      Approve
                    </Button>
                    <Button
                      type="primary"
                      danger
                      style={{ marginTop: "2px", width: "100%" }}
                      onClick={() => rejectShipment(record.shipmentId)}
                      icon={<CloseCircleOutlined />}
                    >
                      Reject
                    </Button>
                  </span>
                ),
              },
            ]}
            dataSource={filterShipments(pendingShipments)} // Filtered data
            rowKey="shipmentId"
            pagination={false}
            scroll={{ x: true }}
          />
        </TabPane>
        <TabPane
          tab="Running Shipments"
          key="2"
          className="p-5 bg-gray-100 rounded shadow-md" // Tailwind classes
        >
          <Table
            dataSource={filterShipments(
              runningShipments.map((shipment) => ({
                ...shipment,
                runningTime: calculateRunningTime(shipment.departureDate),
              }))
            )}
            columns={[
              ...commonColumns,
              {
                title: "Running Time",
                dataIndex: "runningTime",
                key: "runningTime",
                width: "120px",
              },

              {
                title: "Actions",
                key: "actions",
                render: (_: any, record: Shipment) => (
                  <Button
                    type="primary"
                    onClick={() => showConfirm(record.shipmentId)}
                    icon={<CheckCircleOutlined />}
                  >
                    Complete
                  </Button>
                ),
              },
            ]}
            rowKey="shipmentId"
            pagination={false}
            scroll={{ x: true }}
          />
        </TabPane>
        <TabPane
          tab={<span style={{}}>Complete Shipments</span>}
          key="3"
          className="p-5 bg-gray-100 rounded shadow-md" // Tailwind classes
        >
          <Table
            dataSource={filterShipments(completeShipments)}
            columns={[
              ...commonColumns,
              {
                title: "Completed Date",
                dataIndex: "completedDate",
                key: "completedDate",
                render: (completedDate: string | null, record) => {
                  const departureDate = new Date(record.departureDate);
                  const formattedCompletedDate = completedDate
                    ? new Date(completedDate).toLocaleDateString()
                    : "N/A";

                  if (!completedDate) {
                    return "N/A";
                  }

                  const isLate = new Date(completedDate) > departureDate;

                  return (
                    <Tag color={isLate ? "red" : "green"}>
                      {formattedCompletedDate}
                    </Tag>
                  );
                },
              },
            ]}
            rowKey="shipmentId"
            pagination={false}
            scroll={{ x: true }}
          />
        </TabPane>
        <TabPane
          tab="Rejected Shipments"
          key="4"
          className="p-5 bg-gray-100 rounded shadow-md" //
        >
          <Table
            dataSource={filterShipments(rejectedShipments)} // Filtered data
            columns={[
              ...commonColumns,
              {
                title: "Actions",
                key: "actions",
                render: (_: any, record: Shipment) => (
                  <Button
                    type="primary"
                    onClick={() => showRevertConfirm(record.shipmentId)}
                    icon={<CheckCircleOutlined />}
                  >
                    Revert to Pending
                  </Button>
                ),
              },
            ]}
            rowKey="shipmentId"
            pagination={false}
            scroll={{ x: true }}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default CustomsOfficerShipmentPermission;
