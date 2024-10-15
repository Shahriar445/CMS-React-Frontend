import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  message,
  Tabs,
  Table,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
const { Option } = Select;
const { TabPane } = Tabs;

const AdminProductManagement = () => {
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("Authorization token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:7232/api/CMS/GetAllProduct",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Set fetched products to state
      } else {
        message.error("Failed to fetch products.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onAddFinish = async (values) => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("Authorization token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7232/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Product added successfully!");
        addForm.resetFields();
        fetchProducts(); // Refresh product list
      } else {
        const result = await response.json();
        message.error(result.message || "Failed to add product");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  // Function to update a product
  const onUpdateFinish = async (values) => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("Authorization token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7232/api/CMS/updateProduct/${values.priceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Product updated successfully!");
        updateForm.resetFields();
        fetchProducts(); // Refresh product list
      } else {
        const result = await response.json();
        message.error(result.message || "Failed to update product");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  // Function to delete a product
  const deleteProduct = async (priceId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("Authorization token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7232/api/CMS/deleteProduct/${priceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("Product deleted successfully!");
        fetchProducts(); // Refresh product list
      } else {
        const result = await response.json();
        message.error(result.message || "Failed to delete product");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "priceId",
      key: "priceId",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$ ${text}`, // Format price
    },
    {
      title: "HS Code",
      dataIndex: "hsCode",
      key: "hsCode",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            onClick={() => updateForm.setFieldsValue(record)}
            style={{ marginRight: 8 }}
          >
            <EditOutlined />
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deleteProduct(record.priceId)}
          >
            <DeleteOutlined />
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h2
        className="text-3xl font-bold text-white bg-blue-500 p-4 rounded-md flex items-center justify-center shadow-lg"
        style={{ marginBottom: "24px" }}
      >
        <ShoppingOutlined className="mr-2" /> {/* Icon added */}
        Product Management
      </h2>

      <Tabs
        defaultActiveKey="1"
        style={{
          backgroundColor: "#f9f9f9", // Background color for Tabs container
          borderRadius: "8px", // Smooth corners
          padding: "20px", // Add padding
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", // Slight shadow for depth
        }}
      >
        <TabPane
          tab={
            <span>
              <ShopOutlined /> Add Product
            </span>
          }
          key="1"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            form={addForm}
            layout="vertical"
            onFinish={onAddFinish}
            initialValues={{ category: "electronics" }}
          >
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select a category">
                <Option value="electronics">Electronics</Option>
                <Option value="clothing">Clothing</Option>
                <Option value="furniture">Furniture</Option>
                <Option value="food">Food</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Product Name"
              name="productName"
              rules={[
                { required: true, message: "Please enter the product name!" },
              ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please enter the product price!" },
              ]}
            >
              <InputNumber
                placeholder="Enter price"
                min={0}
                style={{ width: "100%" }}
                formatter={(value) => `$ ${value}`}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              label="HS Code"
              name="hsCode"
              rules={[{ required: true, message: "Please enter the HS Code!" }]}
            >
              <Input placeholder="Enter HS Code" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Add Product <ShopOutlined />
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined /> List Product
            </span>
          }
          key="2"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table columns={columns} dataSource={products} rowKey="priceId" />
        </TabPane>
        <TabPane
          tab={
            <span>
              <EditOutlined /> Update Product
            </span>
          }
          key="3"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form form={updateForm} layout="vertical" onFinish={onUpdateFinish}>
            <Form.Item
              label="Product ID"
              name="priceId"
              rules={[
                { required: true, message: "Please enter the Price ID!" },
              ]}
            >
              <Input disabled placeholder="Enter Price ID" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select a category">
                <Option value="electronics">Electronics</Option>
                <Option value="clothing">Clothing</Option>
                <Option value="furniture">Furniture</Option>
                <Option value="food">Food</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Product Name"
              name="productName"
              rules={[
                { required: true, message: "Please enter the product name!" },
              ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please enter the product price!" },
              ]}
            >
              <InputNumber
                placeholder="Enter price"
                min={0}
                style={{ width: "100%" }}
                formatter={(value) => `$ ${value}`}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              label="HS Code"
              name="hsCode"
              rules={[{ required: true, message: "Please enter the HS Code!" }]}
            >
              <Input placeholder="Enter HS Code" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Update Product <CheckOutlined />
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminProductManagement;
