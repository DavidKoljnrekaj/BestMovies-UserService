const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.signup = async (username, password) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    throw error;
  }
};

exports.login = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    return  'Login successful' ;
  } catch (error) {
    throw error;
  }
};

