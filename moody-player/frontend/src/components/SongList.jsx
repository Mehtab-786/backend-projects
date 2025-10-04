import React from "react";

function SongList({ song }) {
  return (
    <div className="flex flex-col w-full border-t border-neutral-800 pt-4 space-y-3">
      {song.map((song, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 rounded-xl px-4 py-3"
        >
          <div className="flex flex-col">
            <h2 className="text-white font-medium text-lg">{song.name}</h2>
            <p className="text-gray-400 text-sm">{song.author}</p>
          </div>
          <button className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-600 text-gray-300 hover:text-pink-400 hover:border-pink-400 transition-all">
            ▶
          </button>
        </div>
      ))}
    </div>
  );
}

export default SongList;
