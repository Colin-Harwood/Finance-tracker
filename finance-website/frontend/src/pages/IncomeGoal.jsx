import React from 'react';
import { Navbar } from '../components/Navbar.jsx';
import './IncomeGoal.css';
import Sidebar from '../components/Sidebar.jsx';

const IncomeGoal = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="p-10">
                <div id="income-head" className="flex justify-center lg:text-7xl text-5xl">
                    <h1 className="">Income Goal</h1>
                </div>
                <div className="flex justify-center items-center mt-10 h-96">
                    <div className="flex flex-col content-center rounded-md skill-div">
                        <div className="skill px-4 flrx flex-col h-40">
                            <div className="flex flex-row justify-between items-center text-start mb-6 w-11/12">
                                <div>
                                    <h1 className="text-xl lg:text-4xl">Percent%</h1>
                                </div>
                                <div>
                                    <h1 className="text-xl lg:text-4xl">Amount/Total</h1>
                                </div>
                            </div>
                            <div className="skill-bar ">
                                <div className="skill-level" style={{ width: '87%' }}></div>
                            </div>
                            <div className="mt-5" id="editGoal">
                                <button>Change</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IncomeGoal;
