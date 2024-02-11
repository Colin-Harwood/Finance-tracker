import {React, useContext } from 'react';
import './Home.css';
import { Navbar } from '../components/Navbar.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { AuthContext } from '../components/AuthContext.jsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
    <div id="home">
    <Navbar/>
    <div className="flex flex-row justify-center content-center " id="welcome-text">
      <div className="flex flex-col home-container lg:h-screen h-auto justify-center  main-header">
        <h1 className=" font-bold text-center lg:mx-28 mx-8" id="hero-header">
          Transforming <div className="textInHeroHead">financial management</div>one step at a time.
        </h1>
        <div className="lg:mx-28 mx-8 mt-12">
        <p className="lg:text-3xl text-2xl">
          This is a finance tracker website.
        </p>
        {isLoggedIn ? (
          <a href="/Dashboard">
          <button className="text-left mt-10 " id='DashboardButton'>
            Dashboard
          </button>
          </a>
        ) : (
          <a href="/Signup">
          <button className="text-left mt-10 " id='DashboardButton'>
            Sign Up
          </button>
          </a>
        )}
        </div>
        </div>
    </div>
    <div className="h-96 columns-1 md:columns-1 lg:columns-3 lg:px-8" id="services">
      <div className="flex flex-col items-center justify-around h-full">
        <div className="serviceIconCircle flex justify-center items-center">
          <img src="/icons8-dashboard-96.png" alt="Dashboard Icon" width="96px"/>
        </div>
        <h2 className="text-center text-4xl font-bold">Overview/Dashboard</h2>
      </div>
      <div className="flex flex-col items-center justify-around h-full">
        <div className="serviceIconCircle flex justify-center items-center">
          <img src="/icons8-money-96.png" alt="Income Icon" width="96px"/>
        </div>
        <h2 className="text-center text-4xl font-bold">Easily update</h2>
      </div>
      <div className="flex flex-col items-center justify-around h-full">
        <div className="serviceIconCircle flex justify-center items-center">
          <img src="/icons8-goal-96.png" alt="Goals Icon" width="96px"/>
        </div>
        <h2 className="text-center text-4xl font-bold">Easily Set goals</h2>
      </div>
    </div>
    </div>
    </>
  );
};

export default Home;
