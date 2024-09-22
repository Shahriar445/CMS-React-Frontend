import React, { useEffect, useState } from 'react';
import { Form, Select, Input, Button, DatePicker, Badge, Row, Col, Card } from 'antd';
import { InfoCircleOutlined, DollarOutlined, TagOutlined } from '@ant-design/icons';

const { Option } = Select;

const DeclarationForm: React.FC = () => {
    const [form] = Form.useForm(); // Initialize the form

    const [categories, setCategories] = useState<{ category: string; maxWeight: number; weightUnit: string; maxQuantity: number; }[]>([]);
    const [products, setProducts] =  useState<{ priceId: number; productName: string; price: number }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{category:string;maxWeight:number;weightUnit:string;maxQuantity:number}|undefined>(undefined);
    const [selectedProduct, setSelectedProduct] = useState<{ priceId: number; productName: string; price: number } | undefined>(undefined);
    const [countries, setCountries] = useState<string[]>([]);
    const [ports, setPorts] = useState<{ port: string; vat: number; tax: number }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
    const [totalPrice, setTotalPrice] = useState(0);
    const [vat, setVat] = useState(0);
    const [tax, setTax] = useState(0);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:7232/product-categories'); // Replace with your API endpoint
                const data = await response.json();
                const categoryData = data.map(item => ({
                    category: item.category,
                    maxWeight: item.maxWeight,
                    weightUnit: item.weightUnit,
                    maxQuantity: item.maxQuantity
                }));
                setCategories(categoryData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProductsByCategory = async (category: string) => {
            try {
                const response = await fetch(`https://localhost:7232/api/CMS/GetProductsByCategory?category=${category}`);
                const data = await response.json();
                setProducts(data.map(product => ({
                    priceId: product.priceId,
                    productName: product.productName,
                    price: product.price,
                    maxWeight: product.maxWeight, // Ensure these fields exist
                    maxQuantity: product.maxQuantity,
                    weightUnit: product.weightUnit
                })));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (selectedCategory) {
            fetchProductsByCategory(selectedCategory.category);
        } else {
            setProducts([]); // Reset products when no category is selected
        }
    }, [selectedCategory]);
    
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://localhost:7232/Getcountries');
            const data = await response.json();
            setCountries(data);
        };

        fetchCountries();
    }, []);
    useEffect(() => {
        const fetchPorts = async () => {
            if (selectedCountry) {
                const response = await fetch(`https://localhost:7232/country/${selectedCountry}`);
                const data = await response.json();
                setPorts(data);
            } else {
                setPorts([]); // Reset ports if no country is selected
            }
        };

        fetchPorts();
    }, [selectedCountry]);




    //function -----------------------------------------------
    const handleProductChange = (value: string) => {
        const product = products.find(product => product.productName === value);
        setSelectedProduct(product);
        if (product) {
            form.setFieldsValue({ productPrice: product.price });
            calculateTotalPrice(form.getFieldValue('productsQuantity'), product.price);

        } else {
            form.setFieldsValue({ productPrice: 0 });
        }
    };
    const handleCategoryChange = (value: string) => {
        const category = categories.find(cat => cat.category === value);
        if (category){
            setSelectedCategory(category); // Set the entire category object

        }
    };
    const validateQuantityAndWeight = (values: any) => {
        const errors: any = {};
        if (selectedCategory) {
            if (values.productsQuantity > selectedCategory.maxQuantity) {
                errors.productsQuantity = `Maximum quantity for ${selectedCategory.category} is ${selectedCategory.maxQuantity}.`;
            }
            if (values.productsWeight > selectedCategory.maxWeight) {
                errors.productsWeight = `Maximum weight for ${selectedCategory.category} is ${selectedCategory.maxWeight} ${selectedCategory.weightUnit}.`;
            }
        }
        return errors;
    };
    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
    };
    const handleQuantityChange = () => {
        const quantity = form.getFieldValue('productsQuantity');
        calculateTotalPrice(quantity, selectedProduct?.price);
    };
    // Handle port change
    const handlePortChange = () => {
        const selectedDeparturePort = form.getFieldValue('departurePort');
        const selectedDestinationPort = form.getFieldValue('destinationPort');
        const selectedPortDetails = ports.find(port => port.port === selectedDeparturePort || port.port === selectedDestinationPort);

        if (selectedPortDetails) {
            setVat(selectedPortDetails.vat);
            setTax(selectedPortDetails.tax);
        }
        calculateTotalPrice(form.getFieldValue('productsQuantity'), selectedProduct?.price);
    };
    const calculateTotalPrice = (quantity, productPrice) => {
        if (selectedProduct && quantity > 0 && productPrice) {
            const price = productPrice * quantity;
            const vatAmount = (price * vat) / 100;
            const taxAmount = (price * tax) / 100;
            const total = price + vatAmount + taxAmount;
            setTotalPrice(total);
            form.setFieldsValue({
                totalPrice: total,
                vat: vatAmount,
                tax: taxAmount,
            });
        } else {
            setTotalPrice(0);
            form.setFieldsValue({
                totalPrice: 0,
                vat: 0,
                tax: 0,
            });
        }
    };

    const onFinish =()=>{
console.log('ok')
    }
    return (
        <Card>
            <main className="form-container">
                <div className="form-section">
                    <h2>Declaration Form</h2>
                    <Form form={form} onFinish={onFinish} id="customs-form">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Category of products:"
                                    name="productsCategory"
                                    rules={[{ required: true, message: 'Please select a category!' }]}
                                >
                                    <Select
                                        placeholder="Select category"
                                        style={{ height: 28 }}
                                        onChange={handleCategoryChange}
                                        >
                                       {categories.map((cat) => (
                                                        <Option key={cat.category} value={cat.category}>
                                                                     {cat.category}
                                                         </Option>
                                                                         ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Product Name:"
                                    name="productsName"
                                    rules={[{ required: true, message: 'Please select a product!' }]}
                                >
                                   <Select
                                        placeholder="Select product"
                                        style={{ height: 28 }}
                                        onChange={handleProductChange}
                                    > {products.map((product) => (
                                            <Option key={product.priceId} value={product.productName}>
                                                {product.productName} - ${product.price}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Quantity:"
                                    name="productsQuantity"
                                    rules={[
                                        { required: true, message: 'Please enter the quantity!' },
                                    ]}                                >
                                    <Input
                         onChange={handleQuantityChange}

                                                                            onKeyUp={handleQuantityChange}

                                        type="number"
                                        style={{ height: 28 }}
                                        prefix={<TagOutlined />}
                                    />{selectedCategory && (
                                        <Badge count={`Max: ${selectedCategory.maxQuantity}`} style={{ backgroundColor: '#52c41a', marginLeft: 8 }} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Weight:"
                                    name="productsWeight"
                                    rules={[
                                        { required: true, message: 'Please enter the weight!' },
                                    ]}                                >
                                    <Input
                                        type="number"
                                        step="0.01"
                                        style={{ height: 28 }}
                                        prefix={<TagOutlined />}
                                    />
                                     {selectedCategory && (
                            <Badge count={`Max: ${selectedCategory.maxWeight} ${selectedCategory.weightUnit}`} style={{ backgroundColor: '#52c41a', marginLeft: 8 }} />
                        )}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Price:"
                                    name="productPrice"
                                >
                                    <Input
                                    value={selectedProduct?.price||0}
                                        readOnly
                                        style={{ height: 28 }}
                                        prefix={<DollarOutlined />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Shipment Method:"
                                    name="shipmentMethod"
                                    rules={[{ required: true, message: 'Please select a shipment method!' }]}
                                >
                                    <Select style={{ height: 28 }}>
                                        <Option value="air">Air</Option>
                                        <Option value="sea">Sea</Option>
                                        <Option value="land">Land</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Country of Origin:"
                                    name="countryOrigin"
                                    rules={[{ required: true, message: 'Please select a country!' }]}
                                >
                                    <Select placeholder="Select country" style={{ height: 28 }} onChange={handleCountryChange}
                                    >
                                    {countries.map((country) => (
                                            <Option key={country} value={country}>
                                                {country}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Port of Departure:"
                                    name="departurePort"
                                    rules={[{ required: true, message: 'Please select a port!' }]}
                                >
                                    <Select placeholder="Select port" style={{ height: 28 }} onChange={handlePortChange}>
                                    {ports.map((port) => (
                                            <Option key={port.port} value={port.port}>
                                                {port.port} (VAT: {port.vat}%, Tax: {port.tax})
                                            </Option>
                                        ))}                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Port of Destination:"
                                    name="destinationPort"
                                    rules={[{ required: true, message: 'Please select a port!' }]}
                                >
                                    <Select placeholder="Select port" style={{ height: 28 }}>
                                    {ports.map((port) => (
                                            <Option key={port.port} value={port.port}>
                                                {port.port} (VAT: {port.vat}%, Tax: {port.tax})
                                            </Option>
                                        ))}                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Expected Departure Date:"
                                    name="expectedDeparture"
                                    rules={[{ required: true, message: 'Please select a departure date!' }]}
                                >
                                    <DatePicker style={{ height: 28, width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item
                                    label="Expected Arrival Date:"
                                    name="expectedArrival"
                                    rules={[{ required: true, message: 'Please select an arrival date!' }]}
                                >
                                    <DatePicker style={{ height: 28, width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Total Price:" name="totalPrice">
                                <Input value={totalPrice} readOnly style={{ height: 28 }} prefix={<DollarOutlined />} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <fieldset>
                            <legend>Price Details</legend>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item label="VAT:" name="vat">
                                    <Input value={form.getFieldValue('vat')} readOnly style={{ height: 28 }} prefix={<DollarOutlined />} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Tax:" name="tax">
                                    <Input value={form.getFieldValue('tax')} readOnly style={{ height: 28 }} prefix={<DollarOutlined />} />

                                    </Form.Item>
                                </Col>
                            </Row>
                            
                        </fieldset>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit Declaration
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </Card>
    );
};

export default DeclarationForm;
