const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signupDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Define User model
const User = mongoose.model('User', userSchema);

// Middleware for JSON parsing
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).send('User created successfully');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Internal server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
