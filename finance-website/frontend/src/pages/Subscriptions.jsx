import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import './Subscriptions.css'
import Sidebar from '../components/Sidebar.jsx';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Subscriptions = () => {
    const [showForm, setShowForm] = useState(false);
    const [subscriptionSource, setSubscriptionSource] = useState('');
    const [amount, setAmount] = useState('');
    const [info, setInfo] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [date, setDate] = useState('');
    const month = date.split('-')[1];
    const year = date.split('-')[0];
    const brightness = 50;

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
  
      const response = await fetch('http://localhost:3000/subscription', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscriptionSource, amount}),
        
      });
      
      const data = await response.json();
      console.log(data);
      closeModal();
    };

    const handleDelete = async (source, amount) => {
        const response = await fetch('http://localhost:3000/subscription', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ source, amount})
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

  const handleEditClick = (subscription) => {
    setSubscriptionSource(subscription.source);
    setAmount(subscription.amount);
    setCurrentSubscription(subscription);
    setShowEditForm(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:3000/subscription', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subscriptionSource: currentSubscription.source, amount: amount})
    });
    const data = await response.json();
    console.log(data);
    setShowEditForm(false);
  };


    return (
        <>
        <Navbar/>
        < Sidebar />
        <div className="p-10">
            <div id="subscription-head" className="flex justify-center lg:text-7xl text-5xl mx-auto w-screen text-center">
                <h1 className="">Subscription Sources</h1>
            </div>
            
            <div id="subscription-all" className="mx-auto lg:w-9/12 w-11/12">
                <div className="grid grid-cols-3">
                    <div className="columns-subscription-head">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Category</b></h3>
                    </div>
                    <div className="columns-subscription-head column-middle">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Amount</b></h3>
                    </div >
                    <div className="columns-subscription-head">
                        <h3 className="px-3 py-1 lg:text-2xl "><b>Update</b></h3>
                    </div>
                </div>
                <hr/>
                {info && info.subscriptions
                .map((subscription, index) => (
                  <>
                <div key={index} className="grid grid-cols-3">
                    <div className="columns-subscription-head">
                    <h3 className="px-3 py-2">{subscription.source}</h3>
                    </div>
                    <div className="columns-subscription-head">
                    <h3 className="px-3 py-2">{subscription.amount}</h3>
                    </div>
                    <div className="columns-subscription-head">
                      <div className="flex flex-row justify-evenly">
                        <div className="flex flex-row justify-space items-end">
                            <h3 className="px-3 py-2"  onClick={() => handleEditClick(subscription)}><img src="icons8-edit-50.png" width="25px"></img></h3>
                        </div>
                        <div className="flex flex-row justify-space items-end">
                            <h3 className="px-3 py-2" onClick={() => handleDelete(subscription.source, subscription.amount)}><img src="/icons8-delete-48.png" width="25px"></img></h3>
                        </div>
                      </div>
                    </div>
                </div>
                
              </>

                ))}
                <Modal
                isOpen={showEditForm}
                onRequestClose={() => setShowEditForm(false)}
                contentLabel="Edit Subscription Source"
                className="Modal flex flex-col items-center justify-center h-screen w-screen"
                overlayClassName="Overlay"
                style={customStyles}
                id="subscriptionEditModal"
              >
                
                <form onSubmit={(event) => handleEditSubmit(event)} className="h-96 flex flex-col items-center justify-center">
                  <button onClick={() => setShowEditForm(false)} className="mb-10">Close</button>
                  <title>Edit Subscription Source</title>
                  <label htmlFor="Amount">Amount</label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                  <button type="submit" id="submit">Change</button>
                  
                </form>
              </Modal>
                <hr/>
                <div className="flex flex-row justify-end items-end">
                <button onClick={handleAddClick} id="addButton">
                    <img src="/icons8-plus-96.png" width="65px" alt="plus"></img>
                </button>
                </div>
                
                <Modal
                isOpen={showForm}
                onRequestClose={closeModal}
                contentLabel="Add Subscription Source"
                className="Modal flex flex-col items-center justify-center backdrop-brightness-50 h-screen w-screen"
                overlayClassName="Overlay"
                style={customStyles}
                >
                
                <form onSubmit={handleSubmit} className="h-96 flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-end w-full mr-3 px-5 mb-5" style={{marginTop: '-90px'}}>
                        <button onClick={closeModal} class="close-subscription-modal right-0">Close</button>
                    </div>
                    <label htmlFor="category">Category</label>
                    <input
              type="text"
              
              onChange={(e) => setSubscriptionSource(e.target.value)}
              placeholder="Subscription Source"
            />
                    <label htmlFor="amount">Amount</label>
                    <input
              type="number"
              
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

export default Subscriptions