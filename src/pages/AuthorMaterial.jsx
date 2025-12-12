import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import addMaterialLogo from "../assets/newMaterial.jpg";
import folderLogo from "../assets/folder.png";

const AuthorMaterial = () => {
  const { id } = useParams();
  const { currUser, api } = useAuth();

  const { data: allMaterials, isLoading, isError, error } = useQuery({
    queryKey: ['materials', id],
    queryFn: async () => {
      const response = await api.get(`/author/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-indigo-200 text-lg">
        Loading Materials...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="bg-red-900 bg-opacity-50 text-red-300 px-6 py-3 rounded-xl shadow-lg border border-red-700">
          Error: {error.message || 'Failed to load Materials.'}
        </div>
      </div>
    );
  }

  const mainContainerClasses = "min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6";

  if (!allMaterials || allMaterials.length === 0) {
    return (
      <div className={`${mainContainerClasses} flex flex-col items-center justify-center space-y-6 text-center`}>
        <p className="bg-indigo-900 bg-opacity-50 text-indigo-200 text-lg px-6 py-3 rounded-xl shadow-lg border border-indigo-700">
          No Materials Found for this Author
        </p>

        {currUser && currUser._id === id && (
          <>
            <Link to={`/material/new/${id}`} className="w-full max-w-xs">
              <div className="bg-gray-800 bg-opacity-70 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 border border-indigo-700 cursor-pointer p-0">
                <img
                  src={addMaterialLogo}
                  alt="Add New Material"
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="px-6 py-4 flex flex-col items-center">
                  <p className="text-indigo-300 font-bold text-lg">Add New Material</p>
                </div>
              </div>
            </Link>

            <Link to={`/author/${id}/delete`}>
              <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-300">
                Delete Author Account
              </button>
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={mainContainerClasses}>
      <div  className="grid gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto">
        {allMaterials
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((ele) => {
            const date = new Date(ele.createdAt);
            return (
             <Link
                  to={`/material/${ele._id}`}
                  key={ele._id}
                  className="
                    bg-gray-800 bg-opacity-70 shadow-xl rounded-3xl
                    hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1
                    p-0 text-center border border-indigo-700 overflow-hidden
                    lg:scale-[0.8] lg:origin-center
                  "
>
  <img
    src={folderLogo}
    alt="folder"
    className="w-full h-44 object-cover"
  />
  <div className="px-6 py-4">
    <p className="text-lg text-white font-bold mb-2 break-words">{ele.title}</p>
    <p className="text-base text-indigo-300">{date.toLocaleDateString()}</p>
    <p className="text-sm text-gray-400 mt-1">{date.toLocaleTimeString()}</p>
  </div>
</Link>
);
 })}

        {currUser && currUser._id === id && (
          <>
            <Link to={`/material/new/${id}`}>
               <div className="h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-70 border-2 border-dashed border-indigo-600 rounded-3xl p-0 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer shadow-xl overflow-hidden">
                 <img
                   src={addMaterialLogo}
                   alt="Add New Material"
                   className="w-full h-40 md:h-48 object-cover"
                 />
                 <div className="px-6 py-4 flex flex-col items-center">
                   <p className="text-indigo-300 font-bold text-lg">Add New Material</p>
                 </div>
               </div>
            </Link>
            
            <div className="flex items-center justify-center sm:col-start-2 lg:col-start-auto">
                <Link to={`/author/${id}/delete`} >
                  <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-300">
                    Delete Author Account
                  </button>
                </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorMaterial;
