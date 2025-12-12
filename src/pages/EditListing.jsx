import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { uploadToCloudinary } from './utils/upload';


const EditMaterial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { api } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        isLoading,isError,error: fetchError,} = useQuery({
        queryKey: ['material', id],
        queryFn: async () => {
            const response = await api.get(`/author/edit/${id}`);
            return response.data;
        },
        onSuccess: (data) => {
            setFormData({
                title: data.title || '',
                description: data.description || '',
            });
        },
        enabled: !!id,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) setFile(selectedFile);
        else setFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!formData.title.trim() && !formData.description.trim() && !file) {
            setError('Your material is empty! Please add a title, description, or file.');
            return;
        }

        setIsSubmitting(true);
        try {
            let fileObj = undefined;

            if (file) {
                const folder = `Material_HUB/materials/${id}`;
                const uploadResult = await uploadToCloudinary(api, file, folder);
                fileObj = { url: uploadResult.secure_url, filename: uploadResult.public_id };
            }

            const payload = {
                material: {
                    title: formData.title,
                    description: formData.description,
                    ...(fileObj ? { file: fileObj } : {}),
                },
            };

            await api.post(`/author/edit/${id}`, payload);
            navigate(`/material/${id}`);
        } catch (err) {
            console.error('Error Editing material:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to edit material. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="text-sky-300 text-lg">Loading...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="p-4 rounded-lg bg-red-900/50 border border-red-700 text-red-300 text-center">
                    Error: {fetchError?.message || 'Failed to fetch material for edit.'}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl p-8 space-y-8 bg-slate-800/50 border border-slate-700 shadow-2xl shadow-blue-900/20 rounded-2xl">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-sky-300 mb-2">Edit Your Material</h3>
                    <p className="text-gray-400">Update the details for your material below.</p>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-300 text-center">{error}</div>
                )}
                {successMessage && (
                    <div className="p-3 rounded-lg bg-green-900/50 border border-green-700 text-green-300 text-center">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block font-medium text-gray-300 mb-2">
                            Title
                        </label>
                        <input
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Update the title"
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows="4"
                            placeholder="Update the description"
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="file" className="block font-medium text-gray-300 mb-2">
                            Upload New Material (This will replace the existing file)
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="block w-full text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-sky-500 file:bg-sky-600 file:text-white file:border-none file:px-4 file:py-3 file:mr-4 file:rounded-l-lg hover:file:bg-sky-700"
                            onChange={handleFileChange}
                        />
                        {file && (
                            <p className="mt-2 text-sm text-green-400">
                                Selected file: <span className="font-medium">{file.name}</span>
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-sky-600 text-white font-bold rounded-lg shadow-lg shadow-sky-600/30 hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Material'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditMaterial;
