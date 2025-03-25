import React from "react";
import Navbar from "./Navbar";
import "./Homepage.css"; // Import the external CSS file
import { Link } from "react-router-dom";


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
                <button class="B1 slide-button" >
                  <Link to="/habit">Lets Start Your Activity</Link>
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

      <div>
        <div className="container-3">
          <div class="sub-container-3">
            <img src="i1.jpg" class="im1" />
            <img src="i2.jpg" class="im2" />
          </div>
          <div className="sub-container-3">
            <img src="i3.jpg" class="im3" />
            <img src="i4.jpg" class="im4" />
          </div>

        </div>
      </div>
      <div class="container-2">
        <div class="text-con">
          Stay Empowered by <br />
          Your Progress
        </div>
        <div>
          <hr />
        </div>
        <div class="text-con-1">
          Scientific studies show that tracking your progress can significantly boost <br />
          your chances of successfully building and maintaining habits. <br />
          Fuel your journey with insightful metrics, celebrate your milestones, and stay <br />
          motivated on your path to success. <br />
        </div>
      </div>
      <div class="container-4">
        <div class="container">
          <img src="i5.svg" class="im5" />
          <div class="font-1">
            Why Wait to <br />
            Transform Your Life?
          </div>
          <div class="font-1A">
            Join over 2 million people who are taking control of their habits and building <br />
            a better life with Habitify. Whether your aim is to enhance productivity, <br />
            improve fitness, or simply form healthier daily habits, <br />
            Habitify has everything you need to make it happen.
          </div>
        </div>
      </div>
      <div class="container-5">
        <div class="container">
          <img src="i7.svg" class="im7" />
          <div class="font-2">
            Proven Success Stories
          </div>
          <div class="font-2A">
            Habitify isn't just loved by our users - we've also been recognized by<br />
            industry leaders. Featured as the App of the Day on the Apple App Store, <br />
            we're committed to delivering quality, effectiveness, and a platform for<br />
            genuine transformation.
          </div>
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