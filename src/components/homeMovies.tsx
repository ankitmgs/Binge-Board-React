import { Brush, Film, Tv, VideoIcon, Wind } from "lucide-react";
import { useEffect } from "react";
import { getHollywoodMovies } from "../services/tmdb";
import CarouselSectionSkeleton from "../ui/CarouselSectionSkeleton";
import { ContentCarousel } from "./content/content-carousel";

const HomeMoviesSection = () => {
  const moviesCategories = [
    {
      id: "hollywood",
      title: "Hollywood Movies",
      icon: (
        <Film className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "movie",
    },
    {
      id: "bollywood",
      title: "Bollywood Movies",
      icon: (
        <VideoIcon className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "movie",
    },
    {
      id: "webseries",
      title: "Web Series",
      icon: (
        <Tv className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "tv",
    },
    {
      id: "anime",
      title: "Popular Anime Series",
      icon: (
        <Wind className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "tv",
    },
    {
      id: "animation",
      title: "Animated Movies",
      icon: (
        <Brush className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "movie",
    },
  ];

  useEffect(() => {
    getHollywoodMovies().then((data) => {
      console.log("Hollywood Movies Data:", data);
    });
  }, []);

  return (
    <>
      {moviesCategories.map((caterogies, index) => {
        return (
          <section className="my-8 sm:my-10" key={index}>
            <div
              key={index}
              className="flex justify-between items-center mb-4 sm:mb-6 px-4"
            >
              <h2
                className="text-2xl sm:text-3xl font-bold text-primary flex items-center"
                style={{ color: "hsl(255 70% 68%)" }}
              >
                {caterogies?.icon}
                {caterogies?.title}
              </h2>
            </div>
            {true ? (
              <CarouselSectionSkeleton icon={caterogies.icon} />
            ) : (
              <div>No data available</div>
            )}
            {<ContentCarousel items={moviesCategories} isUpcomingSection={false} />}
          </section>
        );
      })}
    </>
  );
};

export default HomeMoviesSection;
