import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MobileNavbar = () => {
  const { currUser, logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/classrooms?search=${encodeURIComponent(searchTerm)}`);
    }
    setSearchOpen(false);
  };

  return (
    <>
      <nav className="md:hidden fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-sky-300 to-sky-400 shadow-md z-50 flex items-center">
        <div className="px-4 flex items-center justify-between w-full">

          {/* Search takeover */}
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Author"
                className="flex-grow px-4 py-2 rounded-l-full border bg-white"
                autoFocus
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-full">
                🔍
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="ml-2 text-xl text-blue-900"
              >
                ✕
              </button>
            </form>
          ) : (
            <>
              {/* Hamburger */}
              <button className="text-2xl text-blue-900 font-bold">☰</button>

              {/* Logo */}
              <Link to="/classrooms" className="text-xl font-bold text-blue-900">
                {`</EasyNotes>`}
              </Link>

              {/* Right Side Buttons */}
              <div className="flex items-center space-x-4">
                {/* Search Icon */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-2xl text-blue-900"
                >
                  🔍
                </button>

                {!currUser ? (
                  <Link
                    to="/login"
                    className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center"
                  >
                    🔑
                  </Link>
                ) : (
                  <button
                    onClick={logout}
                    className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center"
                  >
                    ⎋
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="md:hidden pt-16"></div>
    </>
  );
};

export default MobileNavbar;
