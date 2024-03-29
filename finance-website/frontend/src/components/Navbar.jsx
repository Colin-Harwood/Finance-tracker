import React, { useState, useContext } from "react";
import { AuthContext } from './AuthContext.jsx'; // replace with the actual path

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (

    <nav>
      <Link to="/" className="title">
        Noctuque Finance
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        
  
        {isLoggedIn ? (
          <>
          <li>
            <NavLink to="/settings">
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" id="logOut">Dasboard</NavLink>
          </li>
          <li>
            <NavLink to="/logout" id="logOut">Logout</NavLink>
          </li>
          </>
        ) : (
          <>
          <li>
          <NavLink to="/Signup"  id="signUp">Sign Up</NavLink>
          
          </li>
          <div className="flex flex-row justify-center items-center text-center">
            <li>
              <NavLink to="/Login" id="logIn" className="w-auto">
                <div className="flex items-center justify-center text-center contact-flex">
                  Login
                  <img src="/RightArrowWhite.png" alt="Right Arrow" width="20px" height="20px" className="mt-1"/>
                </div>
              </NavLink>
            </li>
          </div>
          </>
          )}
      </ul>
    </nav>
  );
};