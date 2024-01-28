import React, { useState, useContext } from "react";
import { AuthContext } from './AuthContext.jsx'; // replace with the actual path

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn)

  return (

    <nav>
      <Link to="/" className="title">
        Website
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
  <li>
    <NavLink to="/about">About</NavLink>
  </li>
  <li>
    <NavLink to="/services">Services</NavLink>
  </li>
  <li>
    <NavLink to="/Signup"  id="signUp">Contact</NavLink>
  </li>
  {isLoggedIn ? (
    <li>
      <NavLink to="/logout" id="logOut">Logout</NavLink>
    </li>
  ) : (
    <li>
      <NavLink to="/Login" id="logIn" className="w-24">
        <div className="flex items-center contact-flex">
          Login
          <img src="/RightArrowWhite.png" alt="Right Arrow" width="20px" className="mt-1"/>
        </div>
      </NavLink>
    </li>
  )}
</ul>
    </nav>
  );
};