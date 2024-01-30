import React from 'react'
import { Navbar } from '../components/Navbar.jsx';
import './Subscriptions.css'
import Sidebar from '../components/Sidebar.jsx';

const Subscriptions = () => {
    return (
        <>
        <Navbar/>
        < Sidebar />
        <div className="p-10">
            <div id="subscriptions-head" className="flex justify-center lg:text-7xl text-5xl">
                <h1 className="">Subscriptions</h1>
            </div>
            <div id="subscriptions-all" className="mx-auto lg:w-9/12 w-11/12">
                <div className="grid grid-cols-3">
                    <div className="columns-subscriptions-head">
                        <h3 className="px-3 py-1">Category</h3>
                    </div>
                    <div className="columns-subscriptions-head column-middle-subscriptions">
                        <h3 className="px-3 py-1">Amount</h3>
                    </div >
                    <div className="columns-subscriptions-head">
                        <h3 className="px-3 py-1">Update</h3>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
        </>
    )
}

export default Subscriptions