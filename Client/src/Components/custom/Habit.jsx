import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Video from './Video'; // Import Video component
import "./Habit.css";

function Habit() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [userInfo, setUserInfo] = useState({
        name: "",
        height: "",
        weight: "",
        profilePic: "default.png",
    });

    const [habits, setHabits] = useState({
        morning: [],
        noon: [],
        evening: [],
    });

    const [newHabit, setNewHabit] = useState("");
    const [activeSection, setActiveSection] = useState("morning");
    const [editHabitId, setEditHabitId] = useState(null);
    const [editHabitName, setEditHabitName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadHabits();
    }, []);

    const loadHabits = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:3000/habits");
            setHabits({
                morning: response.data.filter((habit) => habit.type === "morning"),
                noon: response.data.filter((habit) => habit.type === "noon"),
                evening: response.data.filter((habit) => habit.type === "evening"),
            });
        } catch (error) {
            console.error("Error loading habits:", error);
            setError("Failed to load habits. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const addHabitToDatabase = async () => {
        if (!newHabit.trim()) return;

        const newHabitData = { name: newHabit, type: activeSection };
        try {
            await axios.post("http://localhost:3000/habits", newHabitData);
            loadHabits(); // Refresh the list
            setNewHabit(""); // Clear input after adding
            alert("Habit added successfully!"); // User feedback
        } catch (error) {
            console.error("Error adding habit:", error);
            alert("Failed to add habit. Please try again.");
        }
    };

    const deleteHabit = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/habits/${id}`);
            loadHabits(); // Refresh the list
            alert("Habit deleted successfully!"); // User feedback
        } catch (error) {
            console.error("Error deleting habit:", error);
            alert("Failed to delete habit. Please try again.");
        }
    };

    const toggleHabit = async (id) => {
        const habitToUpdate = habits[activeSection].find(habit => habit._id === id);
        const updatedHabit = { ...habitToUpdate, completed: !habitToUpdate.completed };
        try {
            await axios.put(`http://localhost:3000/habits/${id}`, updatedHabit);
            loadHabits(); // Refresh the list
        } catch (error) {
            console.error("Error updating habit:", error);
            alert("Failed to update habit. Please try again.");
        }
    };

    const startEditing = (habit) => {
        setEditHabitId(habit._id);
        setEditHabitName(habit.name);
    };

    const updateHabit = async (id) => {
        if (!editHabitName.trim()) return;

        const updatedHabit = { name: editHabitName, type: activeSection };
        try {
            await axios.put(`http://localhost:3000/habits/${id}`, updatedHabit);
            loadHabits(); // Refresh the list
            setEditHabitId(null);
            setEditHabitName("");
            alert("Habit updated successfully!"); // User feedback
        } catch (error) {
            console.error("Error updating habit:", error);
            alert("Failed to update habit. Please try again.");
        }
    };

    const calculateCompletedHabits = () => {
        const allHabits = [...habits.morning, ...habits.noon, ...habits.evening];
        return allHabits.filter(habit => habit.completed).length;
    };

    const calculateTotalHabits = () => {
        return habits.morning.length + habits.noon.length + habits.evening.length;
    };

    const handleSubmitProgress = () => {
        alert("Progress submitted successfully!");
        navigate("/report"); // Use navigate instead of history.push
    };

    const HabitList = ({ habits, onDelete, onToggle }) => (
        <ul>
            {habits.map((habit) => (
                <li key={habit._id} className={`habit-item ${habit.completed ? "completed" : ""}`}>
                    <span onClick={() => onToggle(habit._id)} className={habit.completed ? "completed" : ""}>
                        {habit.name}
                    </span>
                    <button className="delete-btn" onClick={() => onDelete(habit._id)}>DELETE</button>
                </li>
            ))}
        </ul>
    );

    const HabitSection = ({ title, habits, onDelete, onToggle }) => (
        <div className="habit-section">
            <h3>{title}</h3>
            <HabitList habits={habits} onDelete={onDelete} onToggle={onToggle} />
            <input
                type="text"
                placeholder="Add a new habit..."
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
            />
            <button onClick={addHabitToDatabase}>ADD HABIT</button>
        </div>
    );

    return (
        <div className="habit-container">
            <div className="sidebar">
                <div className="profile">
                    <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setUserInfo((prev) => ({ ...prev, profilePic: reader.result }));
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    <label htmlFor="photoUpload">
                        <img
                            id="profilePic"
                            src={userInfo.profilePic}
                            alt="Profile Photo"
                        />
                    </label>
                    <input
                        type="text"
                        id="userName"
                        placeholder="Enter Your Good Name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        name="name"
                    />
                    <p id="displayName">Welcome, {userInfo.name || "User   "}</p>
                </div>

                <div className="user-info">
                    <label>Height (cm):</label>
                    <input
                        type="number"
                        id="height"
                        placeholder="Enter height..."
                        value={userInfo.height}
                        onChange={(e) => setUserInfo({ ...userInfo, height: e.target.value })}
                        name="height"
                    />

                    <label>Weight (kg):</label>
                    <input
                        type="number"
                        id="weight"
                        placeholder="Enter weight..."
                        value={userInfo.weight}
                        onChange={(e) => setUserInfo({ ...userInfo, weight: e.target.value })}
                        name="weight"
                    />
                </div>

                <div className="menu">
                    <h3>Time Sections</h3>
                    <ul>
                        <li onClick={() => setActiveSection("morning")}>🌅 Morning</li>
                        <li onClick={() => setActiveSection("noon")}>☀️ Noon</li>
                        <li onClick={() => setActiveSection("evening")}>🌙 Evening</li>
                        <li onClick={() => setActiveSection("report")}>🏆 Report</li>
                        <li onClick={() => setActiveSection("video")}> Video</li>
                    </ul>
                </div>
            </div>

            <div className="content">
                {loading && <p>Loading habits...</p>}
                {error && <p className="error">{error}</p>}

                {activeSection === "morning" && (
                    <HabitSection
                        title="🌅 Morning Habits:"
                        habits={habits.morning}
                        onDelete={deleteHabit}
                        onToggle={toggleHabit}
                    />
                )}

                {activeSection === "noon" && (
                    <HabitSection
                        title="☀️ Noon Habits:"
                        habits={habits.noon}
                        onDelete={deleteHabit}
                        onToggle={toggleHabit}
                    />
                )}

                {activeSection === "evening" && (
                    <HabitSection
                        title="🌙 Evening Habits:"
                        habits={habits.evening}
                        onDelete={deleteHabit}
                        onToggle={toggleHabit}
                    />
                )}

                {activeSection === "report" && (
                    <div className="section">
                        <h1>🏆 Your Progress Report</h1>
                        <div>
                            <h2>Overall Habit Progress</h2>
                            <p>Total Habits: {calculateTotalHabits()}</p>
                            <p>Completed Habits: {calculateCompletedHabits()}</p>
                            <p>Progress: {calculateTotalHabits() > 0 ? Math.round((calculateCompletedHabits() / calculateTotalHabits()) * 100) : 0}%</p>
                            
                            <h2>Habit Details by Section</h2>
                            <h3>🌅 Morning Habits</h3>
                            <HabitList habits={habits.morning} onDelete={deleteHabit} onToggle={toggleHabit} />

                            <h3>☀️ Noon Habits</h3>
                            <HabitList habits={habits.noon} onDelete={deleteHabit} onToggle={toggleHabit} />

                            <h3>🌙 Evening Habits</h3>
                            <HabitList habits={habits.evening} onDelete={deleteHabit} onToggle={toggleHabit} />
                        </div>
                        <button onClick={handleSubmitProgress} className="btn">Submit Progress</button>
                    </div>
                )}

                {activeSection === "video" && <Video />} {/* Render Video component here */}
            </div>
        </div>
    );
}

export default Habit;