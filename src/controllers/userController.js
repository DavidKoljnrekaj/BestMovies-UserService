const userService = require('../services/userService');
const { generateToken } = require('../Jwt');

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await userService.signup(username, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const message = await userService.login(username, password);
    const token = generateToken({ username: username });
    res.json({message, token});
  } catch (error) {
    next(error);
  }
};

exports.addToWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const username = req.user.username;
    const message = await userService.addToWatchlist(username, movieId);
    res.json(message);
  } catch (error) {
    next(error);
  }
};

exports.removeFromWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const username = req.user.username;
    const message = await userService.removeFromWatchlist(username, movieId);
    res.json(message);
  } catch (error) {
    next(error);
  }
};

exports.getWatchlist = async (req, res, next) => {
  try {
    const username = req.user.username;
    const watchlist = await userService.getWatchlist(username);
    res.json({ watchlist });
  } catch (error) {
    next(error);
  }
};
