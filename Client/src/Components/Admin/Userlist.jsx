import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, updateUser, deleteUser } from "../../api";

function Userlist() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await updateUser(id, { name: newName });
      loadUsers(); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div className="p-4">
      <div className="auth-links">
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="auth-btn">Login</Link>
            <Link to="/register" className="auth-btn">Register</Link>
          </>
        )}
      </div>

      <h2 className="text-center text-2xl">User List</h2>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user._id} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
            <span>{user.name} - {user.email}</span>
            <div>
              <button className="bg-yellow-500 text-white p-1 mx-1" onClick={() => handleUpdate(user._id)}>Edit</button>
              <button className="bg-red-500 text-white p-1" onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Styles */}
      <style>{`
        .auth-links {
          text-align: center;
          margin-bottom: 20px;
        }
        .auth-btn, .logout-btn {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          text-decoration: none;
          font-size: 16px;
          cursor: pointer;
          margin: 5px;
          border-radius: 5px;
        }
        .logout-btn {
          background-color: #ff4444;
        }
      `}</style>
    </div>
  );
}

export default Userlist;
