// src/components/AdminDashboard/ManageUsers/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import { fetchPendingUsers as fetchPendingUsersAPI, fetchActiveUsers as fetchActiveUsersAPI, approveUser as approveUserAPI, stopUserRole as stopUserRoleAPI } from '../../../services/adminService';
import './ManageUsers.css';

const ManageUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const pending = await fetchPendingUsersAPI();
        setPendingUsers(pending);
        const active = await fetchActiveUsersAPI();
        setActiveUsers(active);
      } catch (error) {
        setMessage(`Error fetching users: ${error.message}`);
      }
    };

    loadUsers();
  }, []);

  const getToken = () => localStorage.getItem('token');

  const handleApproveUser = async (userId) => {
    try {
      await approveUserAPI(userId);
      setMessage('User approved successfully');
      await reloadUsers();
    } catch (error) {
      setMessage(`Error approving user: ${error.message}`);
    }
  };

  const handleStopUserRole = async (userId) => {
    try {
      await stopUserRoleAPI(userId);
      setMessage('User role stopped successfully');
      await reloadUsers();
    } catch (error) {
      setMessage(`Error stopping user role: ${error.message}`);
    }
  };

  const reloadUsers = async () => {
    try {
      const pending = await fetchPendingUsersAPI();
      setPendingUsers(pending);
      const active = await fetchActiveUsersAPI();
      setActiveUsers(active);
    } catch (error) {
      setMessage(`Error reloading users: ${error.message}`);
    }
  };

  return (
    <div className="manage-users">
      {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
      <header>
        <div className="container">
          <h1>User Management</h1>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="pending-users">
            <h2>Pending User Registrations</h2>
            <table id="pending-users-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.length > 0 ? (
                  pendingUsers.map(user => (
                    <tr key={user.userId}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="approve-btn" onClick={() => handleApproveUser(user.userId)}>Approve</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No pending users</td></tr>
                )}
              </tbody>
            </table>
          </section>

          <section className="active-users">
            <h2>Active Users</h2>
            <table id="active-users-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.length > 0 ? (
                  activeUsers.map(user => (
                    <tr key={user.userId}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="stop-role-btn" onClick={() => handleStopUserRole(user.userId)}>Stop Role</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No active users</td></tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 Admin Dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default ManageUsers;
   