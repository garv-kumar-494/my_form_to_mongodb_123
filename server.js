// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/userFormDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
});

const User = mongoose.model('User', userSchema);

// API Route
app.post('/submit', async (req, res) => {
  const { name, email, phone, address } = req.body;
  
  try {
    const newUser = new User({ name, email, phone, address });
    await newUser.save();
    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
