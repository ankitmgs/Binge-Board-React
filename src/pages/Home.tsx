import { useEffect, useState } from "react";
import { HeroBanner } from "../components/banner/HeroBanner";
import HomeMoviesSection from "../components/homeMovies";
import { getNowPlayingMovies } from "../services/tmdb";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { getAllList } from "../redux/rtk-apis/getList";
import { getAllItemIDs } from "../redux/rtk-apis/allItemIDs";
import AddMovieListModal, {
  type Movie,
} from "../components/Modals/AddMovieListModal";
import {
  closeAddMovieListModal,
  type AddMovieListModalState,
  type MovieDetails,
} from "../redux/slices/modals/addMovieListModalSlice";
import ManageMovieListModal from "../components/Modals/ManageMovieListModal";
import { closeManageMovieListModal } from "../redux/slices/modals/manageMovieListModalSlice";

function Home() {
  const [item, setItem] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { lists } = useSelector((state: RootState) => state.getAllList);
  const { IDs } = useSelector((state: RootState) => state.getAllItemIDs);
  const { isOpen, movieDetails }: any = useSelector(
    (state: RootState) => state.addMovieListModal
  );
  const { isOpen: isManageModalOpen, movieDetails: manageMovieDetails }: any =
    useSelector((state: RootState) => state.manageMovieListModalList);
  useEffect(() => {
    if (!lists.length) {
      dispatch(getAllList());
    }
    if (!IDs.length) {
      dispatch(getAllItemIDs());
    }
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
      {isOpen && (
        <AddMovieListModal
          onClose={() => dispatch(closeAddMovieListModal())}
          movieDetails={movieDetails}
        />
      )}
      {isManageModalOpen && (
        <ManageMovieListModal
          onClose={() => dispatch(closeManageMovieListModal())}
          movieDetails={manageMovieDetails}
        />
      )}
    </main>
  );
}

export default Home;
