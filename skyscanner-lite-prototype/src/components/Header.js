// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css'; // If you have specific styles

function Header() {
  return (
    <header className="app-header sticky-top"> {/* Using Bootstrap's sticky-top */}
      <nav className="navbar navbar-light bg-light"> {/* Basic Bootstrap navbar styling */}
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-paper-plane"></i> SkyScanner Lite {/* Ensure Font Awesome is linked in public/index.html or App.js */}
          </Link>
          {/* You could add other nav links here if needed */}
        </div>
      </nav>
    </header>
  );
}

export default Header;