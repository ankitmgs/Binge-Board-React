"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
import { Link } from "react-router-dom";
// import { button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Info,
  Loader2,
} from "lucide-react";
import { Skeleton } from "../../ui/skeleton";
// import type { Recommendation } from "@/services/tmdb";
// import { findYoutubeTrailer } from "../../ai/flows/find-youtube-trailer";

// interface HeroBannerProps {
//   items: Recommendation[];
// }

export function HeroBannerSkeleton() {
  return (
    <div className="relative mx-4 sm:mx-6 md:mx-8 h-[40vh] sm:h-[50vh] md:h-[70vh] bg-[#3d3d5280]/50 rounded-lg overflow-hidden shadow-lg mb-8">
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 max-w-2xl">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <div className="flex space-x-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

export function HeroBanner({ items }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);

  useEffect(() => {
    if (!items || items.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentSlide, items]);

  if (!items || items.length === 0) {
    return (
      <div className="relative mx-4 sm:mx-6 md:mx-8 h-[40vh] sm:h-[50vh] md:h-[70vh] bg-card rounded-lg overflow-hidden shadow-lg mb-8 flex items-center justify-center">
        <p className="text-muted-foreground text-xl">
          No trending movies to display in the banner right now.
        </p>
      </div>
    );
  }

  const currentSlideData = items[currentSlide];
  if (!currentSlideData) {
    return (
      <div className="relative mx-4 sm:mx-6 md:mx-8 h-[40vh] sm:h-[50vh] md:h-[70vh] bg-card rounded-lg overflow-hidden shadow-lg mb-8 flex items-center justify-center">
        <p className="text-muted-foreground text-xl">
          Error displaying banner content.
        </p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const { title, backdropUrl, posterUrl, overview, id, media_type } =
    currentSlideData;
  const effectiveBackdropUrl =
    backdropUrl ||
    posterUrl ||
    `https://placehold.co/1280x720.png?text=${encodeURIComponent(
      title || "No Backdrop"
    )}`;

  const handleWatchTrailer = () => {
    if (!title) return;
    const fallbackSearchQuery = `${title} official trailer`;
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        fallbackSearchQuery
      )}`,
      "_blank"
    );
  };

  return (
    <div className="relative mx-4 sm:mx-6 md:mx-8 h-[40vh] sm:h-[50vh] md:h-[70vh] rounded-lg overflow-hidden shadow-2xl mb-8 group">
      <img
        src={effectiveBackdropUrl}
        alt={`Backdrop for ${title}`}
        style={{ width: "100%" }}
        className="transition-transform duration-500 ease-in-out group-hover:scale-105"
        data-ai-hint="movie backdrop"
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/1280x720.png?text=${encodeURIComponent(
            title || "Error Loading Image"
          )}`;
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t"
        style={{
          backgroundImage: `linear-gradient(to top, hsl(250, 30%, 12%), hsl(250, 30%, 12%, 0.6) var(--tw-gradient-via-position), transparent)`,
        }}
      ></div>

      <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 lg:p-8 max-w-full md:max-w-3xl z-10">
        <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-1 sm:mb-2 drop-shadow-lg">
          {title}
        </h2>
        <p
          className="text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-2 md:line-clamp-3 drop-shadow-sm"
          style={{ color: "hsl(240, 20%, 60%)" }}
        >
          {overview}
        </p>
        <div className="flex flex-row items-center space-x-2 sm:space-x-3">
          <Link to={`/media/${media_type}/${id}`}>
            <button
              // size="default"
              // variant="default"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
              style={{
                backgroundColor: "hsl(255 70% 68%)",
                color: "hsl(255 30% 10%)",
              }}
            >
              <Info className="mr-2 h-4 sm:h-5 w-4 sm:w-5" /> View Details
            </button>
          </Link>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground shadow-md hover:shadow-lg transition-all"
            onClick={handleWatchTrailer}
            disabled={isTrailerLoading}
            style={{
              backgroundColor: "hsl(240 20% 22%)",
              color: "hsl(240, 20%, 90%)",
            }}
          >
            {isTrailerLoading ? (
              <Loader2 className="mr-2 h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
            ) : (
              <PlayCircle className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
            )}
            Watch Trailer
          </button>
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button
            // variant="ghost"
            // size="icon"
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-neutral-200/60 hover:bg-neutral-300/70 text-neutral-800 dark:bg-black/30 dark:hover:bg-black/60 dark:text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous slide"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 md:h-6" />
          </button>
          <button
            // variant="ghost"
            // size="icon"
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-neutral-200/60 hover:bg-neutral-300/70 text-neutral-800 dark:bg-black/30 dark:hover:bg-black/60 dark:text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next slide"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 md:h-6" />
          </button>
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 hidden lg:flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-primary scale-125"
                    : "bg-[#3d3d5280]-foreground/50 hover:bg-[#3d3d5280]-foreground/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
