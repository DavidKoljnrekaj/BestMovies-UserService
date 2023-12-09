const reviewService = require('../services/reviewService');

exports.addReview = async (req, res, next) => {
    try {
        const { movieId, content, rating } = req.body;
        const username = req.user.username;
        const message = await reviewService.addReview(username, movieId, content, rating);
        res.json({message});
    } catch (error) {
        next(error);
    }
}

exports.getReviews = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const reviews = await reviewService.getReviews(movieId);
        res.json({ reviews });
    } catch (error) {
        next(error);
    }
}

exports.deleteReview = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const username = req.user.username;
        const message = await reviewService.deleteReview(username, movieId);
        res.json({ message });
    } catch (error) {
        next(error);
    }
}