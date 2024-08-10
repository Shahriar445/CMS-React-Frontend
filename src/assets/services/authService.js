// src/services/authService.js
const BASE_URL = 'https://localhost:7232/api/Auth';

async function login({ username, password, role }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ UserName: username, Password: password, Role: role }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

async function register({ username, email, password, role }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ UserName: username, Email: email, Password: password, Role: role }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

export default { login, register };
