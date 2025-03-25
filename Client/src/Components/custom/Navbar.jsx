import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import './Navbar.css'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.reload();
  };
  const transition = {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  };

  return (
    <nav className="navbar">
      <motion.div
        className="logo"
        initial={{ y: "-0px" }}
        animate={{ y: "0px" }}
        transition={{ delay: 1, ease: "easeInOut" }}
      >
        <img src="maker.png" alt="" />
      </motion.div>
      <ul className="nav-links">
        {isLoggedIn ? (
          <>

            <li>
              <Link to="/habit">Habits</Link>
            </li>
            <li>
              <Link to="/progress">Progress</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <Link to="/video">Tutorials</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
