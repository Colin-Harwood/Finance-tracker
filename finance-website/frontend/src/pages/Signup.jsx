import React from 'react'

const Signup = () => {
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
      } else {
        throw new Error('Failed to sign up');
      }
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <label htmlFor="userName">UserName</label>
            <input type="text" id="userName" name="userName" placeholder="Email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
        </form>
    </>
  )
}

export default Signup