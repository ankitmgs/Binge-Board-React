import { useEffect, useState } from "react";
import { HeroBanner } from "../components/banner/HeroBanner";
import HomeMoviesSection from "../components/homeMovies";
import { getNowPlayingMovies } from "../services/tmdb";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { getAllList } from "../redux/rtk-apis/getList";

function Home() {
  const [item, setItem] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getAllList());
    getNowPlayingMovies().then((data) => {
      if (Array.isArray(data)) {
        setItem(data);
      } else if (data && Array.isArray(data.results)) {
        setItem(data.results);
      } else {
        setItem([]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <main className="container mx-auto py-6 sm:py-8 mt-[65px]">
      <div className="px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-8 text-center tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600">
            BingeBoard
          </span>
        </h1>
      </div>

      <HeroBanner items={item} loading={loading} />

      <HomeMoviesSection />
    </main>
  );
}

export default Home;
