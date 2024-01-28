import React from 'react';
import './Home.css';
import { Navbar } from '../components/Navbar.jsx';


const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-row justify-center content-center " id="welcome-text">
      <div className="flex flex-col home-container h-screen justify-center  main-header">
        <h1 className="lg:text-9xl text-6xl font-bold text-center">
          Hello worl
        </h1>
        <p className="lg:text-3xl text-2xl">
          This is a finance tracker website.
        </p>
        <button className="text-left mt-10 " id='SignUpButton'>
          Sign Up
        </button>
        </div>
    </div>
    <div className="h-96" id="services">
      <p>Test</p>
    </div>
      
    </>
  );
};

export default Home;