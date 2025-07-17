import express from 'express';
const router = express.Router();

import {
  getBooks,
  getBookById,
  getGenres,
  createBook,
} from '../controllers/bookController.js';

import protect from '../middlewares/authMiddleware.js';
import admin from '../middlewares/adminMiddleware.js';

router.get('/genres', getGenres);
router.route('/').get(getBooks).post(protect, admin, createBook);
router.route('/:id').get(getBookById);

export default router;
