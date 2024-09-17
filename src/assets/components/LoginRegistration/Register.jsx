import React, { useState } from "react";
import { Form, Input, Button, Select, message as AntMessage } from "antd";

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("https://localhost:7232/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        AntMessage.success("Registration successful");
        form.resetFields(); // Reset form fields on success
      } else {
        AntMessage.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      AntMessage.error("An error occurred");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ role: "importer" }}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select>
            <Option value="importer">Importer</Option>
            <Option value="exporter">Exporter</Option>
            <Option value="customs officer">Customs Officer</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
