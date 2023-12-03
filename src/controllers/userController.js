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


