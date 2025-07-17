import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await API.post('/users/register', { name, email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-600 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-600 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-600 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-3 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
