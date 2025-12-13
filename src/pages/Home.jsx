/*import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';


import defaultProfileImg from '../assets/profile.png';
import addLogo from '../assets/OIP.jpg';

const queryClient = new QueryClient();

const HomeWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

const Home = () => {
  const { currUser, api } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search');

  const { data: allAuthors, isLoading, isError, error } = useQuery({
    queryKey: ['authors', searchTerm],
    queryFn: async () => {
      let url = '/author/';
      if (searchTerm) {
        url = `/author/search?fullName=${encodeURIComponent(searchTerm)}`;
      }
      const response = await api.get(url);
      return response.data;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFollow = async (authorId) => {
    if (!currUser) {
      navigate('/login');
      return;
    }
    try {
      await api.post(`/author/${authorId}/follow`);
      queryClient.invalidateQueries(['authors', searchTerm]);
    } catch (error) {
      console.error("Failed to follow/unfollow:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-lg font-semibold text-gray-600">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error: {error.message || 'Failed to fetch !!.'}</div>;
  }

  if (!allAuthors || allAuthors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-700">
        <p className="text-lg font-medium">No Author found!!</p>
        {!searchTerm && (
          <Link
            to="/classrooms/new"
            className="mt-4 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Become an Author!
          </Link>
        )}
      </div>
    );
  }

  return (
   <div  className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {allAuthors.map((ele) => (
          <div
            key={ele._id}
            className="bg-gray-800 bg-opacity-70 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col border border-indigo-700"
          >
            <Link to={`/classrooms/${ele._id}`} className="flex flex-col items-center p-6">
              <img
                className="w-28 h-28 object-cover rounded-full border-4 border-indigo-500 shadow-md transform hover:scale-105 transition duration-300"
                src={ele.profileImage?.url || defaultProfileImg}
                alt={ele.fullName}
              />
              <div className="mt-5 text-center">
                <p className="text-xl font-bold text-white tracking-wide">
                  <i>{ele.fullName}</i>
                </p>
                <p className="text-sm text-indigo-300 mt-1">{ele.institution}</p>
                <p className="text-sm text-gray-300 mt-2">Followers: {ele.followers}</p>
              </div>
            </Link>

            <div className="flex justify-center gap-4 p-5 mt-auto border-t border-gray-700">
              {(!currUser || currUser._id !== ele._id) && (
                <button
                  className={`px-6 py-2 rounded-full text-white text-base font-semibold shadow-md transition duration-300 ease-in-out ${
                    currUser && ele.followedBy.includes(currUser._id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollow(ele._id);
                  }}
                >
                  {currUser && ele.followedBy.includes(currUser._id)
                    ? 'Following'
                    : 'Follow'}
                </button>
              )}

              {currUser && currUser._id === ele._id && (
                <button
                  className="px-6 py-2 rounded-full bg-yellow-500 text-white text-base font-semibold hover:bg-yellow-600 transition duration-300 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/material/new/${ele._id}`);
                  }}
                >
                  Post New Material
                </button>
              )}
            </div>
          </div>
        ))}

        {!searchTerm && (
          <Link to="/classrooms/new">
            <div className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-70 border-2 border-dashed border-indigo-600 rounded-3xl p-6 h-full min-h-[250px] hover:bg-gray-700 transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer shadow-xl">
              <img
                className="w-24 h-24 object-cover rounded-full mb-4 opacity-80"
                src={addLogo}
                alt="Become an author"
              />
              <p className="text-indigo-300 font-bold text-lg">Become an Author</p>
              <p className="text-gray-400 text-sm mt-1">Share your knowledge with the world!</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeWrapper;*/

import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

import defaultProfileImg from '../assets/profile.png';
import addLogo from '../assets/OIP.jpg';

// Feature images
import aiStudyImg from '../assets/Ai.png';
import writingLogoImg from '../assets/writingLogo.jpg';

const queryClient = new QueryClient();

const HomeWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

const Home = () => {
  const { currUser, api } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search');

  const { data: allAuthors, isLoading, isError, error } = useQuery({
    queryKey: ['authors', searchTerm],
    queryFn: async () => {
      let url = '/author/';
      if (searchTerm) {
        url = `/author/search?fullName=${encodeURIComponent(searchTerm)}`;
      }
      const response = await api.get(url);
      return response.data;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFollow = async (authorId) => {
    if (!currUser) {
      navigate('/login');
      return;
    }
    try {
      await api.post(`/author/${authorId}/follow`);
      queryClient.invalidateQueries(['authors', searchTerm]);
    } catch (error) {
      console.error("Failed to follow/unfollow:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-lg font-semibold text-gray-600">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error: {error.message || 'Failed to fetch !!.'}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6">

      {/* ================= FEATURE SECTION ================= */}
      {!searchTerm && (
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Feature 1 */}
            <Link to="/feature-ai" className="flex-1">
              <div
                className="overflow-hidden shadow-xl"
                style={{ borderRadius: '15%' }}
              >
                <img
                  src={aiStudyImg}
                  alt="AI Study"
                  className="w-full h-[280px] object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center text-lg font-semibold text-indigo-200">
                Learn smarter with AI-powered study materials
              </p>
            </Link>

            {/* Feature 2 */}
            <Link to="/feature-author" className="flex-1">
              <div
                className="overflow-hidden shadow-xl"
                style={{ borderRadius: '15%' }}
              >
                <img
                  src={writingLogoImg}
                  alt="Become Author"
                  className="w-full h-[280px] object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center text-lg font-semibold text-indigo-200">
                Become an author and share your knowledge
              </p>
            </Link>

          </div>
        </div>
      )}
      {/* ================= END FEATURE SECTION ================= */}


      {/* ================= AUTHORS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {allAuthors?.map((ele) => (
          <div
            key={ele._id}
            className="bg-gray-800 bg-opacity-70 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col border border-indigo-700"
          >
            <Link to={`/classrooms/${ele._id}`} className="flex flex-col items-center p-6">
              <img
                className="w-28 h-28 object-cover rounded-full border-4 border-indigo-500 shadow-md"
                src={ele.profileImage?.url || defaultProfileImg}
                alt={ele.fullName}
              />
              <div className="mt-5 text-center">
                <p className="text-xl font-bold text-white">
                  <i>{ele.fullName}</i>
                </p>
                <p className="text-sm text-indigo-300 mt-1">{ele.institution}</p>
                <p className="text-sm text-gray-300 mt-2">Followers: {ele.followers}</p>
              </div>
            </Link>

            <div className="flex justify-center gap-4 p-5 mt-auto border-t border-gray-700">
              {(!currUser || currUser._id !== ele._id) && (
                <button
                  className={`px-6 py-2 rounded-full text-white font-semibold transition ${
                    currUser && ele.followedBy.includes(currUser._id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollow(ele._id);
                  }}
                >
                  {currUser && ele.followedBy.includes(currUser._id)
                    ? 'Following'
                    : 'Follow'}
                </button>
              )}

              {currUser && currUser._id === ele._id && (
                <button
                  className="px-6 py-2 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/material/new/${ele._id}`);
                  }}
                >
                  Post New Material
                </button>
              )}
            </div>
          </div>
        ))}

        {!searchTerm && (
          <Link to="/classrooms/new">
            <div className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-70 border-2 border-dashed border-indigo-600 rounded-3xl p-6 min-h-[250px] hover:bg-gray-700 transition shadow-xl">
              <img
                className="w-24 h-24 object-cover rounded-full mb-4 opacity-80"
                src={addLogo}
                alt="Become an author"
              />
              <p className="text-indigo-300 font-bold text-lg">Become an Author</p>
              <p className="text-gray-400 text-sm mt-1">
                Share your knowledge with the world!
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeWrapper;
