import asyncHandler from '../utils/asyncHandler.js';
import Book from '../models/Book.js';

// @desc    Get all books (with pagination)
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const genreFilter = req.query.genre
  ? { genre: { $regex: req.query.genre, $options: 'i' } }
  : {};

  const yearFilter = req.query.publishedYear
    ? { publishedYear: Number(req.query.publishedYear) }
    : {};

  const filters = { 
    ...keyword,
    ...genreFilter,
    ...yearFilter,
  };

  const count = await Book.countDocuments(filters);
  const books = await Book.find(filters)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ books, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Get distinct genres
// @route   GET /api/books/genres
// @access  Public
const getGenres = asyncHandler(async (req, res) => {
  const rawGenres = await Book.distinct('genre');

  const genreSet = new Set();
  rawGenres.forEach(str => {
    if (str) {
      str.split(',').forEach(g => genreSet.add(g.trim()));
    }
  });

  res.json(Array.from(genreSet));
});

// @desc    Create a new book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const { title, author, description, genre, publishedYear } = req.body;

  const book = new Book({
    title,
    author,
    description,
    genre,
    publishedYear,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});


export { getBooks, getBookById, getGenres, createBook };
