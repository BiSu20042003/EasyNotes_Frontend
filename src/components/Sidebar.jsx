import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { currUser, logout } = useAuth();

  const closeSidebar = () => navigate(-1);

  return (
    <div
      className="
        fixed top-0 left-0 h-full 
        w-1/2 md:w-1/5       /* 50% mobile, 20% desktop */
        bg-white shadow-xl 
        z-[999] 
        flex flex-col
        transition-transform duration-300
      "
    >
      {/* Top Row */}
      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-xl font-bold text-blue-900">{`</EasyNotes>`}</span>

        <button
          onClick={closeSidebar}
          className="text-2xl font-bold text-blue-900"
        >
          ✕
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col p-4 space-y-4">

        <Link 
          to="/classrooms" 
          className="text-lg font-semibold hover:text-blue-900"
          onClick={closeSidebar}
        >
          Home
        </Link>

        <Link 
          to="/profile" 
          className="text-lg font-semibold hover:text-blue-900"
          onClick={closeSidebar}
        >
          My Profile
        </Link>

        <Link 
          to="/authors" 
          className="text-lg font-semibold hover:text-blue-900"
          onClick={closeSidebar}
        >
          Authors
        </Link>

        <Link 
          to="/about" 
          className="text-lg font-semibold hover:text-blue-900"
          onClick={closeSidebar}
        >
          About
        </Link>

        <Link 
          to="/contact" 
          className="text-lg font-semibold hover:text-blue-900"
          onClick={closeSidebar}
        >
          Contact
        </Link>

        <hr />

        {!currUser ? (
          <Link
            to="/login"
            onClick={closeSidebar}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-center"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={() => {
              logout();
              closeSidebar();
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
