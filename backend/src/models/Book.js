import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  genre: [{ type: String }],
  publishedYear: { type: Number },
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: String, default: 0 },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
