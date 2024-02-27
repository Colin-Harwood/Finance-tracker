import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    // Send a POST request to the /login route
    const response = await fetch('https://noctuque-finance-prod.onrender.com/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Login succeeded

      setIsLoggedIn(true);
      console.log("Login succeeded")
      console.log(data);
      localStorage.setItem('userName', username);
      console.log(localStorage.getItem('userName'));
      navigate('/');
    } else {
      // Login failed
      console.error(data);
      setErrorMessage('Login failed: Incorrect username or password');
    }
  };

  if (isLoggedIn) {
    return <p>You are already logged in!</p>;
  }

  return (
    <>
    
    <div id='login'>
        <body>
        <div className="flex flex-col items-center justify-center">
      <h1 className="lg:text-9xl text-6xl text-white mt-16"><b>Login</b></h1>
        </div>
        <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mt-20 h-96">
        <label htmlFor="userName">UserName</label>
        <input type="text" id="userName" name="email" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" id="submit">Log in</button>
        {errorMessage && <div className="alert mt-4">{errorMessage}</div>}
      </form>
      </div>
      </body>
    </div>
    </>
  );
}

export default Login;