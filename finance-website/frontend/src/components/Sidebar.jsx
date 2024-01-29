import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [marginTop, setMarginTop] = useState('0');

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setMarginTop('0');
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setMarginTop('67px');
    }
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="allSide">
      <div className="open-button">
        <button onClick={toggleSidebar} aria-label="Open sidebar">
          {isOpen ? '<' : <img src="/icons8-menu-30-purple.png" alt="Hamburger Menu Icon" width="30px"/>}
        </button>
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ marginTop }}>
        <button onClick={toggleSidebar} aria-label="Close sidebar"  id="close-button">
          <img src="/icons8-menu-30.png" alt="Hamburger Menu Icon" width="30px"/>
        </button>
        <ul>
          <Link to="/page1">
          <li className="mb-2 text-2xl">
          <h3>Page 1</h3>
          </li>
          </Link>
          <hr />
          <Link to="/page2">
          <li className="mb-2 text-2xl mt-2">
            <h3>Page 2</h3>
          </li>
          </Link>
          <hr />
          <Link to="/page1">
          <li className="mt-2 text-2xl">
            <h3>Page 3</h3>
          </li>
          </Link>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;