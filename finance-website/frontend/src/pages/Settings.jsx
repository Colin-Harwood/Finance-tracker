import React from 'react'
import { Navbar } from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './Settings.css';

const Settings = () => {
  return (
    <>
        <Navbar />
        <div id="income-head" className="flex justify-center lg:text-7xl text-5xl mx-auto w-screen text-center pt-10">
            <h1 className="">Settings</h1>
        </div>
        <div className="flex flex-col items-center justify-center mt-10" id="settingsPanel">
        <form action="/change-password" method="post" className="flex flex-col items-center p-10 settingsForm">
            <h1 className='text-4xl mb-4'>Change Password:</h1>
            <label htmlFor="current-password">Current Password:</label><br/>
            <input type="password" id="current-password" name="current-password"/><br/>
            <label htmlFor="new-password">New Password:</label><br/>
            <input type="password" id="new-password" name="new-password"/><br/>
            <input type="submit" value="Change Password"/>
        </form>
        <form action="/delete-account" className="flex flex-col items-center justify-center mt-10" method="post">
            <label htmlFor="confirm-password">Confirm Password:</label><br/>
            <input type="password" id="confirm-password" name="confirm-password"/><br/>
            <input type="submit" value="Delete Account"/>
        </form>
        </div>
        <Footer />
    </>
  )
}

export default Settings