import React from 'react'
import { Navbar } from '../components/Navbar.jsx';
import './Dashboard.css'
import Sidebar from '../components/Sidebar.jsx';

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    < Sidebar />
    
    <div>Dashboard</div>

    </>
  )
}

export default Dashboard