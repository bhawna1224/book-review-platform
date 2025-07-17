import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import AuthContext from '../context/AuthContext';

function BookDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(5);

  const fetchBookDetails = async () => {
    try {
      const { data } = await API.get(`/books/${id}`);
      setBook(data);
    } catch (err) {
      setError('Failed to load book details.');
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/reviews/${id}`);
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews');
    }
  };

  const submitReview = async () => {
    if (!newReview.trim()) return;
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      console.log('Auth Token:', token);

      await API.post(`/reviews/${id}`, { rating, comment: newReview });

      setNewReview('');
      fetchReviews();
    } catch (err) {
      console.error('Failed to submit review:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBookDetails(), fetchReviews()]).then(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Loading book details...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-red-900">{book?.title}</h1>
        <p className="text-gray-600 mb-1">By <span className="font-medium">{book?.author}</span></p>
        <p className="text-gray-700 mt-4">{book?.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-red-800">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600 italic">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review._id} className="bg-gray-50 border rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">
                    {review.user?.name || 'Anonymous'}
                  </span>
                  <span className="text-yellow-500 font-medium">
                    {review.rating}★
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {user ? (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
          <select
            className="border rounded-lg p-2 mb-3 w-full"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>

          <textarea
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-red-300 outline-none"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>

          <button
            onClick={submitReview}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          Login to write a review.
        </p>
      )}
    </div>
  );
}

export default BookDetailPage;
