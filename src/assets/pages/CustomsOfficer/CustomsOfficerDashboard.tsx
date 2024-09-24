import React, { useEffect, useState } from 'react';
import { Card, Col, Row, message } from 'antd';
import { FileOutlined, HourglassOutlined, TruckOutlined } from '@ant-design/icons';

interface SummaryData {
  totalDeclarations: number;
  pendingShipments: number;
  runningShipments: number;
}

const CustomsOfficerDashboard: React.FC = () => {
  const [exporterSummary, setExporterSummary] = useState<SummaryData | null>(null);
  const [importerSummary, setImporterSummary] = useState<SummaryData | null>(null);

  const fetchSummaryData = async (apiUrl: string, role: 'exporter' | 'importer') => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (role === 'exporter') {
        setExporterSummary(data);
      } else {
        setImporterSummary(data);
      }
    } catch (error) {
      console.error(`Error fetching ${role} summary data:`, error);
      message.error(`Error fetching ${role} summary data.`);
    }
  };

  useEffect(() => {
    fetchSummaryData('https://localhost:7232/api/CMS/exporter-summary', 'exporter');
    fetchSummaryData('https://localhost:7232/api/CMS/importer-summary', 'importer');
  }, []);

  return (
    <>
      <main>
       
        <div className="container">
          <Card title='Exporter Summary'>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <FileOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  <h3>Total Declarations</h3>
                  <p>{exporterSummary ? exporterSummary.totalDeclarations : 'Loading...'}</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <HourglassOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                  <h3>Pending Shipments</h3>
                  <p>{exporterSummary ? exporterSummary.pendingShipments : 'Loading...'}</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <TruckOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                  <h3>Running Shipments</h3>
                  <p>{exporterSummary ? exporterSummary.runningShipments : 'Loading...'}</p>
                </Card>
              </Col>
            </Row>
            </Card>
            <Card title='Importer Summary'>
            
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <FileOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  <h3>Total Declarations</h3>
                  <p>{importerSummary ? importerSummary.totalDeclarations : 'Loading...'}</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <HourglassOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                  <h3>Pending Shipments</h3>
                  <p>{importerSummary ? importerSummary.pendingShipments : 'Loading...'}</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <TruckOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                  <h3>Running Shipments</h3>
                  <p>{importerSummary ? importerSummary.runningShipments : 'Loading...'}</p>
                </Card>
              </Col>
              </Row>
              </Card>
          
        </div>
      </main>
    </>
  );
};

export default CustomsOfficerDashboard;
