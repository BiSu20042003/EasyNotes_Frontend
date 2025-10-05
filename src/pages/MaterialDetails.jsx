import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import sentIcon from "../assets/sent2.jpg";
import downloadIcon from "../assets/downloadIcon.jpg";
import resourceIcon from "../assets/posted_material.jpg"

const MaterialDetail = () => {
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const { currUser, api } = useAuth();
  const queryClient = useQueryClient();

  const { data: Material, isLoading, isError, error } = useQuery({
    queryKey: ['material', id],
    queryFn: async () => {
      const response = await api.get(`/author/material/${id}`);
      return response.data;
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (newComment) => {
      const response = await api.post(`/material/${id}/comments`, newComment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['material', id]);
      setComment('');
      toast.success('Comment added successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to add comment.');
    },
  });

  const updateLikesMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/author/${id}/like`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['material', id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Something went wrong');
    },
  });

  const handleLike = () => {
    if (!currUser) {
      toast.error('You must be logged in');
      navigate('/login');
      return;
    }
    updateLikesMutation.mutate();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a comment.');
      return;
    }
    if (!currUser) {
      toast.error('You must be logged in to leave a comment.');
      navigate('/login');
      return;
    }
    addCommentMutation.mutate({ description: comment });
  };

  const handleDeleteComment = async (commentId) => {
    if (!currUser) {
      toast.error('You must be logged in to delete a comment.');
      navigate('/login');
      return;
    }
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response = await api.delete(`/material/${id}/comments/${commentId}`);
        queryClient.invalidateQueries(['material', id]);
        toast.success(response.data.message || 'Comment deleted successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete comment.');
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh] text-blue-100 text-lg">Loading Material...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-red-100 text-red-700 px-6 py-3 rounded-lg shadow-lg">
          Error: {error.message || 'Failed to load Material.'}
        </div>
      </div>
    );
  }
  if(!Material) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">{Material.title}</h2>

        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-800 to-blue-900 text-white shadow-xl rounded-2xl overflow-hidden">
  {Material.file?.url && (
    <img
      src={resourceIcon}
      title={Material.title}
      className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-cover"
    />
  )}
  <div className="p-4 md:p-6">
    <p className="text-blue-100 italic mb-4 text-sm md:text-base">
      {Material.description}
    </p>
    {Material.file?.url && (
      <div className="flex justify-end">
        <a onClick={toast.success("Download successfully!")}
          href={Material.file.url.replace("/upload/", "/upload/fl_attachment/")}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition text-sm md:text-base"
        >
          <img
            src={downloadIcon}
            alt="Download"
            className="w-5 h-5 mr-2 rounded-full bg-white p-1"
          />
          Download File
        </a>
      </div>
    )}
  </div>
</div>


        {currUser && currUser._id === Material.owner?._id && (
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Link to={`/material/${Material._id}/edit`}>
              <button className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-sm md:text-base">
                Edit
              </button>
            </Link>
            <Link to={`/material/${Material._id}/delete`}>
              <button className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition text-sm md:text-base">
                Delete
              </button>
            </Link>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            className="px-5 py-2 bg-white text-blue-800 rounded-lg shadow hover:bg-gray-100 transition text-sm md:text-base"
            onClick={handleLike}
          >
            👍 {Material.likeCount}
          </button>
        </div>

        <hr className="my-8 border-gray-300/30" />

        {currUser ? (
          <form onSubmit={handleCommentSubmit} className="bg-white/5 p-4 md:p-6 rounded-xl shadow-md">
            <label htmlFor="comment" className="block mb-2 font-medium text-blue-100 text-sm md:text-base">
              Write Your Comment
            </label>

            <div className="flex items-start gap-3">
              <textarea
                id="comment"
                rows="4"
                className="flex-1 p-3 rounded-lg resize-none bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow hover:bg-blue-700 transition"
                disabled={addCommentMutation.isLoading}
                title="Send comment"
              >
                {addCommentMutation.isLoading ? (
                  <svg
                    className="w-6 h-6 text-white animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray="80"
                      strokeDashoffset="60"
                      fill="none"
                    />
                  </svg>
                ) : (
                  <img
                    src={sentIcon}
                    alt="Send"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-blue-100 mt-4">
            Please{" "}
            <Link to="/login" className="text-blue-300 hover:underline">
              login
            </Link>{" "}
            to leave comments
          </p>
        )}

        <hr className="my-8 border-gray-300/30" />
        {Material.comments && Material.comments.length > 0 && (
  <>
    <h3 className="text-xl font-semibold mb-4 text-white text-center">All Comments</h3>
    <div className="space-y-4 max-w-2xl mx-auto">
      {Material.comments.map((c) => (
        <div key={c._id} className="p-4 bg-white text-gray-900 rounded-lg shadow relative">
          {currUser && currUser._id === c.owner?._id && (
            <button
              onClick={() => handleDeleteComment(c._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
            >
            Remove
            </button>
          )}
          <p className="font-semibold">{c.owner?.username}</p>
          <p className="mt-1">{c.description}</p>
        </div>
      ))}
    </div>
  </>
)}


      </div>
    </div>
  );
};

export default MaterialDetail;
