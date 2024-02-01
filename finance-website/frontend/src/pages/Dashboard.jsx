import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import './Dashboard.css'
import Sidebar from '../components/Sidebar.jsx';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [info, setInfo] = useState(null);
  const name = localStorage.getItem('userName');

  useEffect(() => {
    fetch('http://localhost:3000/info', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setInfo(data))
    .catch(error => console.error('Error:', error));
  }, []);

  

  return (
    <>
    <Navbar/>
    < Sidebar />
    
    <div className='p-10 ml-5'>
      <div className="flex justify-center lg:text-7xl text-5xl">
        <h1><u>{name} Dashboard</u></h1>
      </div>
      <div className="grid grid-cols-11 gap-5 mt-16">
        <div className="lg:col-span-4 md:col-span-7 col-span-11 column">
          <p className="text-2xl text-center"><b>Month Overview</b></p>
        </div>
        
        <div className="lg:col-span-2 md:col-span-4 col-span-11 column">
          <p className="text-2xl text-center"><b>Subscriptions</b></p>
        </div>

        
        <div className="lg:col-span-5 col-span-11 column h-32">
          <p className="text-2xl text-center"><b>Income Goal</b></p>
        </div>

      </div>
      
      <div className="grid grid-cols-11 gap-5 mt-5">
        
        <div className="lg:col-span-3 md:col-span-6 col-span-11 column">
          <p className="text-2xl text-center"><b>Income Sources</b></p>
          {info && (
    <>
      <p>{info.userName}</p>
      {info && info.incomes.map((income, index) => (
  <p key={index}>{`${income.source}: ${income.amount}`}</p>
))}
    </>
  )}
        </div>

        
        <div className="lg:col-span-3 md:col-span-5 col-span-11 column">
          <p className="text-2xl text-center"><b>Spending</b></p>
        </div>

        
        <div className="lg:col-span-5 col-span-11 column IandE">
          <p className="text-2xl text-center"><b>Income and Spending</b></p>
        </div>

      </div>
    </div>

    </>
  )
}

export default Dashboard