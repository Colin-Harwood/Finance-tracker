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
          <button className="text-left mt-10 " id='SignUpButton'>
            Sign Up
          </button>
          </a>
        )}
        </div>
        </div>
    </div>
    <div className="h-96 columns-1 md:columns-1 lg:columns-3 lg:px-8" id="services">
      <div className="flex flex-col items-center justify-around h-full serviceColumn">
        <div className="serviceIconCircle flex justify-center items-center">
          <img src="/icons8-dashboard-96.png" alt="Dashboard Icon" width="96px"/>
        </div>
        <h2 className="text-center text-4xl font-bold">Comprehensive Dashboard</h2>
        <p className="px-10 text-center pt-5 mb-5">
          Stay in control of your finances with our comprehensive overview dashboard, providing a clear snapshot of your financial health at a glance.
        </p>
      </div>
      <div className="flex flex-col items-center justify-around h-full serviceColumn">
        <div className="serviceIconCircle flex justify-center items-center ">
          <img src="/icons8-money-96.png" alt="Income Icon" width="96px"/>
        </div>
        <h2 className="text-center text-4xl font-bold">Easy Updates</h2>
        <p className="px-10 text-center pt-5 mb-5">
        Effortlessly manage your income and expenses with our user-friendly interface, enabling seamless updates to reflect your financial activity in real-time.
        </p>
      </div>
      <div className="flex flex-col items-center justify-around h-full serviceColumn">
        <div className="serviceIconCircle flex justify-center items-center">
          <img src="/icons8-goal-96.png" alt="Goals Icon" width="96px"/>
        </div>
        <h2 className="text-center text-4xl font-bold">Easily Set goals</h2>
        <p className="px-10 text-center pt-5 mb-5">
        Set and track your income goals effortlessly with our intuitive platform, empowering you to define and achieve your financial milestones with ease.
        </p>
      </div>
    </div>
    <div id="whyUs">
          <div className="columns-1 lg:columns-2 px-20 mt-10">
            <div>
              <img src="/cybersecurity-vs-information-security-illustration.jpg" className="rounded-xl"></img>
            </div>
            <div className="flex flex-col justify-start items-center min-h-96 pt-1">
              <h1 className="pt-5">Don't use your information</h1>
              <p className="px-24 ">We can assure you that with us all of your personal information is not being mis-used.</p>
              <div className="text-left">
                <p className="pt-5">No viewing or looking at your information.</p>
                <p>No selling of your information to third parties.</p>
                <p>No possibility of your information being used maliciously.</p>
              </div>
            </div>
          </div>
          <div className="columns-1 lg:columns-2 px-20 mb-10">
            <div className="flex flex-col justify-start items-center min-h-96">
              <h1 className="pt-5">Compatible With All Devices</h1>
            </div>
            <div>
              <img src="/CrossCompatible.png" className="rounded-lg"></img>
            </div>
          </div>
    </div>
    </div>
    </>
  );
};

export default Home;
