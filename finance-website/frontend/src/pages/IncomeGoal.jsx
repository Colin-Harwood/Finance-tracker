import React from 'react'
import { Navbar } from '../components/Navbar.jsx';
import './IncomeGoal.css'
import Sidebar from '../components/Sidebar.jsx';

const IncomeGoal = () => {
    return (
        <>
        <Navbar/>
        < Sidebar />
        <p>Income Goal</p>
        <div className="flex justify-center mt-10">
      <div className="flex flex-col content-center rounded-md skill-div">
        <div className="skill px-4 flex flex-row">
          <h3 className="pr-7">Django</h3>
          <div className="skill-bar ">
            <div className="skill-level" style={{width: '87%'}}></div>
          </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default IncomeGoal