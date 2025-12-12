import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { uploadToCloudinary } from './utils/upload';
import toast from 'react-hot-toast';
const NewMaterial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { api } = useAuth();

    const [formData, setFormData] = useState({ title: '', description: '',isRestricted: false, institutes: '' });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);
 const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox'?checked :value 
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith("image/")) {
                setPreview(URL.createObjectURL(selectedFile));
            } else {
                setPreview('');
            }
        } else {
            setFile(null);
            setPreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.title.trim() && !formData.description.trim() && !file) {
            toast.error('Your material is empty!');
            return;
        }
        if (formData.isRestricted && !formData.institutes.trim()) {
            toast.error('Please specify atleast one institute for restricted material.');
            return;
        }

        setLoading(true);
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
                    isRestricted: formData.isRestricted,
                    ...(formData.isRestricted && { 
                        allowedInstitutes: formData.institutes.split(',').map(inst => inst.trim()).filter(Boolean)
                    })
                }
            };

            await api.post(`/author/new/${id}`, payload);
            toast.success("Material uploaded successfully!");
            navigate(`/classrooms/${id}`);
        } catch (err) {
            console.error('Error creating material:', err);
            setError(err.response?.data?.message || err.message || 'Failed to post new material. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl p-8 space-y-8 bg-slate-800/50 border border-slate-700 shadow-2xl shadow-blue-900/20 rounded-2xl">
     <div className="text-center">
            <h3 className="text-3xl font-bold text-sky-300 mb-2">Post New Material</h3>
            <p className="text-gray-400">Upload documents or images with details.</p>
          </div>

                {error && <div className="p-3 my-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block font-medium text-gray-300 mb-2">Title</label>
                        <input
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Give a title for your material"
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="file" className="block font-medium text-gray-300 mb-2">Upload File/Image</label>
                        <label htmlFor="file" className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-sky-500 hover:bg-slate-800/50 transition">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                <p className="mt-2 text-gray-400">
                                    {file ? (
                                        <span className="font-semibold text-sky-400">{file.name}</span>
                                    ) : (
                                        <>Click to browse or <span className="font-semibold">drag and drop</span></>
                                    )}
                                </p>
                            </div>
                            <input
                                name="file"
                                id="file"
                                type="file"
                                accept="image/*,application/pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        {preview && (
                            <div className="mt-4 flex justify-center p-2 bg-slate-700/50 border border-slate-600 rounded-lg">
                                <img
                                    src={preview}
                                    alt="Image Preview"
                                    className="max-h-60 object-contain rounded-lg shadow-md"
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Elaborate on the material..."
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                    </div>


                        <div>
                            <input
                                type="checkbox"
                                id="isRestricted"
                                name="isRestricted"
                                checked={formData.isRestricted}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-gray-500 bg-gray-700 text-sky-500 focus:ring-sky-600"
                            />
                            <label htmlFor="isRestricted" className="font-medium text-gray-300">
                                &nbsp;&nbsp;Restrict Access
                            </label>
                            <div className="relative flex items-center group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                                <div className="absolute bottom-full mb-2 w-72 p-3 bg-slate-900 text-gray-300 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-slate-700">
                                    Check this to make the material accessible only to users from specific institutes you list below.
                                </div>
                            </div>
                        </div>
                        
                        {formData.isRestricted && (
                            <div>
                                <label htmlFor="institutes" className="block text-sm font-medium text-gray-400 mb-2">Allowed Institutes (use ',' for multiple Institute)</label>
                                <input
                                    type="text"
                                    id="institutes"
                                    name="institutes"
                                    value={formData.institutes}
                                    onChange={handleChange}
                                    placeholder="IIEST Shibpur, Jadavpur University etc."
                                    className="w-full p-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                />
                            </div>
                        )}
                    

                    <button
                        type="submit"
                        className="w-full py-3 bg-sky-600 text-white font-bold rounded-lg shadow-lg shadow-sky-600/30 hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewMaterial;






 
