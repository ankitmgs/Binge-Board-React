import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function ImageSliderModal({ images }) {
  const [modalImage, setModalImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Open modal and set current index
  const openModal = (img, idx) => {
    setModalImage(img);
    setCurrentIndex(idx);
  };

  // Close modal
  const closeModal = useCallback(() => setModalImage(null), []);

  // Handle Esc key to close modal
  useEffect(() => {
    if (!modalImage) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalImage, closeModal, currentIndex, images]);

  // Prev/Next for modal and slider
  const goToPrev = useCallback(() => {
    if (!images.length) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setModalImage(
      images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]
    );
  }, [currentIndex, images]);

  const goToNext = useCallback(() => {
    if (!images.length) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setModalImage(
      images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]
    );
  }, [currentIndex, images]);

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
              onClick={() => openModal(item, index)}
              className="w-full h-full object-cover rounded-lg border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>
      {/* Modal Dialog */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={closeModal}
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
            <div className="relative w-full h-full min-h-[80vh] flex items-center justify-center">
              <button
                onClick={goToPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-neutral-200/60 hover:bg-neutral-300/70 text-neutral-800 dark:bg-black/30 dark:hover:bg-black/60 dark:text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 transition-opacity"
                aria-label="Previous slide"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 md:h-6" />
              </button>
              <img
                src={modalImage}
                alt="Modal image"
                className="object-contain w-full h-full max-h-[80vh]"
              />
              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-neutral-200/60 hover:bg-neutral-300/70 text-neutral-800 dark:bg-black/30 dark:hover:bg-black/60 dark:text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 transition-opacity"
                aria-label="Next slide"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 md:h-6" />
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Close image modal"
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
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded shadow">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
