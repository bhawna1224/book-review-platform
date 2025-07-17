import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { data } = await API.put(`/users/${user._id}`, { name, email });
      login(data);
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-xl w-full">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Your Profile
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-600 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-600 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded-lg transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
