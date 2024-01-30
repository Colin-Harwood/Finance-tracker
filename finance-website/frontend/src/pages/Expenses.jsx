import React from 'react'
import { Navbar } from '../components/Navbar.jsx';
import './Expenses.css'
import Sidebar from '../components/Sidebar.jsx';

const Expenses = () => {
    return (
        <>
        <Navbar/>
        < Sidebar />
        <div className="p-10">
            <div id="income-head" className="flex justify-center lg:text-7xl text-5xl">
                <h1 className="">Income Sources</h1>
            </div>
            <div id="income-all" className="mx-auto lg:w-9/12 w-11/12">
                <div className="grid grid-cols-3">
                    <div className="columns-income-head">
                        <h3 className="px-3 py-1">Category</h3>
                    </div>
                    <div className="columns-income-head column-middle">
                        <h3 className="px-3 py-1">Amount</h3>
                    </div >
                    <div className="columns-income-head">
                        <h3 className="px-3 py-1">Update</h3>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
        </>
    )
}

export default Expenses