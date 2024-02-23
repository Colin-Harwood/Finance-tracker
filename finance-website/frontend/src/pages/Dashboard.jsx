import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import './Dashboard.css'
import Sidebar from '../components/Sidebar.jsx';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Tooltip, Title, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import Footer from '../components/Footer.jsx';


Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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
    .then(console.log(info))
    .catch(error => console.error('Error:', error));
  }, []);

  const date = new Date();
  let currentMonthString = (date.getMonth() + 1).toString(); // getMonth() returns a zero-based value (0-11), so we add 1 to get the correct month number.
  currentMonthString = currentMonthString.padStart(2, '0'); // Add a leading zero if the month is a single digit
  
  console.log('num', typeof(currentMonthString))
  console.log('string month', currentMonthString)

  
  let currentMonth = parseInt(currentMonthString, 10); // Convert back to a number
  const currentYear = date.getFullYear().toString()

  console.log('current year type', typeof(currentYear))

  console.log(currentYear)
  console.log(currentMonth)

  let totalIncomeThisMonth = 0;

  // Check if info and info.incomes are not null before trying to access its properties
  if (info && info.incomes) {
    const currentMonthIncomes = info.incomes.filter(income => parseInt(income.month) === currentMonth);
    totalIncomeThisMonth = currentMonthIncomes.reduce((total, income) => total + parseFloat(income.amount), 0);
  }

  let totalExpenseThisMonth = 0;

  if (info && info.expenses) {
    const currentMonthExpenses = info.expenses.filter(expense => parseInt(expense.month) === currentMonth);
    totalExpenseThisMonth = currentMonthExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  }

  let totalSubscriptions = 0;

  if (info && info.subscriptions) {
    totalSubscriptions = info.subscriptions.reduce((total, subscription) => total + parseFloat(subscription.amount), 0);
  }

  const monthOverview = totalIncomeThisMonth - totalExpenseThisMonth - totalSubscriptions;

  let colour = '#118C4F'
  if (monthOverview > 0) {
    colour = '#118C4F'
  } else if (monthOverview < 0) {
    colour = '#FF0000'
  }


  const incomeGoalValue = info ? info.incomeGoal : '';

  const percentGoal = ((totalIncomeThisMonth / incomeGoalValue) * 100).toFixed(2) + '%';

  const totalIncomes = [totalExpenseThisMonth, totalIncomeThisMonth];
  const labels = ['Expenses', 'Income'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Income',
        data: totalIncomes,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        bottom: 0,
        top: 15,
      }
    }, 
    legend: {
      display: false,
    },
  };

  let subscriptionLabels = [];
  let subscriptionData = [];

  if (info && info.subscriptions) {
    totalSubscriptions = info.subscriptions.reduce((total, subscription) => {
      subscriptionLabels.push(subscription.source);
      subscriptionData.push(parseFloat(subscription.amount));
      console.log('subscription labels', subscriptionLabels)
      console.log('subscription amount', subscriptionData)
      return total + parseFloat(subscription.amount);
    }, 0);
  }

  const subscriptionPieData = {
    labels: subscriptionLabels,
    datasets: [
      {
        data: subscriptionData,
        backgroundColor: [
          // Add as many colors as you have subscriptions
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
    <Navbar id="navbarDash"/>
    < Sidebar />
    
    <div className='p-10 ml-5'>
      <div className="flex justify-center lg:text-7xl text-5xl text-center">
        <h1><u>{name}'s Dashboard</u></h1>
      </div>
      <div className="grid grid-cols-11 gap-5 mt-16">
        <div className="lg:col-span-4 md:col-span-7 col-span-11 column">
          <p className="text-4xl text-center"><b>Month Overview</b></p>
          <div className="flex flex-col justify-center h-2/3">
            <p className="lg:text-9xl text-7xl text-center" id="monthAmount" style={{color: colour}}><b>{monthOverview}</b></p>
          </div>
        </div>
        
        <div className="lg:col-span-2 md:col-span-4 col-span-11 column Subs">
          <p className="text-4xl text-center"><b>Subscriptions</b></p>
          <p className="text-2xl text-center" style={{color: '#FF0000'}}><b>{totalSubscriptions}</b></p>
          <div>
            <Pie data={subscriptionPieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: {display: false}},
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== undefined) {
              label += context.parsed;
            }
            return label;
          }
        }
      },}} className="mx-auto w-full text-center  lg:mb-0 lg:p-0" />
          </div>
        </div>

        
        <div className="lg:col-span-5 col-span-11 column h-32">
          <p className="text-4xl text-center"><b>Income Goal</b></p>
          <div className="flex flex-col lg:flex-row content-center justify-around pl-10 lg:mt-3 mt-0 w-full">
          <p className="text-3xl text-center"><b>{percentGoal}</b></p>
          <p className="text-3xl text-center"><b>{totalIncomeThisMonth}/{incomeGoalValue}</b></p>
          </div>
          <div className="text-center" id="goalChange">
            <p className="text-lg underline"><a href="/income-goal">Change</a></p>
          </div>
          
        </div>

      </div>
      
      <div className="grid grid-cols-11 gap-5 mt-5">
        
        <div className="lg:col-span-3 md:col-span-6 col-span-11 column">
          <p className="text-4xl text-center"><b>Income</b></p>
          <p className="text-2xl text-center" style={{color: '#118C4F'}}><b>{totalIncomeThisMonth}</b></p>
          {info && info.incomes
            .filter(income => income.year === currentYear && income.month === currentMonthString)
            .sort((a, b) => b.amount - a.amount) // Sort incomes in descending order
            .slice(0, 3) // Get the first four incomes
            .map((income, index) => (
                <div key={index} className="flex justify-between px-8">
                    <p className="text-lg">{`${income.source}:`}</p>
                    <p className="text-lg">{`${income.amount}`}</p>
                </div>
          ))}
          <div className="text-center" id="incomeMore">
            <p className="text-lg underline"><a href="/income">View All</a></p>
          </div>
    
        </div>

        
        <div className="lg:col-span-3 md:col-span-5 col-span-11 column">
          <p className="text-4xl text-center"><b>Spending</b></p>
          <p className="text-2xl text-center" style={{color: '#FF0000'}}><b>{totalExpenseThisMonth}</b></p>

          {info && info.expenses
            .filter(expense => expense.year === currentYear && expense.month === currentMonthString)
            .sort((a, b) => b.amount - a.amount) // Sort expenses in descending order
            .slice(0, 3) // Get the first four expenses
            .map((expense, index) => (
                <div key={index} className="flex justify-between px-8">
                    <p className="text-lg">{`${expense.source}:`}</p>
                    <p className="text-lg">{`${expense.amount}`}</p>
                </div>
          ))}
          <div className="text-center" id="expensesMore">
            <p className="text-lg underline"><a href="/expenses">View All</a></p>
          </div>
        </div>

        
        <div className="lg:col-span-5 col-span-11 column IandE">
          <p className="text-4xl text-center"><b>Income and Spending</b></p>
          <div className="flex justify-center">
            <Bar data={data} options={{legend: {display: false}}} className="lg:mb-10 lg:pb-24 lg:px-8 mt-5 lg:mt-0"/>
          </div>
        </div>

      </div>
    </div>
    <Footer />
    </>
  )
}

export default Dashboard