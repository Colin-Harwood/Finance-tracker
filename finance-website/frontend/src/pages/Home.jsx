import {React, useContext } from 'react';
import './Home.css';
import { Navbar } from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
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
          <div className="columns-1 lg:columns-2  mt-10">
            <div className="xl:px-20 px-7 flex flex-col justify-center items-center">
              <img src="/cybersecurity-vs-information-security-illustration.jpg " className="rounded-xl"></img>
            </div>
            <div className="flex flex-col justify-center items-center xl:px-20 lg:px-4 px-12 min-h-72">
              <h1 className="text-4xl lg:text-5xl lg:ml-5 text-center lg:mt-8 xl:mt-0">Your information is safe with us.</h1>
              <p className="lg:px-8 xl:px-24 px-0 mt-5 text-center">We can assure you that with us all of your personal information is not being misused.</p>
              <div className="text-left">
                <p className="pt-5">
                  <img src="/icons8-tick-128.png" alt="purple Tick" width="20px" className="inline-block mr-1"></img>
                  No viewing or looking at your information.
                </p>
                <p className="pt-1">
                  <img src="/icons8-tick-128.png" alt="purple Tick" width="20px" className="inline-block mr-1"></img>
                  No selling of your information to third parties.
                </p>
                <p className="pt-1">
                  <img src="/icons8-tick-128.png" alt="purple Tick" width="20px" className="inline-block mr-1"></img>
                  No possibility of your information being used maliciously.
                </p>
              </div>
            </div>
          </div>
          <div className="columns-1 lg:columns-2 mb-10 flex flex-col-reverse lg:flex-row mt-10">
          <div className="flex flex-col justify-center items-center min-h-72 xl:px-20 lg:px-4 px-12">
              <h1 className="lg:text-5xl text-4xl lg:mr-5 text-center">Any time, any where.</h1>
              <p className="lg:px-24 px-0 mt-5 text-center">Experience the convenience and flexibility of managing your finances seamlessly across all your devices no matter where you are.</p>
              <div className="text-left">
                <p className="pt-5">
                  <img src="/icons8-tick-128.png" alt="purple Tick" width="20px" className="inline-block mr-1"></img>
                  Seamless access across devices.
                </p>
                <p className="pt-1">
                  <img src="/icons8-tick-128.png" alt="purple Tick" width="20px" className="inline-block mr-1"></img>
                  Consistent user experience.
                </p>
                <p className="pt-1">
                  <img src="/icons8-tick-128.png" alt="purple Tick" width="20px" className="inline-block mr-1"></img>
                  Synced data across devices.
                </p>
              </div>
            </div>
            <div className="xl:basis-9/12 mt-10 lg:mt-10 xl:px-20 px-7">
              <img src="/CrossCompatible.png" className="rounded-lg"></img>
            </div>
          </div>
      </div>
      <div id="aboutUs">
          <div className="columns-1 lg:columns-2">
            <div className="xl:px-20 px-7 flex flex-col justify-center items-center">
              <img src="/StockGraph.webp" className="rounded-xl"></img>
            </div>
            <div className="flex flex-col justify-center items-center xl:px-20 lg:px-4 px-12 min-h-72 xl:pt-24">
              <h1 className="text-4xl lg:text-5xl lg:ml-5 text-center lg:mt-8 xl:mt-0">Update Your Information In Real Time</h1>
              <p className="lg:px-8 xl:px-24 px-0 mt-5 text-center">
                See your updated financial information in real time with graphs, charts or just lists, enabling you to make informed decisions and stay in control of your finances.
              </p>
            </div>
          </div>
      </div>
      <div id="callToAction">
        <div className="flex flex-col items-center justify-center centerCTA lg:mx-10 mx-5 my-10">
          <h1 className="text-4xl lg:text-5xl text-center mt-32">Ready to take control of your finances?</h1>
          <p className="lg:px-24 px-4 mt-5 text-center">Sign up now and start your journey to better finances today.</p>
          <a href="/Signup">
          <button className="text-left mt-10" id='SignUpButton'>
            Sign Up
          </button>
          </a>
          <div className="mb-32"></div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Home;
