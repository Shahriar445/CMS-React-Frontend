import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select, Form, Button, message as AntMessage } from "antd";

const { Option } = Select;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("https://localhost:7232/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: values.username,
          password: values.password,
          role: values.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and other user details in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("role", data.role);

        // Redirect based on user role
        switch (data.role.toLowerCase()) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "importer":
            navigate("/importer/dashboard");
            break;
          case "exporter":
            navigate("/exporter/dashboard");
            break;
          case "customs officer":
            navigate("/customs-officer/dashboard");
            break;
          default:
            AntMessage.error("Unknown role");
            break;
        }
      } else {
        // Handle login error
        AntMessage.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      AntMessage.error("An error occurred during login");
    }
  };

  return (
    <div>
      <Form onFinish={handleSubmit} initialValues={{ role }}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select value={role} onChange={(value) => setRole(value)}>
            <Option value="admin">Admin</Option>
            <Option value="importer">Importer</Option>
            <Option value="exporter">Exporter</Option>
            <Option value="customs officer">Customs Officer</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
