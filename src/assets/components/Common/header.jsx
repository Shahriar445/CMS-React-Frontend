
import React from 'react';
import '../../CSS/CommonDesign/Header.css'; // Optional: Include your custom CSS for styling

const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default Header;
