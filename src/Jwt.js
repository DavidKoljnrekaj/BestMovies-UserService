const jwt = require('jsonwebtoken');
const secret="3d8f9a2s8f9sdf8sd9f8sdf8sdf8sdf8";

function generateToken(user) {
  return jwt.sign(user, secret);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { generateToken, authenticateToken };