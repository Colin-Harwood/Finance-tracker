import React from 'react';
import './Home.css';


const Home = () => {
  return (
    <>
      <div className="home-container">
      <h1 className="text-8xl font-bold underline">
      Hello world!
    </h1>
    <p className="text-3xl underline">
      This is a simple React app that uses the <a href="https://polygon.io">Polygon.io</a> API to display stock data.
    </p>
      </div>
    </>
  );
};

export default Home;
