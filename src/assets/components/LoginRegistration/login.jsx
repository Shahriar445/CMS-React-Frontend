import { useState } from "react";

const Login=()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('admin'); 

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
            role: role  }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful');
        // handle successful login
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
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
