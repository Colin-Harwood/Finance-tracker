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
          <li className="pl-3 mb-4 text-2xl">
            <div className="flex flex-row">
            <img src="/icons8-dashboard-48.png" alt="Dashboard Icon" width="30px"/>
            <h3 className="pl-2"><b>Dashboard</b></h3>
            </div>
          
          </li>
          </Link>
          <hr />
          <Link to="/income">
          <li className="pl-2 mb-4 text-2xl mt-4">
          <div className="flex flex-row">
            <img src="/icons8-money-48.png" alt="Income Icon" width="30px"/>
            <h3 className="pl-2"><b>Income</b></h3>
          </div>
          </li>
          </Link>
          <hr />
          <Link to="/expenses">
          <li className="pl-2 mt-4 mb-4 text-2xl">
          <div className="flex flex-row">
            <img src="/icons8-debt-48.png" alt="Expense Icon" width="30px"/>
            <h3 className="pl-2"><b>Expenses</b></h3>
          </div>
          </li>
          </Link>
          <hr />
          <Link to="/subscriptions">
          <li className="pl-2 mt-4 mb-4 text-2xl">
          <div className="flex flex-row">
            <img src="/icons8-schedule-64.png" alt="Subscriptions Icon" width="30px"/>
            <h3 className="pl-2"><b>Subscriptions</b></h3>
          </div>
          </li>
          </Link>
          <hr />
          <Link to="/income-goal">
          <li className="pl-2 mt-4 text-2xl">
          <div className="flex flex-row">
            <img src="/icons8-goal-64.png" alt="Goal Icon" width="30px"/>
            <h3 className="pl-2"><b>Income Goal</b></h3>
          </div>
          </li>
          </Link>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;