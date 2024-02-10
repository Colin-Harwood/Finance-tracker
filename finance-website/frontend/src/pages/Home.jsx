import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Home = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <>
    <div id="home">
    <Navbar/>
    <div className="flex flex-row justify-center content-center " id="welcome-text">
      <div className="flex flex-col home-container h-screen justify-center  main-header">
        <h1 className="lg:text-9xl text-6xl font-bold text-center">
          Hello world
        </h1>
        <p className="lg:text-3xl text-2xl">
          This is a finance tracker website.
        </p>
        <a href="/Signup">
        <button className="text-left mt-10 " id='SignUpButton'>
          Sign Up
        </button>
        </a>
        </div>
    </div>
    <div className="h-96" id="services">
      <p>Test</p>
    </div>
    </div>
    <Bar options={options} data={data} />;
    </>
  );
};

export default Home;
