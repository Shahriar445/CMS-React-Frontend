import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('admin'); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7232/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: username, 
            password: password, 
            role: role
        }),
      });

      const data = await response.json();
    
      if (response.ok) {
        // Store token and other user details in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('role', data.role);

        // Redirect based on user role
        switch (data.role.toLowerCase()) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'importer':
            navigate('/importer/dashboard');
            break;
          case 'exporter':
            navigate('/exporter/dashboard');
            break;
          case 'customs officer':
            navigate('/customs-officer/dashboard');
            break;
          default:
            setMessage('Unknown role');
            break;
        }
      } else {
        // Handle login error
        setMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required
          >
            <option value="admin">Admin</option>
            <option value="Importer">Importer</option>
            <option value="Exporter">Exporter</option>
            <option value="Customs Officer">Customs Officer</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
