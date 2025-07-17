import asyncHandler from '../utils/asyncHandler.js';
import Review from '../models/Review.js';
import Book from '../models/Book.js';

// @desc    Get reviews for a specific book
// @route   GET /api/reviews/:bookId
// @access  Public
const getReviewsByBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const reviews = await Review.find({ book: bookId }).populate('user', 'name');

  res.json(reviews);
});

// @desc    Submit a new review
// @route   POST /api/reviews/:bookId
// @access  Private (logged-in users)
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { bookId } = req.params;

  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  const existingReview = await Review.findOne({
    book: bookId,
    user: req.user._id,
  });

  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this book');
  }

  const review = await Review.create({
    user: req.user._id,
    book: bookId,
    rating: Number(rating),
    comment,
  });

  const reviews = await Review.find({ book: bookId });

  book.reviewsCount = reviews.length;
  book.averageRating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await book.save();

  res.status(201).json({ message: 'Review submitted' });
});

export { getReviewsByBook, createReview };
