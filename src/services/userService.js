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

exports.addToWatchlist = async (username, movieId) => {
  try {
  const user = await User.findOne({ username });
  user.watchlist.push(movieId);
    await user.save();
    return 'Watchlist updated';
  } catch (error) {
    throw error;
  }
};

exports.removeFromWatchlist = async (username, movieId) => {
  try {
  const user = await User.findOne({ username });
  user.watchlist.pull(movieId);
    await user.save();
    return 'Watchlist updated';
  } catch (error) {
    throw error;
  }
};
exports.getWatchlist = async (username) => {
  try {
  const user = await User.findOne({ username });
    return user.watchlist;
  } catch (error) {
    throw error;
  }
};

exports.isInWatchlist = async (movieId,username) => {
  try {
    const watchlist = await this.getWatchlist(username);
    return watchlist.includes(movieId);
  } catch (error) {
    throw error;
  }
};

