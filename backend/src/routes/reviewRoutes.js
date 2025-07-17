import express from 'express';
const router = express.Router();

import { getReviewsByBook, createReview } from '../controllers/reviewController.js';
import protect from '../middlewares/authMiddleware.js';

router.route('/:bookId').get(getReviewsByBook).post(protect, createReview);

export default router;
