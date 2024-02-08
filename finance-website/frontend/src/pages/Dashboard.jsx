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

  const incomeGoalValue = info ? info.incomeGoal : '';

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
          <p className="text-2xl text-center"><b>{monthOverview}</b></p>
        </div>
        
        <div className="lg:col-span-2 md:col-span-4 col-span-11 column">
          <p className="text-2xl text-center"><b>Subscriptions</b></p>
          <p className="text-2xl text-center"><b>{totalSubscriptions}</b></p>
          {info && info.subscriptions
            .map((income, index) => (
              <p key={index}>{`${income.source}: ${income.amount}`}</p>
            ))}
        </div>

        
        <div className="lg:col-span-5 col-span-11 column h-32">
          <p className="text-2xl text-center"><b>Income Goal</b></p>
          <p className="text-2xl text-center"><b>{totalIncomeThisMonth}/{incomeGoalValue}</b></p>

        </div>

      </div>
      
      <div className="grid grid-cols-11 gap-5 mt-5">
        
        <div className="lg:col-span-3 md:col-span-6 col-span-11 column">
          <p className="text-2xl text-center"><b>Income</b></p>
          <p className="text-2xl text-center"><b>{totalIncomeThisMonth}</b></p>
          {info && info.incomes
              .filter(income => income.year === currentYear && income.month === currentMonthString)
              .map((income, index) => (
              <>
              <p key={index}>{`${income.source}: ${income.amount}`}</p>
              
              </>
      ))}
    
        </div>

        
        <div className="lg:col-span-3 md:col-span-5 col-span-11 column">
          <p className="text-2xl text-center"><b>Spending</b></p>
          <p className="text-2xl text-center"><b>{totalExpenseThisMonth}</b></p>

          {info && info.expenses
            .filter(expense => expense.year === currentYear && expense.month === currentMonthString)
            .map((income, index) => (
              <p key={index}>{`${income.source}: ${income.amount}`}</p>
            ))}
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