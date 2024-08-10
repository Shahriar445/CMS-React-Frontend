import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './assets/pages/Home'; // Import your Home component
import HomePage from './assets/components/HomePage/HomePage'; // Import HomePage component
import AdminDashboard from './assets/components/AdminDashboard/AdminDashboard'; // Import AdminDashboard component
import './App.css'; // Import your CSS styles
import AdminDashboardPage from './assets/pages/AdminDashboardPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboardPage/>} /> {/* Updated path */}
      </Routes>
    </Router>
  );
}

export default App;
