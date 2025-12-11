/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
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
          <Link
            to="/classrooms"
            className="text-xl font-bold text-blue-900 whitespace-nowrap"
          >
            {`</EasyNotes>`}
          </Link>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full md:w-auto mt-3 md:mt-0 flex-1 max-w-md md:ml-6 "
          >
            <input
              type="text"
              placeholder="Search Author"
              value={searchTerm}
              onChange={handleSearchChange}
              required
              className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-800 transition"
            >
              🔍
            </button>
          </form>
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            {!currUser ? (
              <Link
                to="/login"
                className=" h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full ">

               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>
              </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold">
                  {currUser.username
                    ? currUser.username[0].toUpperCase()
                    : "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className=" h-10 px-4 flex items-center justify-center rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition "
                >
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

export default Navbar;*/


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // State to toggle mobile search bar
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
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
          
          {/* LEFT SECTION: Hamburger (Mobile Only) + Logo */}
          <div className="flex items-center">
            {/* 3-Lines Hamburger Menu: Hidden on Desktop (md:hidden), Visible on Mobile */}
            <button className="md:hidden mr-3 text-blue-900 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <Link
              to="/classrooms"
              className="text-xl font-bold text-blue-900 whitespace-nowrap"
            >
              {`</EasyNotes>`}
            </Link>
          </div>

          {/* MIDDLE SECTION: Search Form */}
          {/* - Mobile: Hidden by default (`hidden`). IF isSearchOpen is true, it becomes `flex`.
             - Desktop: ALWAYS visible (`md:flex`).
          */}
          <form
            onSubmit={handleSearchSubmit}
            className={`${
              isSearchOpen ? "flex" : "hidden"
            } md:flex items-center w-full md:w-auto mt-3 md:mt-0 flex-1 max-w-md md:ml-6`}
          >
            <input
              type="text"
              placeholder="Search Author"
              value={searchTerm}
              onChange={handleSearchChange}
              required
              className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-800 transition"
            >
              🔍
            </button>
          </form>

          {/* RIGHT SECTION: Search Icon (Mobile Trigger) + Auth Buttons */}
          <div className="flex items-center space-x-3 md:space-x-4 mt-0 md:mt-0">
            
            {/* Mobile Search Trigger Icon */}
            {/* Visible only on mobile (md:hidden) AND only when search is closed (!isSearchOpen) */}
            {!isSearchOpen && (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-blue-900 hover:text-blue-700 transition font-bold"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            )}

            {!currUser ? (
              <Link
                to="/login"
                className="h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold">
                  {currUser.username
                    ? currUser.username[0].toUpperCase()
                    : "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="h-10 px-4 flex items-center justify-center rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3-3l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* SPACER FIX: 
          - Desktop (md:pt-16): Always standard height.
          - Mobile (pt-X): 
            If search is open (2 rows) -> pt-24. 
            If search is closed (1 row) -> pt-16.
          This prevents the "white gap".
      */}
      <div className={`${isSearchOpen ? "pt-24" : "pt-16"} md:pt-16`}></div>
    </>
  );
};

export default Navbar;
