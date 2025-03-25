import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Report.css";

function Report() {
    const [activityName, setActivityName] = useState("");
    const [totalDays, setTotalDays] = useState(0);
    const [activityCompletion, setActivityCompletion] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [completedDays, setCompletedDays] = useState(0);
    const [habits, setHabits] = useState({
        morning: [],
        noon: [],
        evening: [],
    });

    useEffect(() => {
        loadHabits();
    }, []);

    const loadHabits = async () => {
        try {
            const response = await axios.get("http://localhost:3000/habits");
            setHabits({
                morning: response.data.filter((habit) => habit.type === "morning"),
                noon: response.data.filter((habit) => habit.type === "noon"),
                evening: response.data.filter((habit) => habit.type === "evening"),
            });
        } catch (error) {
            console.error("Error loading habits:", error);
        }
    };

    const startTracking = async () => {
        if (activityName.trim() === "") {
            alert("Please enter an activity!");
            return;
        }
        const duration = parseInt(document.getElementById('duration-select').value);
        setTotalDays(duration);
        setActivityCompletion(Array(duration).fill(false));
        setIsTracking(true);

        // Save activity to the database
        const activityData = {
            name: activityName,
            totalDays: duration,
            completedDays: 0,
            completionArray: Array(duration).fill(false),
        };

        try {
            await axios.post("http://localhost:3000/activities", activityData);
            console.log("Activity saved to database");
        } catch (error) {
            console.error("Error saving activity:", error);
        }
    };

    const toggleActivityCompletion = (index) => {
        const newCompletion = [...activityCompletion];
        newCompletion[index] = !newCompletion[index];
        setActivityCompletion(newCompletion);
        updateActivityProgress(newCompletion);
    };

    const updateActivityProgress = (completionArray) => {
        const completed = completionArray.filter(completed => completed).length;
        setCompletedDays(completed);
    };

    const toggleHabitCompletion = async (habitId, completed) => {
        try {
            const updatedHabits = habits.morning.concat(habits.noon, habits.evening);
            const habitToUpdate = updatedHabits.find(habit => habit._id === habitId);
            
            if (!habitToUpdate) {
                console.error("Habit not found:", habitId);
                return;
            }
    
            const updatedHabit = { ...habitToUpdate, completed };
    
            // Update the habit in the database
            const response = await axios.put(`http://localhost:3000/habits/${habitId}`, updatedHabit);
            console.log("Habit updated successfully:", response.data);
            
            // Update the local state
            setHabits(prevHabits => {
                const updatedHabitList = prevHabits.morning.concat(prevHabits.noon, prevHabits.evening).map(habit => {
                    if (habit._id === habitId) {
                        return updatedHabit;
                    }
                    return habit;
                });
    
                return {
                    morning: updatedHabitList.filter(habit => habit.type === "morning"),
                    noon: updatedHabitList.filter(habit => habit.type === "noon"),
                    evening: updatedHabitList.filter(habit => habit.type === "evening"),
                };
            });
        } catch (error) {
            console.error("Error updating habit:", error.response ? error.response.data : error.message);
            // alert("Failed to update habit. Please try again.");
        }
    };
    const calculateCompletedHabits = () => {
        const allHabits = [...habits.morning, ...habits.noon, ...habits.evening];
        return allHabits.filter(habit => habit.completed).length;
    };

    const calculateTotalHabits = () => {
        return habits.morning.length + habits.noon.length + habits.evening.length;
    };

    const activityProgressPercentage = () => {
        return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
    };

    const habitProgressPercentage = () => {
        const totalHabits = calculateTotalHabits();
        return totalHabits > 0 ? Math.round((calculateCompletedHabits() / totalHabits) * 100) : 0;
    };

    const handleSubmitProgress = async () => {
        // Update habits based on activity completion
        const updatedHabits = habits.morning.concat(habits.noon, habits.evening);
        
        // Loop through the activity completion array
        for (let i = 0; i < activityCompletion.length; i++) {
            if (activityCompletion[i]) {
                // Mark the corresponding habit as completed
                const habitToUpdate = updatedHabits[i]; // Assuming habits are in the same order as activity days
                if (habitToUpdate) {
                    await toggleHabitCompletion(habitToUpdate._id, true); // Mark as completed
                }
            }
        }

        // Reset the activity tracking
        alert("Progress submitted successfully!");
        setActivityCompletion(Array(totalDays).fill(false));
        setCompletedDays(0);
        setIsTracking(false);
        setActivityName("");
        setTotalDays(0);
    };

    return (
        <div className="report-container">
            <div className="tracker-container">
                <h1>Activity Tracker</h1>
                <input
                    type="text"
                    placeholder="Enter your activity"
                    className="habit-input text"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                />
                <br />
                <select id="duration-select" className="select">
                    <option value="7">1 Week</option>
                    <option value="30">1 Month</option>
                </select>
                <br />
                <button id="start-tracking" className="reportbtn" onClick={startTracking}> 
                    Start Tracking
                </button>
                {isTracking && (
                    <>
                        <div id="activity-name">Activity: {activityName}</div>
                        <div className="habit-box" id="habit-box">
                            {activityCompletion.map((completed, index) => (
                                <div
                                    key={index}
                                    className={`day ${completed ? 'completed' : ''}`}
                                    onClick={() => toggleActivityCompletion(index)}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                        <div className="progress" id="progress">
                            Progress: {completedDays} / {totalDays} ({activityProgressPercentage()}%)
                        </div>
                        <button className="btn" onClick={handleSubmitProgress}>
                            Submit Progress
                        </button>
                    </>
                )}
            </div>

            <div className="habit-report">
                <h2>🏆 Habit Report</h2>
                <div className="report-summary">
                    <p>Total Habits: {calculateTotalHabits()}</p>
                    <p>Completed Habits: {calculateCompletedHabits()}</p>
                    <p>Habit Progress: {habitProgressPercentage()}%</p>
                </div>

                <h3>🌅 Morning Habits</h3>
                <ul>
                    {habits.morning.map((habit) => (
                        <li key={habit._id} className={habit.completed ? "completed" : ""}>
                            <span onClick={() => toggleHabitCompletion(habit._id, !habit.completed)}>
                                {habit.name} {habit.completed ? "(Completed)" : "(Not Completed)"}
                            </span>
                        </li>
                    ))}
                </ul>

                <h3>☀️ Noon Habits</h3>
                <ul>
                    {habits.noon.map((habit) => (
                        <li key={habit._id} className={habit.completed ? "completed" : ""}>
                            <span onClick={() => toggleHabitCompletion(habit._id, !habit.completed)}>
                                {habit.name} {habit.completed ? "(Completed)" : "(Not Completed)"}
                            </span>
                        </li>
                    ))}
                </ul>

                <h3>🌙 Evening Habits</h3>
                <ul>
                    {habits.evening.map((habit) => (
                        <li key={habit._id} className={habit.completed ? "completed" : ""}>
                            <span onClick={() => toggleHabitCompletion(habit._id, !habit.completed)}>
                                {habit.name} {habit.completed ? "(Completed)" : "(Not Completed)"}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Report;