import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import { BookmarkPlus, CircleEllipsis } from "lucide-react";
import AddMovieListModal from "../Modals/AddMovieListModal";
import { openAddMovieListModal } from "../../redux/slices/modals/addMovieListModalSlice";
import { openManageMovieListModal } from "../../redux/slices/modals/manageMovieListModalSlice";

interface ContentCardProps {
  item: any;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const { IDs = [], isLoading } = useSelector(
    (state: RootState) => state.getAllItemIDs
  );
  const dispatch = useDispatch<AppDispatch>();
  const [showAddToListModal, setShowAddToListModal] = useState<boolean>(false);
  const normalizedItemId = item?.id !== undefined ? Number(item.id) : null;
  const isInDb =
    normalizedItemId !== null &&
    IDs.map(String).includes(String(normalizedItemId));

  function formatDate(input: string): string {
    const date = new Date(input);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="rounded-lg border text-card-foreground w-44 sm:w-52 md:w-60 flex-shrink-0 overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-primary/30 bg-[#262239] border-[#414158] group flex flex-col justify-between">
      <Link
        className="block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-t-lg flex-grow"
        to={`/media/${item?.media_type}/${item?.id}`}
      >
        <div className="flex flex-col space-y-1.5 p-0 relative">
          <img
            alt={item?.title || "Movie Poster"}
            data-ai-hint="movie poster"
            loading="lazy"
            width="240"
            height="320"
            decoding="async"
            data-nimg="1"
            className="object-cover w-full h-56 sm:h-64 md:h-80 rounded-lg"
            src={item?.posterUrl}
            style={{ color: "transparent" }}
          />
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white hover:text-primary rounded-full h-9 w-9 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            aria-label="Add to My List"
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
              className="lucide lucide-bookmark-plus h-5 w-5 text-white"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              <line x1="12" x2="12" y1="7" y2="13"></line>
              <line x1="15" x2="9" y1="10" y2="10"></line>
            </svg>
          </button>
        </div>
        <div className="p-3 space-y-1">
          <div
            className="tracking-tight text-md font-semibold truncate text-foreground"
            title={item?.title || item?.name || "Untitled"}
          >
            {item?.title || item?.name || "Untitled"}
          </div>
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#2d2d43] text-secondary-foreground hover:bg-[#2d2d43]/80 mt-1 text-xs">
            {item?.genre}
          </div>
          <div className="flex items-center text-xs text-muted-foreground pt-1">
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
              className="lucide lucide-calendar-days mr-1.5 h-3.5 w-3.5 text-blue-400"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg>
            <span>
              {formatDate(item?.release_date || item?.first_air_date)}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-center p-3 pt-2 mt-auto">
        {isLoading ? (
          <ButtonSkeleton />
        ) : isInDb ? (
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#9174e7] text-black hover:bg-[#9174e7]/90 h-9 rounded-md px-3 w-full transition-all duration-200 ease-in-out cursor-pointer"
            onClick={() => dispatch(openManageMovieListModal(item))}
          >
            <CircleEllipsis className="mr-2 h-4 w-4" />
            Manage in Lists
          </button>
        ) : (
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-[#414158] border-input bg-[#181528] hover:bg-[#719df4] hover:text-black h-9 rounded-md px-3 w-full transition-all duration-200 ease-in-out cursor-pointer"
            aria-pressed="false"
            onClick={() => dispatch(openAddMovieListModal(item))}
          >
            <BookmarkPlus className="mr-2 h-4 w-4" />
            Add to My List
          </button>
        )}
      </div>
      {showAddToListModal && (
        <AddMovieListModal
          onClose={() => setShowAddToListModal(false)}
          movieDetails={item}
        />
      )}
    </div>
  );
};

export default ContentCard;

const ButtonSkeleton = () => {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-[#414158] border-input bg-[#181528] hover:bg-[#719df4] hover:text-accent-foreground h-9 rounded-md px-3 w-full transition-all duration-200 ease-in-out animate-pulse"
      aria-pressed="false"
    ></button>
  );
};
