import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { uploadToCloudinary } from './utils/upload';

const NewAuthor = () => {
    const navigate = useNavigate();
    const { api } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        institution: '',
        department: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.fullName || !formData.institution) {
            setError('Full Name and Institution are required.');
            return;
        }

        setLoading(true);
        try {
            let profileImageObj = undefined;

            if (file) {
                const folder = 'Material_HUB/authors';
                const uploadResult = await uploadToCloudinary(api, file, folder);
                profileImageObj = { url: uploadResult.secure_url, filename: uploadResult.public_id };
            }

            const payload = {
                author: {
                    fullName: formData.fullName,
                    institution: formData.institution,
                    department: formData.department,
                    ...(profileImageObj ? { profileImage: profileImageObj } : {}),
                },
            };

            await api.post('/author/new', payload);
            navigate(`/classrooms`);
        } catch (err) {
            console.error('NewAuthor submit error:', err);
            setError(
                err.response?.data?.message || err.message || 'Failed to create profile. Try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl p-8 space-y-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-2xl shadow-blue-900/20 rounded-2xl">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-sky-300 mb-2">Become an Author</h3>
                    <p className="text-gray-400">
                        Fill out your details to start sharing materials.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block font-medium text-gray-300 mb-2">
                            Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            name="fullName"
                            id="fullName"
                            type="text"
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="institution" className="block font-medium text-gray-300 mb-2">
                            Institution <span className="text-red-400">*</span>
                        </label>
                        <input
                            name="institution"
                            id="institution"
                            type="text"
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            value={formData.institution}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className="block font-medium text-gray-300 mb-2">
                            Department (Optional)
                        </label>
                        <input
                            name="department"
                            id="department"
                            type="text"
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="profileImage" className="block font-medium text-gray-300 mb-2">
                            Profile Picture (Optional)
                        </label>
                        <input
                            name="profileImage"
                            id="profileImage"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            className="block w-full text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-sky-500 file:bg-sky-600 file:text-white file:border-none file:px-4 file:py-2 file:mr-4 file:rounded-lg hover:file:bg-sky-700"
                            onChange={handleFileChange}
                        />
                    </div>

                    {preview && (
                        <div className="flex justify-center">
                            <div className="mt-4 p-2 bg-slate-700/50 border border-slate-600 rounded-full shadow-sm">
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="w-32 h-32 object-cover rounded-full shadow-md"
                                />
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-300 text-center">{error}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-sky-600 text-white font-bold rounded-lg shadow-lg shadow-sky-600/30 hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewAuthor;