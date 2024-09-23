import React, { useEffect, useState } from 'react';
import { Select, Button, Table, message,Popconfirm } from 'antd';

const { Option } = Select;

const PaymentComponent: React.FC = () => {
    const [declarations, setDeclarations] = useState<any[]>([]);
    const [selectedDeclaration, setSelectedDeclaration] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            showError('User ID not found in local storage');
            return;
        }
        loadDeclarations(userId);
    }, []);

    const loadDeclarations = async (userId: string) => {
        try {
            const response = await fetch(`https://localhost:7232/api/CMS/GetDeclarationsByUserIdImporter/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch declarations');
            }
            const data = await response.json();
            setDeclarations(data);
            setLoading(false);
        } catch (error) {
            showError('Error fetching declarations. Please try again later.');
            console.error('Error fetching declarations:', error);
            setLoading(false);
        }
    };

    const initiatePayment = async () => {
        if (!selectedDeclaration) {
            showError('No declaration selected');
            return;
        }

        try {
            const returnUrl = `${window.location.origin}${window.location.pathname}`;
            const payload = { declarationId: selectedDeclaration, returnUrl };

            const response = await fetch('https://localhost:7232/api/Payment/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to initiate payment: ${response.status} ${response.statusText}. ${errorText}`);
            }

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                showError('Payment URL not received');
                console.error('Payment URL not received:', data);
            }
        } catch (error) {
            showError('Error initiating payment. Please try again later.');
            console.error('Error initiating payment:', error);
        }
    };

    const showError = (message: string) => {
        message.error(`Error: ${message}`);
    };

    const handlePaymentSuccess = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const transactionId = urlParams.get('transactionId');
        const declarationId = urlParams.get('declarationId');

        if (transactionId && declarationId) {
            localStorage.setItem('paymentSuccess', 'true');
            localStorage.setItem('transactionId', transactionId);
            window.history.replaceState({}, document.title, window.location.pathname);
            setTimeout(() => {
                const returnUrl = localStorage.getItem('returnUrl');
                localStorage.removeItem('returnUrl');
                window.location.href = returnUrl || '/';
            }, 5000);
        }
    };

    const showPaymentSuccessNotification = () => {
        const paymentSuccess = localStorage.getItem('paymentSuccess');
        const transactionId = localStorage.getItem('transactionId');

        if (paymentSuccess && transactionId) {
            message.success(`Payment successful! Your transaction ID is ${transactionId}.`);
            localStorage.removeItem('paymentSuccess');
            localStorage.removeItem('transactionId');
        }
    };

    useEffect(() => {
        showPaymentSuccessNotification();
        handlePaymentSuccess();
    }, []);

    const columns = [
        {
            title: 'Declaration ID',
            dataIndex: 'declarationId',
            key: 'declarationId',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text: any) => (text !== null ? text : 'N/A'),
        },
    ];

    const dataSource = declarations.flatMap(declaration => 
        declaration.products.map(product => ({
            declarationId: declaration.declarationId,
            productName: product.productName,
            totalPrice: product.totalPrice,
        }))
    );

    return (
        <div>
            <Select
                id="declaration-select"
                placeholder="Select your declaration"
                onChange={value => setSelectedDeclaration(value)}
                style={{ width: 200, marginBottom: 16 }}
                disabled={loading}
            >
                {declarations.map(declaration => (
                    <Option key={declaration.declarationId} value={declaration.declarationId}>
                        Declaration {declaration.declarationId}
                    </Option>
                ))}
            </Select>
            <Button
                id="pay-now"
                disabled={!selectedDeclaration}
>
    <Popconfirm
        title="Are you sure you want to proceed with the payment?"
        onConfirm={initiatePayment}
        okText="Yes"
        cancelText="No"
    >
        <span>Pay Now</span>
    </Popconfirm>
</Button>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey="declarationId"
                loading={loading}
                style={{ marginTop: 16 }}
            />
        </div>
    );
};

export default PaymentComponent;
