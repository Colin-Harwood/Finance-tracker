import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <NavLink to="/contact"  id="signUp">Contact</NavLink>
        </li>
        <li>
        <NavLink to="/contact" id="logIn" className="w-24">
            <div className="flex items-center contact-flex">
                Contact 
                <img src="/RightArrowWhite.png" alt="Right Arrow" width="20px" className="mt-1"/>
            </div>
        </NavLink>
        </li>
      </ul>
    </nav>
  );
};