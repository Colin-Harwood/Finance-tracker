import React from 'react';
import './Home.css';


const Home = () => {
  return (
    <>
    <div className="flex flex-row justify-center content-center " id="welcome-text">
      <div className="flex flex-col home-container h-screen justify-center">
        <h1 className="text-9xl sm-text-3xl font-bold text-center">
          Hello world!
        </h1>
        <p className="text-3xl">
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
