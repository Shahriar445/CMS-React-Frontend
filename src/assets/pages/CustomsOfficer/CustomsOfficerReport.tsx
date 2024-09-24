import React, { useEffect, useState } from 'react';
import { Table, Button, notification, DatePicker, Tag } from 'antd';
import { DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import '../../style/print.css'; // Import the print stylesheet
import moment from 'moment'; // Ensure moment is imported

interface ReportItem {
    declarationId: string;
    userName: string;
    roleName: string;
    declarationDate: string; // Make sure this is in ISO format
    status: string;
    amount: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

const CustomsOfficerReport: React.FC = () => {
    const [reportData, setReportData] = useState<ReportItem[]>([]);
    const [filteredData, setFilteredData] = useState<ReportItem[]>([]);
    const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null); // Keep using Moment type for DatePicker

    useEffect(() => {
        fetchReportData();
    }, []);

    useEffect(() => {
        if (dateRange) {
            const [start, end] = dateRange;
            const filtered = reportData.filter(item => {
                const date = new Date(item.declarationDate); // Convert string to Date object
                return date >= start.toDate() && date <= end.toDate(); // Inclusive range
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(reportData);
        }
    }, [dateRange, reportData]);

    const fetchReportData = async () => {
        try {
            const response = await fetch('https://localhost:7232/Get-officer-report');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setReportData(data);
            setFilteredData(data); // Set initial filtered data
        } catch (error) {
            console.error('Error fetching report data:', error);
            notification.error({ message: 'Failed to fetch report data' });
        }
    };

    const downloadReport = () => {
        window.location.href = 'https://localhost:7232/download-report';
    };
const printReport = () => {
    const printContent = document.getElementById('printable-area')?.innerHTML; // Get content
    const printWindow = window.open('', '_blank');

    if (printWindow) {
        printWindow.document.write(`
            <html>
                <head>
                    <title>Officer Report</title>
                    <link rel="stylesheet" type="text/css" href="/style/print.css"> <!-- Adjust path if necessary -->
                    <style>
                        /* Additional styles can be added here for print layout */
                    </style>
                </head>
                <body>
                    <h2>Officer Report</h2>
                    <div>${printContent}</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        
        // Add a timeout to ensure the print dialog has enough time to open
        printWindow.onload = () => {
            printWindow.print();
            setTimeout(() => {
                printWindow.close();
            }, 100); // Adjust delay as necessary
        };
    } else {
        notification.error({ message: 'Unable to open print window' });
    }
};


    const columns = [
        {
            title: 'Declaration ID',
            dataIndex: 'declarationId',
            key: 'declarationId',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Role Name',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'Declaration Date',
            dataIndex: 'declarationDate',
            key: 'declarationDate',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'Approved' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => amount.toFixed(2),
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render: (unitPrice: number) => unitPrice.toFixed(2),
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice: number) => totalPrice.toFixed(2),
        },
    ];

    return (
        <div>
            <h2>Officer Report</h2>
            <DatePicker.RangePicker 
                onChange={(dates) => setDateRange(dates)} 
                style={{ marginBottom: '16px' }} 
            />
            <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={downloadReport}
                style={{ marginRight: '8px', marginBottom: '16px' }}
            >
                Download Report
            </Button>
            <Button
                type="default"
                icon={<PrinterOutlined />}
                onClick={printReport}
                style={{ marginBottom: '16px' }}
            >
                Print Report
            </Button>
            <div id="printable-area" className="printable-area">
                <Table dataSource={filteredData} columns={columns} rowKey="declarationId" />
            </div>
        </div>
    );
};

export default CustomsOfficerReport;
