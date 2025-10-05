import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const result = await signup(formData.email, formData.username, formData.password);
    setLoading(false);
    if (result.success) {
      setSuccess(result.message + ' Redirecting to verify...');
      
        navigate('/verify-email', { state: { email: formData.email } });
    
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
        
        <h3 className="text-3xl font-bold text-center mb-6">{'<Sign Up/>'}</h3>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-600 text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-600 text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-blue-950/70 border border-blue-700 text-white placeholder-blue-300 
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-200 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-blue-950/70 border border-blue-700 text-white placeholder-blue-300 
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-blue-950/70 border border-blue-700 text-white placeholder-blue-300 
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold 
                       shadow-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-blue-200">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
