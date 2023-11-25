const userService = require('../services/userService');

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
    const result = await userService.login(username, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};


