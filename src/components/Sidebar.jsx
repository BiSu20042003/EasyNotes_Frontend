// src/components/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ open, setOpen }) => {

  const { currUser, logout } = useAuth();

  return (
    <div
      className={`
        fixed top-0 left-0 h-full
        w-1/2 md:w-1/5            /* 50% on mobile, 20% on desktop */
        bg-white shadow-xl 
        z-[999]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >

      {/* Header with close button */}
      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-xl font-bold text-blue-900">{`</EasyNotes>`}</span>
        <button
          onClick={() => setOpen(false)}
          className="text-2xl font-bold text-blue-900"
        >
          ✕
        </button>
      </div>

      {/* Menu items */}
      <div className="flex flex-col p-4 space-y-4">

        <Link to="/classrooms" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">
          Home
        </Link>

        <Link to="/profile" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">
          My Profile
        </Link>

        <Link to="/authors" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">
          Authors
        </Link>

        <Link to="/about" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">
          About
        </Link>

        <Link to="/contact" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">
          Contact
        </Link>

        <hr />

        {!currUser ? (
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-center"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        )}

      </div>

    </div>
  );
};

export default Sidebar;
