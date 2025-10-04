import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const { resetPassword, currUser } = useAuth();

  useEffect(() => {
    if (currUser) {
      navigate('/classrooms', { replace: true });
    }
  }, [currUser, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const result = await resetPassword(email, code, newPassword);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
        
        <h3 className="text-3xl font-bold text-center mb-4">Reset Password</h3>
        <p className="text-center text-blue-200 mb-6">
          Enter the code sent to your email and choose a new password.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-600 text-sm text-center">{error}</div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-green-600 text-sm text-center">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly={initialEmail !== ''}
              className="w-full rounded-xl bg-blue-950/70 border border-blue-700 text-white placeholder-blue-300 
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 p-3"
            />
          </div>

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

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-blue-200 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-xl bg-blue-950/70 border border-blue-700 text-white placeholder-blue-300 
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-200 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
