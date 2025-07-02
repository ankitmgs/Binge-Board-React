import React, { useState } from "react";

const MovieDetailsGallery = ({ images }) => {
  const [modalImage, setModalImage] = useState(null);

  return (
    <div className="flex items-center justify-center relative gap-2 mt-12 flex-wrap">
      {images?.map((item, index) => (
        <img
          key={index}
          src={item}
          alt={`Movie Image ${index}`}
          onClick={() => setModalImage(item)}
          className="w-[300px] h-[180px] sm:w-[400px] sm:h-[220px] md:w-[600px] md:h-[300px] cursor-pointer border-2 border-white rounded-lg object-cover shadow-md transition-transform hover:scale-105"
        />
      ))}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-lg max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage}
              alt="Modal"
              className="w-full max-w-[800px] h-auto rounded"
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-500 focus:outline-none"
              aria-label="Close image modal"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsGallery;
