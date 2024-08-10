
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './assets/pages/Home'; // Import your Home component
import './App.css'; // Import your CSS styles

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
