import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import './Income.css'
import Sidebar from '../components/Sidebar.jsx';
import Modal from 'react-modal';
import { Line } from 'react-chartjs-2';
import { Chart,  PointElement, LineElement } from 'chart.js';


Chart.register(PointElement);
Chart.register(LineElement);

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Income = () => {
    const [showForm, setShowForm] = useState(false);
    const [incomeSource, setIncomeSource] = useState('');
    const [amount, setAmount] = useState('');
    const [info, setInfo] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentIncome, setCurrentIncome] = useState(null);
    // Get current date and format it to YYYY-MM
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

    const [date, setDate] = useState(formattedDate);

    let month = date.split('-')[1];
    let year = date.split('-')[0];
    

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      fetch('http://localhost:3000/info', {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => setInfo(data))
      .catch(error => console.error('Error:', error));
    };
  
    const handleAddClick = () => {
      setShowForm(true);
    };
  
    const closeModal = () => {
      setShowForm(false);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const response = await fetch('http://localhost:3000/income', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ incomeSource, amount, month: month, year: year}),
        
      });
      
      const data = await response.json();
      console.log(data);
      closeModal();
      fetchData();
    };

    const handleDelete = async (source, amount) => {
        const response = await fetch('http://localhost:3000/income', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ source, amount,month: month,year: year})
        });
      
        const data = await response.json();
        console.log(data);
        fetchData();
      };
    
  const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000, // Add this line
      },

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const handleEditClick = (income) => {
    setIncomeSource(income.source);
    setAmount(income.amount);
    setCurrentIncome(income);
    setShowEditForm(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:3000/income', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ incomeSource: currentIncome.source, amount: amount, month: month, year: year})
    });
    console.log(currentIncome.source, amount, month, year)
    const data = await response.json();
    console.log(data);
    setShowEditForm(false);
    fetchData();
  };

  const getTotalIncomeForMonth = (month, year) => {
    return info && info.incomes
      .filter(income => income.year === year && income.month === month)
      .reduce((total, income) => total + Number(income.amount), 0);
  };

  const totalIncomes = [];
  const labels = [];
  for (let i = 0; i < 5; i++) {
    let monthIn = Number(month) - i - 1;
    let yearIn = Number(year);
    if (monthIn < 0) {
      yearIn = yearIn - 1;
      monthIn = monthIn + 12;
    }
    const date = new Date(yearIn, monthIn, 1);
    const monthPut = (date.getMonth() + 1).toString().padStart(2, '0');
    const yearPut = date.getFullYear().toString();
    totalIncomes.unshift(getTotalIncomeForMonth(monthPut, yearPut));
    const labelCon = monthPut + '/' + yearPut;
    labels.unshift(labelCon);
  }

  const data = {
    type: 'line',
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
    plugins: {
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'lightGreen'; // change this to the color you want
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      }
  };


    return (
        <>
        <Navbar/>
        < Sidebar />
        <div className="p-10">
            <div id="income-head" className="flex justify-center lg:text-7xl text-5xl mx-auto w-screen text-center">
                <h1 className="">Income Sources</h1>
            </div>
            <div className="mx-auto flex justify-center items-center lg:w-1/3 w-9/12" id="dateIncome">
                <h1 className="lg:text-5xl text-3xl">Date: </h1>
                <input type="month" className="ml-4 mt-2" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div id="income-all" className="mx-auto lg:w-9/12 w-11/12">
                <div className="grid grid-cols-3">
                    <div className="columns-income-head">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Category</b></h3>
                    </div>
                    <div className="columns-income-head column-middle">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Amount</b></h3>
                    </div >
                    <div className="columns-income-head">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Update</b></h3>
                    </div>
                </div>
                <hr/>
                {info && info.incomes
                .filter(income => income.year === year && income.month === month)
                .map((income, index) => (
                  <>
                <div key={index} className="grid grid-cols-3">
                    <div className="columns-income-head">
                    <h3 className="px-3 py-2">{income.source}</h3>
                    </div>
                    <div className="columns-income-head">
                    <h3 className="px-3 py-2">{income.amount}</h3>
                    </div>
                    <div className="columns-income-head">
                      <div className="flex flex-row justify-evenly">
                        <div className="flex flex-row justify-space items-end">
                            <h3 className="px-3 py-2"  onClick={() => handleEditClick(income)}><img src="icons8-edit-50.png" width="25px"></img></h3>
                        </div>
                        <div className="flex flex-row justify-space items-end">
                            <h3 className="px-3 py-2" onClick={() => handleDelete(income.source, income.amount)}><img src="/icons8-delete-48.png" width="25px"></img></h3>
                        </div>
                      </div>
                    </div>
                </div>
                
              </>
                ))}
                <Modal
                isOpen={showEditForm}
                onRequestClose={() => setShowEditForm(false)}
                contentLabel="Edit Income Source"
                className="Modal flex flex-col items-center justify-center backdrop-brightness-50 h-screen w-screen"
                overlayClassName="Overlay"
                style={customStyles}
                id="incomeEditModal"
              >
                
                <form onSubmit={(event) => handleEditSubmit(event)} className="h-96 flex flex-col items-center justify-start p-5">
                  <div className="flex flex-row justify-end w-full mr-3 h-1/8">
                    <button onClick={() => setShowEditForm(false)} className="">Close</button>
                  </div>
                  <title >Edit Income Source</title>
                  <label htmlFor="Amount" className="mt-12">Amount</label>
                  <input type="number" className="mt-3" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                  <button type="submit" id="submit">Change</button>
                  
                </form>
              </Modal>
                <hr/>
                <div className="flex flex-row justify-end items-end">
                <button onClick={handleAddClick} id="addButton">
                    <img src="/icons8-plus-96.png" width="65px" alt="plus"></img>
                </button>
                </div>
                <div className="lg:px-10">
                    <Line data={data} options={options} />
                </div>
                
                <Modal
                isOpen={showForm}
                onRequestClose={closeModal}
                contentLabel="Add Income Source"
                className="Modal flex flex-col items-center justify-center backdrop-brightness-50 h-screen w-screen"
                overlayClassName="Overlay"
                style={customStyles}
                id="incomeModal"
                >
                
                <form onSubmit={handleSubmit} className="h-96 flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-end w-full mr-3 px-5 mb-5" style={{marginTop: '-90px'}}>
                        <button onClick={closeModal} class="close-income-modal right-0">Close</button>
                    </div>
                    <label htmlFor="category">Category</label>
                    <input
              type="text"
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
              placeholder="Income Source"
            />
                    <label htmlFor="amount">Amount</label>
                    <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
                    <button type="submit" id="submit">Add</button>
                </form>
                </Modal>
            </div>
        </div>
        </>
    )
}

export default Income