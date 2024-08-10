import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons'; // Import icons
import authService from '../../services/authService';
import './HomePage.css'; // Import your custom CSS

const { Option } = Select;

const HomePage = () => {
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [formAnimationClass, setFormAnimationClass] = useState('visible');
  const [headerFooterAnimationClass, setHeaderFooterAnimationClass] = useState('visible');

  useEffect(() => {
    // Ensure header and footer are visible with animation
    setHeaderFooterAnimationClass('visible');

    // Ensure the form container animates based on visibility
    setFormAnimationClass('visible');
  }, [isLoginFormVisible]);

  const onLogin = async (values) => {
    try {
      const responseBody = await authService.login(values);  
      message.success('Login successful!');
      localStorage.setItem('token', responseBody.token);
      redirectToDashboard(responseBody.userName, responseBody.role);
    } catch (error) {
      message.error(error.message || 'An error occurred during login.');
    }
  };

  const onRegister = async (values) => {
    try {
      await authService.register(values);
      message.success('Registration successful!');
    } catch (error) {
      message.error(error.message || 'Registration failed.');
    }
  };

  const redirectToDashboard = (username, role) => {
    const dashboardUrls = {
      admin: '/admin-dashboard',
      'customs officer': '/customs-officer-dashboard',
      importer: '/importer-dashboard',
      exporter: '/exporter-dashboard',
    };

    const normalizedRole = role.toLowerCase();

    if (dashboardUrls[normalizedRole]) {
      window.location.href = dashboardUrls[normalizedRole];
    } else {
      message.error('Invalid role');
    }
  };

  return (
    <div>
      <header className={`header-content ${headerFooterAnimationClass}`}>
        <h1>Customs Management System</h1>
        <div className="auth-buttons">
          <Button
            icon={<LoginOutlined />}
            onClick={() => {
              setLoginFormVisible(true);
              setFormAnimationClass('visible');
            }}
          >
            Login
          </Button>
          <Button
            icon={<UserAddOutlined />}
            onClick={() => {
              setLoginFormVisible(false);
              setFormAnimationClass('visible');
            }}
          >
            Register
          </Button>
        </div>
      </header>

      <main>
        <section id="user-management">
          <div className={`form-container ${formAnimationClass}`}>
            {isLoginFormVisible ? (
              <Form name="login-form" onFinish={onLogin}>
                <h3>Login</h3>
                <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                  <Select>
                    <Option value="admin">Admin</Option>
                    <Option value="customs officer">Customs Officer</Option>
                    <Option value="importer">Importer</Option>
                    <Option value="exporter">Exporter</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Form name="register-form" onFinish={onRegister}>
                <h3>Register</h3>
                <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                  <Select>
                    <Option value="customs officer">Customs Officer</Option>
                    <Option value="importer">Importer</Option>
                    <Option value="exporter">Exporter</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </section>
      </main>

      <footer className={`footer ${headerFooterAnimationClass}`}>
        <p>&copy; 2024 Customs Management System</p>
      </footer>
    </div>
  );
};

export default HomePage;
