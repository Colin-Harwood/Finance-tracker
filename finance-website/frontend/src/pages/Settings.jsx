import React from 'react'
import { Navbar } from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './Settings.css';

const Settings = () => {
  return (
    <>
        <Navbar />
        <div className="flex justify-center lg:text-7xl text-5xl mx-auto w-screen text-center pt-10">
            <h1 className="">Settings</h1>
        </div>
        <div className="flex flex-col items-center justify-center mt-10" id="settingsPanel">
        <form action="/change-password" method="post" className="flex flex-col items-center p-10 settingsForm" id="passwordForm">
            <h1 className='text-4xl mb-4'>Change Password:</h1><br/>
            <label htmlFor="current-password" className="mb-3">Current Password:</label>
            <input type="password" id="current-password" name="current-password"/>
            <label htmlFor="new-password" className="mb-3">New Password:</label>
            <input type="password" id="new-password" name="new-password"/>
            <input type="submit" value="Change Password" id="passwordSubmit"/>
        </form>
        <form action="/delete-account" className="flex flex-col items-center justify-center settingsForm mb-20" method="post" id="deleteForm">
            <h1 className='text-4xl mb-4'>Delete account:</h1>
            <label htmlFor="confirm-password" className="mb-3">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password"/>
            <input type="submit" value="Delete Account" id="deleteSubmit"/>
        </form>
        </div>
        <Footer />
    </>
  )
}

export default Settings