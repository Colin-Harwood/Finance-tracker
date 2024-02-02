import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import './Income.css'
import Sidebar from '../components/Sidebar.jsx';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Income = () => {
    const [showForm, setShowForm] = useState(false);
    const [incomeSource, setIncomeSource] = useState('');
    const [amount, setAmount] = useState('');
    const [info, setInfo] = useState(null);

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
  
      const response = await fetch('http://localhost:3000/income', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ incomeSource, amount }),
        
      });
      
      console.log(JSON.stringify({ incomeSource, amount }));
      const data = await response.json();
      console.log(data);
      closeModal();
    };

    const handleDelete = async (source, amount) => {
        const response = await fetch('http://localhost:3000/income', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ source, amount })
        });
      
        const data = await response.json();
        console.log(data);
      };

    const handleEdit = async (source, amount) => {
      const response = await fetch('http://localhost:3000/income', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source, amount })
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


    return (
        <>
        <Navbar/>
        < Sidebar />
        <div className="p-10">
            <div id="income-head" className="flex justify-center lg:text-7xl text-5xl">
                <h1 className="">Income Sources</h1>
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
                {info && info.incomes.map((income, index) => (
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
                            <h3 className="px-3 py-2" onClick={() => handleEdit(income.source, income.amount)}><img src="icons8-edit-50.png" width="25px"></img></h3>
                        </div>
                        <div className="flex flex-row justify-space items-end">
                            <h3 className="px-3 py-2" onClick={() => handleDelete(income.source, income.amount)}><img src="/icons8-delete-48.png" width="25px"></img></h3>
                        </div>
                      </div>
                    </div>
                </div>
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
                contentLabel="Add Income Source"
                className="Modal flex flex-col items-center justify-center backdrop-brightness-50 h-screen w-screen"
                overlayClassName="Overlay"
                style={customStyles}
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