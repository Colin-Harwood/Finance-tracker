import React from 'react'
import { Navbar } from '../components/Navbar.jsx';
import './Income.css'
import Sidebar from '../components/Sidebar.jsx';

const Income = () => {
    return (
        <>
        <Navbar/>
        < Sidebar />
        <div className="p-10">
            <div id="income-head" className="flex justify-center lg:text-7xl text-5xl">
                <h1 className="">Income Sources</h1>
            </div>
            <div id="income-all" className="mx-auto w-9/12">

            </div>
        </div>
        </>
    )
}

export default Income