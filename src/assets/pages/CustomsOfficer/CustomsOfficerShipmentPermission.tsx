import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

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
}

const CustomsOfficerShipmentPermission: React.FC = () => {
    const [pendingShipments, setPendingShipments] = useState<Shipment[]>([]);
    const [runningShipments, setRunningShipments] = useState<Shipment[]>([]);
    const [rejectedShipments, setRejectedShipments] = useState<Shipment[]>([]);
    const [completeShipments, setCompleteShipments] = useState<Shipment[]>([]);

    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = async () => {
        try {
            const [pending, running, rejected, complete] = await Promise.all([
                fetch("https://localhost:7232/api/CMS/PendingShipments").then(res => res.json()),
                fetch("https://localhost:7232/api/CMS/GetRunningShipments").then(res => res.json()),
                fetch("https://localhost:7232/api/CMS/GetRejectedShipments").then(res => res.json()),
                fetch("https://localhost:7232/api/CMS/GetCompleteShipments").then(res => res.json())
            ]);

            setPendingShipments(pending);
            setRunningShipments(running);
            setRejectedShipments(rejected);
            setCompleteShipments(complete);
        } catch (error) {
            console.error('Error fetching shipments:', error);
        }
    };

    const approveShipment = async (shipmentId: string) => {
        try {
            const response = await fetch(`https://localhost:7232/api/CMS/ApproveShipment/${shipmentId}`, {
                method: "POST",
            });

            if (response.ok) {
                notification.success({ message: 'Shipment approved.' });
                fetchShipments(); // Refresh the data
            } else {
                const errorText = await response.text();
                notification.error({ message: errorText });
            }
        } catch (error) {
            console.error('Error approving shipment:', error);
        }
    };

    const rejectShipment = async (shipmentId: string) => {
        try {
            const response = await fetch(`https://localhost:7232/api/CMS/RejectShipment/${shipmentId}`, {
                method: "POST",
            });

            if (response.ok) {
                notification.success({ message: 'Shipment rejected.' });
                fetchShipments(); // Refresh the data
            } else {
                notification.error({ message: 'Failed to reject shipment.' });
            }
        } catch (error) {
            console.error('Error rejecting shipment:', error);
        }
    };

    const calculateRunningTime = (departureDate: string): string => {
        const now = new Date();
        const departure = new Date(departureDate);
        const diffTime = Math.abs(now.getTime() - departure.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} day(s)`;
    };

    const columns = [
        {
            title: 'Shipment ID',
            dataIndex: 'shipmentId',
            key: 'shipmentId',
            width: '120px', // Fixed width for consistency
        },
        {
            title: 'Declaration ID',
            dataIndex: 'declarationId',
            key: 'declarationId',
            width: '120px', // Fixed width for consistency
        },
        {
            title: 'Method of Shipment',
            dataIndex: 'methodOfShipment',
            key: 'methodOfShipment',
            width: '150px', // Fixed width for consistency
        },
        {
            title: 'Port of Departure',
            dataIndex: 'portOfDeparture',
            key: 'portOfDeparture',
            width: '150px', // Fixed width for consistency
        },
        {
            title: 'Port of Destination',
            dataIndex: 'portOfDestination',
            key: 'portOfDestination',
            width: '150px', // Fixed width for consistency
        },
        {
            title: 'Departure Date',
            dataIndex: 'departureDate',
            key: 'departureDate',
            width: '130px', // Fixed width for consistency
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Arrival Date',
            dataIndex: 'arrivalDate',
            key: 'arrivalDate',
            width: '130px', // Fixed width for consistency
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status: string) => <Tag color={status === 'Completed' ? 'green' : 'red'}>{status}</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Shipment) => (
                <span>
                    <Button
                        type="primary"
                        onClick={() => approveShipment(record.shipmentId)}
                        disabled={record.paymentStatus !== "Completed"}
                        icon={<CheckCircleOutlined />}
                    >
                        Approve
                    </Button>
                    <Button
                  type="primary"
                  danger
                  style={{marginTop:'2px',width:'100%'}}
                        onClick={() => rejectShipment(record.shipmentId)}
                        icon={<CloseCircleOutlined />}
                    >
                        Reject
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <h2>Pending Shipments</h2>
            <Table 
                dataSource={pendingShipments} 
                columns={columns} 
                rowKey="shipmentId" 
                pagination={false}
                scroll={{ x: true }} // Enable horizontal scroll
            />

            <h2>Running Shipments</h2>
            <Table
                dataSource={runningShipments.map(shipment => ({
                    ...shipment,
                    runningTime: calculateRunningTime(shipment.departureDate),
                }))}
                columns={[
                    ...columns,
                    {
                        title: 'Running Time',
                        dataIndex: 'runningTime',
                        key: 'runningTime',
                        width: '120px', // Fixed width for consistency
                    },
                ]}
                rowKey="shipmentId"
                pagination={false}
                scroll={{ x: true }} // Enable horizontal scroll
            />

            <h2>Rejected Shipments</h2>
            <Table dataSource={rejectedShipments} columns={columns} rowKey="shipmentId" pagination={false} scroll={{ x: true }} />

            <h2>Complete Shipments</h2>
            <Table
                dataSource={completeShipments.map(shipment => ({
                    ...shipment,
                    userName: shipment.userName || 'N/A',
                    userRole: shipment.userRole || 'N/A',
                }))}
                columns={[
                    ...columns,
                    {
                        title: 'User Name',
                        dataIndex: 'userName',
                        key: 'userName',
                        width: '120px', // Fixed width for consistency
                    },
                    {
                        title: 'User Role',
                        dataIndex: 'userRole',
                        key: 'userRole',
                        width: '120px', // Fixed width for consistency
                    },
                ]}
                rowKey="shipmentId"
                pagination={false}
                scroll={{ x: true }} // Enable horizontal scroll
            />
        </div>
    );
};

export default CustomsOfficerShipmentPermission;
