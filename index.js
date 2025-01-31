const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./Schema'); // Import the user schema

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

// POST API endpoint to handle incoming user data
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate the incoming data
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Validation error: All fields are required' });
    }

    // Create a new user and save to the database
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
