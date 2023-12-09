const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../Jwt');

const router = express.Router();

router.post('', authenticateToken, reviewController.addReview);
router.get('/:movieId', reviewController.getReviews);
router.delete('/:movieId', authenticateToken, reviewController.deleteReview);

module.exports = router;