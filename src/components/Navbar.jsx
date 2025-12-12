import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({setSidebarOpen }) => {
  const { currUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim()) {
      navigate(`/classrooms?search=${encodeURIComponent(searchTerm)}`);
    }
  };
const handleLogout = async () => {
    await logout();
    navigate("/classrooms");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-sky-300 to-sky-400 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="md:hidden text-2xl text-blue-900 font-bold"> ☰
          </button>

          <Link
            to="/classrooms"
            className="text-xl font-bold text-blue-900 whitespace-nowrap">
            {`</EasyNotes>`}
          </Link>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full md:w-auto mt-3 md:mt-0 flex-1 max-w-md md:ml-6" >
            <input
              type="text"
              placeholder="Search Author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-800 transition" > 
              🔍
            </button>
          </form>

          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            {!currUser ? (
              <Link
                to="/login"
                className="h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition" >
                <div className="w-10 h-10 flex items-center justify-center rounded-full">
                  🔑
                </div>
              </Link>) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold">
                  {currUser.username ? currUser.username[0].toUpperCase(): "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="h-10 px-4 flex items-center justify-center rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3-3l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      <div className="pt-24 md:pt-16"></div>
    </>
  );
};

export default Navbar;

