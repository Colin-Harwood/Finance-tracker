import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import './Expenses.css'
import Sidebar from '../components/Sidebar.jsx';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Expenses = () => {
    const [showForm, setShowForm] = useState(false);
    const [expenseSource, setExpenseSource] = useState('');
    const [amount, setAmount] = useState('');
    const [info, setInfo] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [date, setDate] = useState('');
    const month = date.split('-')[1];
    const year = date.split('-')[0];

    useEffect(() => {
        fetch('http://localhost:3000/info', {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data => setInfo(data))
        .catch(error => console.error('Error:', error));
      }, []);
  
    const handleAddClick = () => {
      setShowForm(true);
    };
  
    const closeModal = () => {
      setShowForm(false);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const response = await fetch('http://localhost:3000/expense', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expenseSource, amount, month: month, year: year}),
        
      });
      
      console.log(JSON.stringify({ expenseSource, amount }));
      const data = await response.json();
      console.log(data);
      closeModal();
    };

    const handleDelete = async (source, amount) => {
        const response = await fetch('http://localhost:3000/expense', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ source, amount,month: month,year: year})
        });
      
        const data = await response.json();
        console.log(data);
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

  const handleEditClick = (expense) => {
    setExpenseSource(expense.source);
    setAmount(expense.amount);
    setCurrentExpense(expense);
    setShowEditForm(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:3000/expense', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expenseSource: currentExpense.source, amount: amount, month: month, year: year})
    });
    console.log(amount);
    const data = await response.json();
    console.log(data);
    setShowEditForm(false);
  };


    return (
        <>
        <Navbar/>
        < Sidebar />
        <div className="p-10">
            <div id="expense-head" className="flex justify-center lg:text-7xl text-5xl mx-auto w-screen">
                <h1 className="">Expense Sources</h1>
            </div>
            <div className="mx-auto flex justify-center items-center lg:w-1/3 w-9/12" id="dateExpense">
                <h1 className="lg:text-5xl text-3xl">Date: </h1>
                <input type="month" className="ml-4 mt-2" onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div id="expense-all" className="mx-auto lg:w-9/12 w-11/12">
                <div className="grid grid-cols-3">
                    <div className="columns-expense-head">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Category</b></h3>
                    </div>
                    <div className="columns-expense-head column-middle">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Amount</b></h3>
                    </div >
                    <div className="columns-expense-head">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Update</b></h3>
                    </div>
                </div>
                <hr/>
                {info && info.expenses
                .filter(expense => expense.year === year && expense.month === month)
                .map((expense, index) => (
                  <>
                <div key={index} className="grid grid-cols-3">
                    <div className="columns-expense-head">
                    <h3 className="px-3 py-2">{expense.source}</h3>
                    </div>
                    <div className="columns-expense-head">
                    <h3 className="px-3 py-2">{expense.amount}</h3>
                    </div>
                    <div className="columns-expense-head">
                      <div className="flex flex-row justify-evenly">
                        <div className="flex flex-row justify-space items-end">
                            <h3 className="px-3 py-2"  onClick={() => handleEditClick(expense)}><img src="icons8-edit-50.png" width="25px"></img></h3>
                        </div>
                        <div className="flex flex-row justify-space items-end">
                            <h3 className="px-3 py-2" onClick={() => handleDelete(expense.source, expense.amount)}><img src="/icons8-delete-48.png" width="25px"></img></h3>
                        </div>
                      </div>
                    </div>
                </div>
                <Modal
                isOpen={showEditForm}
                onRequestClose={() => setShowEditForm(false)}
                contentLabel="Edit Expense Source"
                className="Modal flex flex-col items-center justify-center backdrop-brightness-50 h-screen w-screen"
                overlayClassName="Overlay"
                style={customStyles}
              >
                
                <form onSubmit={(event) => handleEditSubmit(event)} className="h-96 flex flex-col items-center justify-center">
                  <button onClick={() => setShowEditForm(false)} className="mb-10">Close</button>
                  <title>Edit Expense Source</title>
                  <label htmlFor="Amount">Amount</label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                  <button type="submit" id="submit">Change</button>
                  
                </form>
              </Modal>
              </>
                ))}
                <hr/>
                <div className="flex flex-row justify-end items-end">
                <button onClick={handleAddClick} id="addButton">
                    <img src="/icons8-plus-96.png" width="65px" alt="plus"></img>
                </button>
                </div>
                
                <Modal
                isOpen={showForm}
                onRequestClose={closeModal}
                contentLabel="Add Expense Source"
                className="Modal flex flex-col items-center justify-center backdrop-brightness-50 h-screen w-screen"
                overlayClassName="Overlay"
                style={customStyles}
                >
                
                <form onSubmit={handleSubmit} className="h-96 flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-end w-full mr-3 px-5 mb-5" style={{marginTop: '-90px'}}>
                        <button onClick={closeModal} class="close-expense-modal right-0">Close</button>
                    </div>
                    <label htmlFor="category">Category</label>
                    <input
              type="text"
              value={expenseSource}
              onChange={(e) => setExpenseSource(e.target.value)}
              placeholder="Expense Source"
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

export default Expenses