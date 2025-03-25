import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Components/custom/Homepage";
import Userlist from "./Components/Admin/Userlist";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Habit from "./Components/custom/Habit";
import Report from './Components/custom/Report';
import Video from './Components/custom/Video';
import About from './Components/custom/About';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/users" element={<Userlist isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/habit" element={<Habit />} />
         <Route path="/report" element={<Report />} />
         <Route path="/video" element={<Video/>} />
         <Route path="/about" element={<About/>} />

      </Routes>
    </Router>
  );
}

export default App;
