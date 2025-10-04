import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-white text-center">
          <p className="mb-4 text-lg">⚠️ No email address provided.</p>
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 transition font-medium"
          >
            Please sign up again
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await verifyEmail(email, code);
    setLoading(false);
    if (result.success) {
      toast.success('Verification successful! You are now logged in.');
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
        
        <h3 className="text-3xl font-bold text-center mb-4">Verify Your Email</h3>
        <p className="text-center text-blue-200 mb-6">
          A verification code has been sent to <strong>{email}</strong>. <br />
          Please enter it below.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-blue-200 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
