import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import AuthContext from '../context/AuthContext';

function AddBookPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await API.post(
        '/books',
        { title, author, description, genre, publishedYear },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      navigate('/books');
    } catch {
      setError('Failed to add book. You might not be authorized.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-red-900 mb-4">Add New Book</h1>

        {error && (
          <p className="text-red-500 font-medium mb-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Book Title"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-red-300 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Author"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-red-300 outline-none"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Genre"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-red-300 outline-none"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Published Year"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-red-300 outline-none"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            rows={4}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-red-300 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg font-semibold transition"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBookPage;
