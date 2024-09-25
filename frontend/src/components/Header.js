import React from 'react';
import './Header.css'; // Optional: add styles for your header

const Header = () => {
  return (
    <header className="header">
      <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;
