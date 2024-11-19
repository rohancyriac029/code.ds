const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs

// MongoDB connection (without deprecated options)
mongoose.connect('mongodb://localhost:27017/myreactapp', {
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

// Define User schema and model
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Function to add a user
const addUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save(); // Save the user to MongoDB
    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Call the function to add a test user
addUser('testuser', 'password123');
addUser('rohan','go123');
