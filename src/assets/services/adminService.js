// src/assets/services/apiService.js

const API_BASE_URL = 'https://localhost:7232/api/CMS';

// Function to fetch user counts
export const fetchUserCounts = async (token) => {
    const response = await fetch(`${API_BASE_URL}/user-counts`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

// Function to fetch pending users
export const fetchPendingUsers = async (token) => {
    const response = await fetch(`${API_BASE_URL}/pending`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch pending users');
    }

    return response.json();
};

// Function to fetch active users
export const fetchActiveUsers = async (token) => {
    const response = await fetch(`${API_BASE_URL}/active`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch active users');
    }

    return response.json();
};

// Function to approve a user
export const approveUser = async (userId, token) => {
    const response = await fetch(`${API_BASE_URL}/approve-user/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: true })
    });

    if (!response.ok) {
        throw new Error('Failed to approve user');
    }
};

// Function to stop a user's role
export const stopUserRole = async (userId, token) => {
    const response = await fetch(`${API_BASE_URL}/stop-role/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: false })
    });

    if (!response.ok) {
        throw new Error('Failed to stop user role');
    }
};
