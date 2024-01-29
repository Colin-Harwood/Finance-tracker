import React from 'react'
import { Navbar } from '../components/Navbar.jsx';
import './Expenses.css'
import Sidebar from '../components/Sidebar.jsx';

const Expenses = () => {
    return (
        <>
        <Navbar/>
        < Sidebar />
        <p>Expenses</p>
        </>
    )
}

export default Expenses