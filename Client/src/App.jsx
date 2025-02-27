import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Components/custom/Homepage";
import Userlist from "./Components/Admin/Userlist";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

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
      </Routes>
    </Router>
  );
}

export default App;
