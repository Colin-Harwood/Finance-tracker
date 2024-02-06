import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import './IncomeGoal.css';
import Sidebar from '../components/Sidebar.jsx';
import Modal from 'react-modal';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js';

Chart.register(LinearScale);
Chart.register(CategoryScale);
Chart.register(BarElement);

Modal.setAppElement('#root');

const IncomeGoal = () => {
    const [showModal, setShowModal] = useState(false);
    const [incomeGoal, setIncomeGoal] = useState('');
    const [info, setInfo] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/info', {
                    method: 'GET',
                    credentials: 'include'
                  })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setInfo(data);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, []);

    const incomeGoalValue = info ? info.incomeGoal : '';

    const openModal = () => {
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch('http://localhost:3000/incomeGoal', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({incomeGoal}),
          
        });
        
        const data = await response.json();
        console.log(data);
        closeModal();
      };

      const date = new Date();
      const currentMonth = date.getMonth() + 1; // getMonth() returns a zero-based value (0-11), so we add 1 to get the correct month number.

      let totalIncomeThisMonth = 0;

      // Check if info and info.incomes are not null before trying to access its properties
      if (info && info.incomes) {
        const currentMonthIncomes = info.incomes.filter(income => parseInt(income.month) === currentMonth);
        totalIncomeThisMonth = currentMonthIncomes.reduce((total, income) => total + parseFloat(income.amount), 0);
      }

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

    let percent = (totalIncomeThisMonth / incomeGoalValue) * 100;
    let percentRounded = Math.min(percent, 100);
    percent = Math.round(percent);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2],
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
            <Navbar />
            <Sidebar />
            <div className="p-10">
                <div id="income-head" className="flex flex-col justify-center items-center lg:text-7xl text-5xl text-center lg:pl-0 pl-10">
                    <h1 className="">Income Goal:</h1>
                    <h1 className="">{totalIncomeThisMonth}/{incomeGoalValue}</h1>
                </div>
                <div className="flex justify-center items-center lg:mt-52 mt-20 h-96">
                    <div className="flex flex-col content-center rounded-md skill-div">
                        <div className="skill px-4 flrx flex-col lg:h-44 h-40">
                            <div className="flex flex-row justify-between items-center text-start mb-6 w-11/12">
                                <div>
                                    <h1 className="text-xl lg:text-4xl">{percent}%</h1>
                                </div>
                                <div>
                                <div className="mt-5 text-center" id="editGoal" >
                                <button onClick={openModal} width="90px">Change Goal</button>
                            </div>
                                </div>
                            </div>
                            <div className="skill-bar " style={{ height: '30px'}}>
                                <div className="skill-level" style={{ width: percentRounded + '%' }}></div>
                            </div>
                            
                            
                            <Modal
                            isOpen={showModal}
                            onRequestClose={closeModal}
                            contentLabel="Add Income Source"
                            className="Modal flex flex-col items-center justify-center backdrop-brightness-50 h-screen w-screen"
                            overlayClassName="Overlay"
                            style={customStyles}
                            >
                            
                            <form onSubmit={handleSubmit} className="h-96 flex flex-col items-center justify-center">
                                <div className="flex flex-row justify-end w-full mr-3 px-5 mb-5" style={{marginTop: '-90px'}}>
                                    <button onClick={closeModal} class="close-income-modal right-0">Close</button>
                                </div>
                                <label htmlFor="amount">Amount</label>
                                <input
                                type="number"
                                value={incomeGoal}
                                onChange={(e) => setIncomeGoal(e.target.value)}
                                placeholder="Amount"
                                />
                                <button type="submit" id="submit">Change</button>
                            </form>
                            </Modal>
                        </div>
                        <div className="lg:px-10" width="150%">
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='mt-52'>
                <p></p>
            </div>
            
        </>
    );
};

export default IncomeGoal;
