import React, { useState, useEffect } from 'react';

const Feedback = () => {
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!feedbackMessage.trim()) {
      setError('Feedback message cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      const adminEmail = "noreplyfromtraveldotcom@gmail.com";  
      const mailtoLink = `mailto:${adminEmail}?subject=Feedback&body=${encodeURIComponent(feedbackMessage)}`;

      window.location.href = mailtoLink; 
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-4 py-12">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-white">
        
        <h3 className="text-2xl font-bold text-center text-white mb-2">
          Give Us Feedback
        </h3>
        <p className="text-center text-blue-200 mb-6">
          We'd love to hear your thoughts
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-600 text-white text-sm text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-green-600 text-white text-sm text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="feedbackMessage"
              className="block text-sm font-medium text-blue-200 mb-2"
            >
              Your Feedback
            </label>
            <textarea
              id="feedbackMessage"
              className="w-full h-32 rounded-xl bg-blue-950/70 border border-blue-700 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 p-3 resize-none"
              placeholder="Type your feedback here..."
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:from-blue-500 hover:to-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
