import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ open, setOpen }) => {
  const { currUser, logout } = useAuth();

  // transform percent for widths: -100% moves whole panel left
  const panelStyle = {
    transform: open ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 260ms ease",
    width: "50%",          // mobile
    // width override for desktop via media query below
  };

  return (
    <>
      {/* Backdrop (keeps page visible but blocks pointer) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/10 z-[998]"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        aria-hidden={!open}
        style={panelStyle}
        className="fixed top-0 left-0 h-full bg-white shadow-xl z-[99999]"
      >
        {/* Add responsive width override using Tailwind utility classes */}
        <div className="w-full md:w-[20vw]"> {/* wrapper to manage desktop width */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-bold text-blue-900">{`</EasyNotes>`}</span>
            <button onClick={() => setOpen(false)} className="text-2xl font-bold text-blue-900">✕</button>
          </div>

          <div className="flex flex-col p-4 space-y-4">
            <Link to="/classrooms" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">Home</Link>
            <Link to="/profile" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">My Profile</Link>
            <Link to="/authors" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">Authors</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">About</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">Contact</Link>
            <hr />
            {!currUser ? (
              <Link to="/login" onClick={() => setOpen(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-center">Login</Link>
            ) : (
              <button onClick={() => { logout(); setOpen(false); }} className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
