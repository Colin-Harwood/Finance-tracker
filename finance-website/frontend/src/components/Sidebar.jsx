import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [marginTop, setMarginTop] = useState('0');

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setMarginTop('0');
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setMarginTop(Math.max(67 - window.scrollY, 0) + 'px');
    }
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  window.onscroll = function() {
    console.log(window.scrollY);
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
          <Link to="/dashboard">
          <li className="mb-2 text-2xl">
          <h3>Dashboard</h3>
          </li>
          </Link>
          <hr />
          <Link to="/income">
          <li className="mb-2 text-2xl mt-2">
            <h3>Income</h3>
          </li>
          </Link>
          <hr />
          <Link to="/expenses">
          <li className="mt-2 mb-2 text-2xl">
            <h3>Expenses</h3>
          </li>
          </Link>
          <hr />
          <Link to="/subscriptions">
          <li className="mt-2 mb-2 text-2xl">
            <h3>Subscriptions</h3>
          </li>
          </Link>
          <hr />
          <Link to="/income-goal">
          <li className="mt-2 text-2xl">
            <h3>Income Goal</h3>
          </li>
          </Link>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;