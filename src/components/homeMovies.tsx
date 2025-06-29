import { Brush, Film, Tv, VideoIcon, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAnimatedMovies,
  getAnimeSeries,
  getBollyWoodMovies,
  getHollywoodMovies,
  getWebSeries,
} from "../services/tmdb";
import CarouselSectionSkeleton from "../ui/CarouselSectionSkeleton";
import { ContentCarousel } from "./content/content-carousel";

const HomeMoviesSection = () => {
  const [categoryData, setCategoryData] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string | null }>({});

  const moviesCategories = [
    {
      id: "hollywood",
      title: "Hollywood Movies",
      icon: (
        <Film className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "movie",
      fetcher: getHollywoodMovies,
    },
    {
      id: "bollywood",
      title: "Bollywood Movies",
      icon: (
        <VideoIcon className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "movie",
      fetcher: getBollyWoodMovies,
    },
    {
      id: "webseries",
      title: "Web Series",
      icon: (
        <Tv className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "tv",
      fetcher: getWebSeries,
    },
    {
      id: "anime",
      title: "Popular Anime Series",
      icon: (
        <Wind className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "tv",
      fetcher: getAnimeSeries,
    },
    {
      id: "animation",
      title: "Animated Movies",
      icon: (
        <Brush className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
      ),
      mediaTypeContext: "movie",
      fetcher: getAnimatedMovies,
    },
  ];

  useEffect(() => {
    // Use Promise.all to fetch all categories in parallel and avoid closure issues
    const fetchAll = async () => {
      const newCategoryData: { [key: string]: any[] } = {};
      const newLoading: { [key: string]: boolean } = {};
      const newError: { [key: string]: string | null } = {};
      await Promise.all(
        moviesCategories.map(async (cat) => {
          newLoading[cat.id] = true;
          console.log("webseries", cat.id);
          if (cat.id === "webseries") {
            console.warn("webseries", cat.id, "is not implemented yet");
          }
          try {
            const data = await cat.fetcher();
            console.log("Fetched data for category:", cat.id, data);
            if (data?.error) {
              newError[cat.id] = data.message || "Error fetching data";
              newCategoryData[cat.id] = [];
            } else {
              newCategoryData[cat.id] = data || [];
              newError[cat.id] = null;
            }
          } catch (err: any) {
            newError[cat.id] = err?.message || "Unknown error";
            newCategoryData[cat.id] = [];
          } finally {
            newLoading[cat.id] = false;
          }
        })
      );
      setCategoryData(newCategoryData);
      setLoading(newLoading);
      setError(newError);
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {moviesCategories.map((category, index) => (
        <section className="my-8 sm:my-10" key={index}>
          <div className="flex justify-between items-center mb-4 sm:mb-6 px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-primary flex items-center"
              style={{ color: "hsl(255 70% 68%)" }}
            >
              {category.icon}
              {category.title}
            </h2>
          </div>
          {loading[category.id] ? (
            <CarouselSectionSkeleton icon={category.icon} />
          ) : error[category.id] ? (
            <div className="text-red-500 px-4">{error[category.id]}</div>
          ) : categoryData[category.id]?.length ? (
            <ContentCarousel
              items={categoryData[category.id]}
              isUpcomingSection={false}
            />
          ) : (
            <div className="px-4">No data available</div>
          )}
        </section>
      ))}
    </>
  );
};

export default HomeMoviesSection;
