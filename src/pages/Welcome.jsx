import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

const WelcomeOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      const showTimer = setTimeout(() => setShowOverlay(true), 1000);
      const hideTimer = setTimeout(() => setShowOverlay(false), 61000);
    return () => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
      };
    }
  }, [location]);

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-blue-700">
  <div className="relative w-[85%] max-w-[700px] rounded-2xl bg-white/10 p-8 text-center text-white backdrop-blur-md">
        
        <button
          onClick={() => setShowOverlay(false)}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-transparent p-1 text-white transition-colors hover:bg-white/20"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <section>
          <h1 className="mb-2 text-lg font-bold sm:text-3xl">🌟 Welcome to {`<EasyNotes/>`} 🌟</h1>
          <p className="my-4 leading-relaxed">
            A place where knowledge meets simplicity. Our platform is built to make educational resources easily accessible for everyone. Here, students and learners can share study materials, notes, and resources while others can explore and benefit from them—anytime, anywhere. We believe that learning grows stronger when shared.
          </p>
          <p>✨ Post. Share. Learn. Together.</p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-yellow-300">Quick Navigation</h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
              to="/classrooms"
              className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            >Explore
            </Link>
            <Link
              to="/login"
              className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            >
             Login
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            >
              SignUp
            </Link>
          </div>
        </section>


        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-yellow-300">Technology Stack</h2>
          <div className="mt-4 flex items-center justify-center space-x-8">
            <SiMongodb size={30} color="#4DB33D" title="MongoDB" />
            <SiExpress size={30} color="#FFFFFF" title="Express" /> 
            <FaReact size={30} color="#61DBFB" title="React" />
            <FaNodeJs size={30} color="#3C873A" title="Node.js" />
          </div>
        </section>

      </div>
    </div>
  );
};

export default WelcomeOverlay;