// src/components/Footer.js
import React from 'react';
// No 'Link' from react-router-dom here if it's an external site or different root

function Footer() {
  const currentYear = new Date().getFullYear();
  // This URL should be the live URL of your main portfolio page on GitHub Pages
  const portfolioAboutLink = "https://YuYangLiu2004.github.io/index.html#about"; // Or just "https://YuYangLiu2004.github.io/#about"

  return (
    <footer className="app-footer">
      <div className="container">
        <p>© {currentYear} SkyScanner Lite (Prototype). All rights reserved for project demonstration.</p>
        <p>
          Designed & Developed by:
          <a href={portfolioAboutLink} target="_blank" rel="noopener noreferrer"> YuYang (Jack) Liu</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;