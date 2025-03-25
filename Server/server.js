const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://naneradaksh:Tp3XScf5zIzyBpld@cluster0.lvpjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const habitSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['morning', 'noon', 'evening'] },
  completed: { type: Boolean, default: false },
  completionDate: Date,
});

const Habit = mongoose.model('Habit', habitSchema);

const activitySchema = new mongoose.Schema({
  name: String,
  totalDays: Number,
  completedDays: Number,
  completionArray: [Boolean],
});


const Activity = mongoose.model('Activity', activitySchema);

const videos = [
  { id: 1, url: 'VIDEO1.mp4' },
  { id: 2, url: 'VIDEO2.mp4' },
  { id: 3, url: 'VIDEO3.mp4' },
];

app.get('/', (req, res) => {
  res.send("Server Working : ) ")
})

// 📌 REGISTER API
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📌 LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ success: false, message: "Invalid password" });

    res.json({ success: true, message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📌 GET ALL USERS (READ)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

let habits = [
  { _id: '67e0c8e2d3a0c66505ab4c16', name: 'Drink Water', completed: false, type: 'morning' },
  // Add more habits as needed
];

// Route to update a habit
app.put('/habits/:id', (req, res) => {
  const habitId = req.params.id;
  const updatedData = req.body;

  const habitIndex = habits.findIndex(habit => habit._id === habitId);
  if (habitIndex === -1) {
      return res.status(404).send('Habit not found');
  }

  // Update the habit
  habits[habitIndex] = { ...habits[habitIndex], ...updatedData };
  res.status(200).json(habits[habitIndex]);
});
app.post('/habits', async (req, res) => {
  const habit = new Habit(req.body);
  await habit.save();
  res.status(201).send(habit);
});

app.get('/habits', async (req, res) => {
  const habits = await Habit.find();
  res.send(habits);
});

// API Endpoints
app.post('/activities', async (req, res) => {
  const { name, totalDays, completedDays, completionArray } = req.body;
  const newActivity = new Activity({ name, totalDays, completedDays, completionArray });
  await newActivity.save();
  res.status(201).json(newActivity);
});

app.get('/activities', async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});
app.delete('/habits/:id', async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get('/videos', (req, res) => {
  res.json(videos);
});
// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
