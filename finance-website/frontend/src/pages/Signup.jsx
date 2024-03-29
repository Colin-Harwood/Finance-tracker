import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();

    const username = event.target.elements.userName.value;
    const password = event.target.elements.password.value;

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        setErrorMessage('Username is already taken.');
        throw new Error('Username is taken');
      } else {
        setErrorMessage('SOmething went wrong signing up.');
        throw new Error('Server error');
      }
    })
    .then(data => {
      console.log(data)
      navigate('/login');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <>
        <div id='login'>
        <body>
        <div className="flex flex-col items-center justify-center">
      <h1 className="lg:text-9xl text-6xl text-white mt-16"><b>Sign-Up</b></h1>
        </div>
        <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mt-20 h-96">
        <label htmlFor="userName">UserName</label>
        <input type="text" id="userName" name="email" placeholder="Username"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password"/>
        <button type="submit" id="submit">Sign-up</button>
        {errorMessage && <div className="Alert mt-4 mb-5">{errorMessage}</div>}
      </form>
      </div>
      </body>
    </div>
    </>
  )
}

export default Signup