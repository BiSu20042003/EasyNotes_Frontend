import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
const ConfirmDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const handleDeleteConfirm = async () => {
    setDeleting(true);
    setError(null);
    try {
      const response = await api.delete(`/author/${id}`);
      toast.success(response.data.message || "Material deleted !");
      navigate('/classrooms'); 
    } catch (err) {
      console.error('Error deleting materail:', err);
      setError(err.response?.data?.message || 'Failed to delete material. Please try again.');
      setDeleting(false);
    }
  };
  
   return (
        <div className="min-h-screen bg-slate-900 text-gray-300 flex flex-col justify-center items-center p-4 text-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-800/50 backdrop-blur-sm border border-red-700/50 shadow-2xl shadow-red-900/20 rounded-2xl">
                <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-red-300">
                        Delete Material Confirmation
                    </h4>
                    <p className="text-gray-400">
                        Are you sure you want to delete this material?
                    </p>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-300 text-center">
                        {error}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleDeleteConfirm}
                        className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg shadow-red-600/30 hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                    <Link
                        to={`/material/${id}`}
                        className="w-full sm:w-auto px-6 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-lg shadow-slate-600/30 hover:bg-slate-700 transition"
                    >
                        No, Go Back
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default ConfirmDelete;