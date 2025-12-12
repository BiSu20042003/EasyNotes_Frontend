import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ShareMenu from "./ShareMenu";

const Sidebar = ({ open, setOpen }) => {
  const [openShare, setopenShare] = useState(false);
  const linkToShare = "https://easy-notes-frontend-two.vercel.app/";
  const { currUser, logout } = useAuth();

  const panelStyle = {
    transform: open ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 260ms ease",
    position: "fixed",      
  isolation: "isolate",    
  };

  return (
    <>
      {openShare && (
        <div className="fixed inset-0 bg-black/10 z-[2147483647] !important" onClick={() => setOpen(false)}/>
      )}

      <aside
        aria-hidden={!open}
        style={panelStyle}
        className="fixed w-1/2 md:w-1/5 top-20 left-0 h-full bg-white shadow-xl z-[99999] !important">
        <div className="w-full md:w-[20vw]"> 
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-bold text-blue-900">{`</EasyNotes>`}</span>
            <button onClick={() => setOpen(false)} className="text-2xl font-bold text-blue-900">✕</button>
          </div>

          <div className="flex flex-col p-4 space-y-4">
            <Link to="/classrooms" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">Home</Link>
            <Link to="/profile" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">My Profile</Link>
            <Link to="/authors" onClick={() => setOpen(false)} className="text-lg font-semibold hover:text-blue-900">Authors</Link>
            <hr/>
            <p onClick={() => setopenShare(!openShare)}>Invite Friends</p>
            {open && (
          <ShareMenu link={linkToShare} onClose={() => setopenShare(false)}/>
            )}
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
