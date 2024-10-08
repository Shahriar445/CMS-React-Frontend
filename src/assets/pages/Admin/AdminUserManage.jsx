import  { useEffect, useState } from 'react';
import { Layout, Typography, Table, Button, Tag, message,Tabs } from 'antd';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

const { Title } = Typography;

const UserManagement = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        fetchPendingUsers();
        fetchActiveUsers();
    }, []);

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const fetchPendingUsers = async () => {
        const token = getToken();
        if (!token) {
            message.error('You are not authorized to view this page. Please log in.');
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch('https://localhost:7232/api/CMS/pending', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch pending users');
            }

            const data = await response.json();
            setPendingUsers(data);
        } catch (error) {
            message.error(`Error fetching pending users: ${error.message}`);
        }
    };

    const fetchActiveUsers = async () => {
        const token = getToken();
        if (!token) {
            message.error('You are not authorized to view this page. Please log in.');
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch('https://localhost:7232/api/CMS/active', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch active users');
            }

            const data = await response.json();
            setActiveUsers(data);
        } catch (error) {
            message.error(`Error fetching active users: ${error.message}`);
        }
    };

    const approveUser = async (userId) => {
        const token = getToken();
        try {
            const response = await fetch(`https://localhost:7232/api/CMS/approve-user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: true }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve user');
            }

            message.success('User approved successfully');
            fetchPendingUsers();
            fetchActiveUsers();
        } catch (error) {
            message.error(`Error approving user: ${error.message}`);
        }
    };

    const stopUserRole = async (userId) => {
        const token = getToken();
        try {
            const response = await fetch(`https://localhost:7232/api/CMS/stop-role/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: false }),
            });

            if (!response.ok) {
                throw new Error('Failed to stop user role');
            }

            message.success('User role stopped successfully');
            fetchPendingUsers();
            fetchActiveUsers();
        } catch (error) {
            message.error(`Error stopping user role: ${error.message}`);
        }
    };

    const roleColorMap = {
        Exporter: 'blue',
        Importer: 'green',
        'Customs Officer': 'purple',
    };

    const pendingColumns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={roleColorMap[role] || 'default'}>
                    {role}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button onClick={() => approveUser(record.userId)} type="primary">
                    Approve
                </Button>
            ),
        },
    ];

    const activeColumns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={roleColorMap[role] || 'default'}>
                    {role}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button onClick={() => stopUserRole(record.userId)} type="default" danger>
                    StopRole
                </Button>
            ),
        },
    ];

    return (
       <Layout className="p-0">
      <Title className="text-center text-green-600" level={2}>
        <UserAddOutlined className="mr-2" />
        User Management
      </Title>

      <Tabs defaultActiveKey="1" >
        <TabPane
          tab={
            <span>
              <UsergroupAddOutlined className="mr-2" />
              Pending User Registrations
            </span>
          }
          key="1"
        >
          <section className="pending-users p-4 border border-gray-300 rounded-lg shadow-md my-6 bg-gray-50">
            <Table columns={pendingColumns} dataSource={pendingUsers} rowKey="userId" />
          </section>
        </TabPane>

        <TabPane
          tab={
            <span>
              <UsergroupAddOutlined className="mr-2" />
              Active Users
            </span>
          }
          key="2"
        >
          <section className="active-users p-4 border border-gray-300 rounded-lg shadow-md my-6 bg-gray-50">
            <Table columns={activeColumns} dataSource={activeUsers} rowKey="userId" />
          </section>
        </TabPane>
      </Tabs>
    </Layout>
    );
};

export default UserManagement;
