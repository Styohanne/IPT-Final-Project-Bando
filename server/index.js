const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/bando");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Menu schema/model
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  photoUrl: String, // This will store the file path or URL
  category: {
    type: String,
    enum: ["pizza", "appetizers", "pasta", "dessert"],
    required: true
  }
});
const Menu = mongoose.model("Menu", menuSchema);

// User schema/model
const User = require("./models/user.model");

// Get all menu items
app.get("/api/menu", async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new menu item
app.post("/api/menu", upload.single("photo"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    let photoUrl = "";
    if (req.file) {
      photoUrl = `/uploads/${req.file.filename}`;
    }
    const menuItem = new Menu({ name, description, price, photoUrl, category });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update menu item
app.put("/api/menu/:id", upload.single("photo"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    let update = { name, description, price, category };
    if (req.file) {
      update.photoUrl = `/uploads/${req.file.filename}`;
    }
    const menuItem = await Menu.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete menu item
app.delete("/api/menu/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const user = new User({ name, email, role, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      // Duplicate email error
      return res.status(400).json({ error: "Email already exists." });
    }
    res.status(500).json({ error: err.message });
  }
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    // Only update password if provided
    const update = password
      ? { name, email, role, password }
      : { name, email, role };
    const user = await User.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  // Special case: allow admin/adminpass login
  if (email === "admin" && password === "adminpass") {
    return res.json({
      success: true,
      user: {
        name: "Admin",
        email: "admin",
        role: "admin"
      }
    });
  }
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// After successful add or update:
const fetchUsers = async () => {
  const res = await fetch("http://localhost:5000/api/users");
  const data = await res.json();
  setUsers(data);
};
// Call fetchUsers() after adding/updating a user

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));

