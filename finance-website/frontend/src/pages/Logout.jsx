import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const Logout = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Call logout function when component mounts
    logout();
  }, []);

  const logout = () => {
    // Clear isLoggedIn state and redirect to login page
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    // Redirect to the login page or any other desired page
    navigate('/');
  };

  return (
    <div>
      <p>Logging out...</p>
      {/* You can add a spinner or other loading indicator here if needed */}
    </div>
  );
}

export default Logout;