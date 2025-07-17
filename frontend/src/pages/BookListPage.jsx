import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [genres, setGenres] = useState([]);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    if (searchTerm) params.append('keyword', searchTerm);
    if (genreFilter) params.append('genre', genreFilter);
    if (yearFilter) params.append('publishedYear', yearFilter);

    try {
      const { data } = await API.get(`/books?${params.toString()}`);
      setBooks(Array.isArray(data.books) ? data.books : []);
    } catch {
      setError('Failed to load books.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const { data } = await API.get('/books/genres');
      setGenres(data);
    } catch {
      console.error('Failed to fetch genres.');
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchBooks();
  };

  const applyFilters = () => {
    fetchBooks();
    setShowFilters(false);
  };

  if (loading) return <div className="p-4">Loading books...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-800">
        📖 Explore Books
      </h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="border-2 border-red-400 focus:border-red-600 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-300 outline-none transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Search
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          {showFilters ? 'Hide Filters' : 'Filter ⚙️'}
        </button>
      </div>

      {showFilters && (
        <div className="border p-4 rounded-lg mb-6 bg-white shadow">
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Published Year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <button
            onClick={applyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full"
          >
            Apply Filters
          </button>
        </div>
      )}

      {books.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Link
              to={`/books/${book._id}`}
              key={book._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {book.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">by {book.author}</p>
              <p className="text-sm text-gray-400 mb-2">
                {book.genre} | {book.publishedYear}
              </p>
              <span className="text-sm font-medium text-red-500 mt-auto">
                View Details →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No books found.</p>
      )}
    </div>
  );
}

export default BookListPage;
