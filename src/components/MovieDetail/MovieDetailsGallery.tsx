import { useState } from "react";

export default function ImageSliderModal({ images }) {
  const [modalImage, setModalImage] = useState(null);

  return (
    <div className="mt-12 w-full overflow-hidden">
      {/* Horizontal Scroll Slider */}
      <div
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {images?.map((item, index) => (
          <div
            key={index}
            className="snap-center shrink-0 w-64 h-36 sm:w-[400px] sm:h-[220px] md:w-80 md:h-44 relative"
          >
            <img
              src={item}
              alt={`Movie Image ${index}`}
              onClick={() => setModalImage(item)}
              className="w-full h-full object-cover rounded-lg border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setModalImage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image Modal"
            tabIndex={-1}
            data-state="open"
            onClick={(e) => e.stopPropagation()}
            className="fixed left-1/2 top-1/2 z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background bg-[#181528] shadow-lg animate-fade-in animate-zoom-in sm:rounded-lg max-w-[90vw] max-h-[90vh] p-0 overflow-hidden"
            style={{ pointerEvents: "auto" }}
          >
            <div className="relative w-full h-full min-h-[80vh]">
              <img
                src={modalImage}
                alt="Modal image"
                className="object-contain w-full h-full"
              />
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x h-5 w-5"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
