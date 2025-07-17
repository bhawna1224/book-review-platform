import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-red-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-6 text-lg font-semibold">
        <Link to="/" className="hover:text-yellow-400 transition">
          📚 Book Reviews
        </Link>
        <Link to="/books" className="hover:text-yellow-400 transition">
          Books
        </Link>

        {user?.isAdmin && (
          <Link to="/add-book" className="hover:text-yellow-400 transition">
            Add Book
          </Link>
        )}

        {user && (
          <Link to="/profile" className="hover:text-yellow-400 transition">
            Profile
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-300">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-sm px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-sm px-4 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
