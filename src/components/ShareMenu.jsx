import React from "react";

const ShareMenu = ({ link, onClose }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    alert("Copied!");
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg p-3 w-48 space-y-2 z-50">

      <button
        onClick={handleCopy}
        className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M8 7h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2zm3-4h6a2 2 0 012 2v5"/>
        </svg>
        Copy Link
      </button>

      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(link)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-100"
      >
        <img src="https://cdn-icons-png.flaticon.com/256/733/733585.png" className="w-5 h-5" alt="whatsapp" />
        WhatsApp
      </a>

      <a
        href={`sms:?body=${encodeURIComponent(link)}`}
        className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-100"
      >
        <img src="https://cdn-icons-png.flaticon.com/256/732/732200.png" className="w-5 h-5" alt="sms" />
        Message
      </a>

      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(link)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-100"
      >
        <img src="https://cdn-icons-png.flaticon.com/256/2111/2111646.png" className="w-5 h-5" alt="telegram" />
        Telegram
      </a>

    </div>
  );
};

export default ShareMenu;
