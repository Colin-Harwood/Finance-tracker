import { React, useState, useContext } from 'react'
import { Navbar } from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';


const Settings = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);

    const passwordSubmit = async (event) => {
        event.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        console.log(currentPassword, newPassword);
        const response = await fetch('https://noctuque-finance-prod.onrender.com/change-password', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword:currentPassword, newPassword })
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Password changed successfully");
            setPasswordErrorMessage('Password changed successfully!');
        } else {
            console.error(data);
            setPasswordErrorMessage(data.message);
        }
    }

    const deleteSubmit = async (event) => {
      event.preventDefault();
      const confirmPassword = document.getElementById('confirm-password').value;
      console.log(confirmPassword);
      const response = await fetch('https://noctuque-finance-prod.onrender.com/delete-account', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: confirmPassword })
      });
      const data = await response.json();
      if (response.ok) {
          console.log("Account deleted successfully");
          localStorage.removeItem('userName');
          setIsLoggedIn(false);
          localStorage.removeItem('isLoggedIn');
          navigate('/');
      } else {
          console.error(data);
          setErrorMessage('Deletion failed: Incorrect password');
      }
  }
  return (
    <>
        <Navbar />
        <div className="flex justify-center lg:text-7xl text-5xl mx-auto w-screen text-center pt-10">
            <h1 className="">Settings</h1>
        </div>
        <div className="flex flex-col items-center justify-center mt-10" id="settingsPanel">
        <form action="/change-password" method="post" className="flex flex-col items-center p-10 settingsForm" id="passwordForm" onSubmit={passwordSubmit}>
            <h1 className='text-4xl mb-4'>Change Password:</h1><br/>
            <label htmlFor="current-password" className="mb-3">Current Password:</label>
            <input type="password" id="current-password" name="current-password"/>
            <label htmlFor="new-password" className="mb-3">New Password:</label>
            <input type="password" id="new-password" name="new-password"/>
            <input type="submit" value="Change Password" id="passwordSubmit"/>
            {passwordErrorMessage && <div className="passwordAlert mt-4 mb-5">{passwordErrorMessage}</div>}
        </form>
        <form action="/delete-account" className="flex flex-col items-center justify-center settingsForm mb-20" method="post" id="deleteForm" onSubmit={deleteSubmit}>
            <h1 className='text-4xl mb-4'>Delete account:</h1>
            <label htmlFor="confirm-password" className="mb-3">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password"/>
            <input type="submit" value="Delete Account" id="deleteSubmit"/>
            {errorMessage && <div className="deleteAlert mt-4 mb-5">{errorMessage}</div>}
        </form>
        </div>
        <Footer />
    </>
  )
}

export default Settings