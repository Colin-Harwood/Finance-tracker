import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // Send a POST request to the /login route
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Login succeeded
      console.log(data);
    } else {
      // Login failed
      console.error(data);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">UserName</label>
        <input type="text" id="userName" name="email" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Log in</button>
      </form>
    </>
  );
}

export default Login;