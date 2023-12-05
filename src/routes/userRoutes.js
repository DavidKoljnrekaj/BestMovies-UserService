const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../Jwt');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/watchlist', authenticateToken, userController.addToWatchlist);
router.delete('/watchlist',authenticateToken, userController.removeFromWatchlist);
router.get('/watchlist', authenticateToken, userController.getWatchlist);


module.exports = router;