import React from "react";
import Navbar from "./Navbar";
import "./Homepage.css"; // Import the external CSS file

function Homepage() {
  return (
    <div className="main">
      <div className="navbar-container">
        <Navbar />
        <div className="heading">
          <div class="f1">
            Build Better Habits, <br />
            Build a Better Life
          </div>
          <div>
            <div className="btn">
              <a href="Day-Habit.html">
                <button class="B1 slide-button">
                  Lets Start Your Activity
                </button></a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="img1"
      >
        <img
          src="https://cdn.prod.website-files.com/5d3aa39f8474c472841a7dfc/647f5daa8446c87626bbfe23_Frame%2044%20(1).png"
          loading="lazy"
          alt="A multiplatform habit tracker"
        />
      </div>

      <div className="advanced-design">
        <h1>What is Habit Tracker</h1>
        <p>A Habit Tracker is a powerful tool to help you build positive habits and break bad ones. It provides a visual representation of your progress, making it easier to stay motivated on your journey towards personal improvement.</p>
      </div>

      <div className="advanced-design">
        <h1>How it Works</h1>
        <p>Simply list the habits you want to track and mark them off each day as you complete them. Over time, you'll be able to see patterns in your behavior and identify areas for improvement.</p>
      </div>

      <div className="advanced-design">
        <h1>Get Started Today</h1>
        <p>Ready to build a better you? Start using our Habit Tracker now and take control of your habits and goals.</p>
      </div>

      <div className="advanced-design">
        <h1>About Our Habit Tracker</h1>
        <p>Our habit tracker is designed to help you build positive habits and track your progress effortlessly. Stay motivated and achieve your goals with our easy-to-use platform.</p>
        <p>Join thousands of users who are improving their daily routines, one habit at a time!</p>
        <div className="about-icons">
          <span className="icon">📅</span>
          <span className="icon">✅</span>
          <span className="icon">💪</span>
        </div>
      </div>

      <div className="advanced-design">
        <h1>Advanced Design & Features</h1>
        <p>Our habit tracker incorporates an intuitive user interface with dynamic progress charts, reminders, and goal-setting tools. We use cutting-edge design principles to create a seamless experience across all devices.</p>
        <p>Key features include personalized analytics, AI-driven habit recommendations, and social sharing options to keep you accountable.</p>
      </div>

      <div className="container-1">
        <ul>
          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">
              <button className="button">Morning</button>
            </a>
            <div className="dropdown-content">
              <a href="#"><b>Run 8 AM</b></a>
              <a href="#">Meditate 8:30 AM</a>
              <a href="#">Plan the day 9 AM</a>
              <a href="#">Read 10 AM</a>
              <a href="#"><b>Hydrate 9:30 AM</b></a>
            </div>
          </li>

          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">
              <button className="button">Noon</button>
            </a>
            <div className="dropdown-content">
              <a href="#"><b>Healthy Lunch 12 PM</b></a>
              <a href="#">Connect with a colleague 2 PM</a>
              <a href="#"><b>Express gratitude 4 PM</b></a>
            </div>
          </li>

          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">
              <button className="button">Night</button>
            </a>
            <div className="dropdown-content">
              <a href="#"><b>Reflect 8 PM</b></a>
              <a href="#">Wind Down 9 PM</a>
              <a href="#">Disconnect from screens 9:40 PM</a>
              <a href="#"><b>Prepare for tomorrow</b></a>
            </div>
          </li>
        </ul>
      </div>

      <div className="container-2">
        <div className="text-con">
          Stay Empowered by <br /> Your Progress
        </div>
        <div className="text-con-1">
          Scientific studies show that tracking your progress can significantly boost <br />
          your chances of successfully building and maintaining habits. <br />
          Fuel your journey with insightful metrics, celebrate your milestones, and stay <br />
          motivated on your path to success.
        </div>
      </div>

    

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Habit Tracker. All rights reserved.</p>
          <ul className="footertext">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">  Contact Us</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
