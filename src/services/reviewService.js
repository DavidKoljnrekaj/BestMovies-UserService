const Review = require('../models/reviewModel');

exports.addReview = async (username, movieId, content, rating) => {
  try {
    const review = new Review({ username, movieId, content, rating });
    await review.save();
    return 'Review added';
  } catch (error) {
    throw error;
  }
};

exports.getReviews = async (movieId) => {
  try {
    const reviews = await Review.find({ movieId });
    return reviews;
  } catch (error) {
    throw error;
  }
};