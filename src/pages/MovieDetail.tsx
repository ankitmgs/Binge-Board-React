import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMediaCredits,
  getMediaDetails,
  getMediaImages,
  getWatchProviders,
} from "../services/tmdb";
import {
  TMDB_BACKDROP_BASE_URL,
  TMDB_IMAGE_BASE_URL,
} from "../constant/apiUrl";
import MovieDetailsGallery from "../components/MovieDetail/MovieDetailsGallery";
import CastDetails from "../components/MovieDetail/CastDetails";
import { Skeleton } from "../ui/skeleton";
import { PlayCircle } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MovieDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [movieDetails, setMovieDetails] = useState<null | any>(null);
  const [mediaImages, setMediaImages] = useState([]);
  const [mediaCredits, setMediaCredits] = useState([]);
  const [watchProviders, setWatchProviders] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeasonData, setSelectedSeasonData] = useState<{
    season_number: string;
    name: string;
  } | null>(null);
  console.log("Movie ID:", movieDetails);

  const getMoviesDetails = async () => {
    if (!type || !id) {
      setError("Invalid URL: Missing type or id.");
      setLoading(false);
      return;
    }
    try {
      const response = await getMediaDetails(type as "movie" | "tv", id);
      setMovieDetails(response);
    } catch (err) {
      setError("Failed to fetch movie details.");
    }
  };

  const getMediaImagesAPI = async () => {
    if (!type || !id) return;
    try {
      const response = await getMediaImages(type as "movie" | "tv", id);
      const images = (response?.backdrops || []).map(
        (b: { file_path: string }) => `${TMDB_BACKDROP_BASE_URL}${b.file_path}`
      );
      setMediaImages(images);
    } catch (err) {
      // Optionally set error
    }
  };

  const getMediaCreditsAPI = async () => {
    if (!type || !id) return;
    try {
      const response = await getMediaCredits(id, type as "movie" | "tv");
      setMediaCredits(response);
    } catch (err) {
      // Optionally set error
    }
  };

  const getWatchProvidersAPI = async () => {
    if (!type || !id) return;
    try {
      const response = await getWatchProviders(id, type as "movie" | "tv");
      setWatchProviders(response);
    } catch (err) {
      console.error("Failed to fetch watch providers:", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      getMoviesDetails(),
      getMediaImagesAPI(),
      getMediaCreditsAPI(),
      getWatchProvidersAPI(),
    ]).finally(() => setLoading(false));
  }, [type, id]);

  function formatDateToReadable(dateString: string = ""): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  function formatRuntime(runtimeMinutes: number | undefined): string {
    if (runtimeMinutes === undefined || runtimeMinutes === 0) return "N/A";
    const hours = Math.floor(runtimeMinutes / 60);
    const minutes = runtimeMinutes % 60;
    let formatted = "";
    if (hours > 0) formatted += `${hours}h `;
    if (minutes > 0) formatted += `${minutes}m`;
    return formatted.trim() || "N/A";
  }

  if (loading) {
    return (
      <main className="container mx-auto py-6 sm:py-8 px-4">
        <Skeleton className="relative h-56 sm:h-64 md:h-96 rounded-lg mb-6 sm:mb-8" />
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          <div className="w-full md:w-1/3">
            <Skeleton className="rounded-lg shadow-2xl mx-auto md:mx-0 w-full max-w-xs sm:max-w-sm md:max-w-full h-[450px] sm:h-[525px] md:h-[600px]" />
          </div>
          <div className="w-full md:w-2/3">
            <Skeleton className="h-10 w-3/4 mb-2 sm:mb-3" />
            <Skeleton className="h-6 w-1/2 mb-4 sm:mb-6" />
            <Skeleton className="h-8 w-full mb-3 sm:mb-4" />
            <Skeleton className="h-9 w-40 mt-4 mb-4" />
            <Skeleton className="h-8 w-32 mb-2 mt-4" />
            <Skeleton className="h-5 w-1/2 mb-1" />
            <Skeleton className="h-5 w-1/2 mb-1" />
            <Skeleton className="h-8 w-40 mb-3 mt-6" />
            <div className="flex gap-3 mb-3 mt-2">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <Skeleton className="h-8 w-32 mb-2 mt-4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </main>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-lg text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex-grow mt-16">
      <main className="container mx-auto py-6 sm:py-8 px-4">
        <div className="relative h-56 sm:h-64 md:h-96 rounded-lg overflow-hidden mb-6 sm:mb-8 shadow-lg">
          <img
            alt="Backdrop for Final Destination Bloodlines"
            data-ai-hint="movie scene"
            decoding="async"
            data-nimg="fill"
            className="opacity-50"
            sizes="100vw"
            src={`https://image.tmdb.org/t/p/w1280${
              movieDetails?.backdrop_path || ""
            }`}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              objectFit: "cover",
              color: "transparent",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent bg-custom-gradient"
            style={{
              backgroundImage:
                "linear-gradient(0deg, hsl(250 30% 12% / 1), transparent)",
            }}
          ></div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 relative -mt-24 sm:-mt-32 md:-mt-48 z-10">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              alt={`Poster for ${movieDetails?.title || "Movie Title"}`}
              data-ai-hint="movie poster"
              loading="lazy"
              width="400"
              height="600"
              decoding="async"
              data-nimg="1"
              className="rounded-lg shadow-2xl mx-auto md:mx-0 w-full max-w-xs sm:max-w-sm md:max-w-full"
              src={`${TMDB_BACKDROP_BASE_URL}${
                movieDetails?.poster_path || ""
              }`}
              style={{ color: "transparent" }}
            />
          </div>
          <div className="w-full md:w-2/3 text-foreground">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3 tracking-tight">
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, hsl(255 70% 68%) , hsl(220 85% 70%) , hsl(255 70% 68%))",
                }}
              >
                {movieDetails?.title || movieDetails?.name || "Movie Title"}
              </span>
            </h1>
            {movieDetails?.tagline && (
              <p className="text-lg sm:text-xl text-[#8585ad] italic mb-4 sm:mb-6">
                {movieDetails?.tagline || "Unknown tagline"}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 mb-3 sm:mb-4 text-sm sm:text-base">
              <div className="flex items-center">
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
                  className="lucide lucide-star h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-yellow-400"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                <span>
                  {movieDetails?.vote_average
                    ? movieDetails?.vote_average.toFixed(1)
                    : "N/A"}{" "}
                  ({movieDetails?.vote_count} votes)
                </span>
              </div>
              <div className="flex items-center">
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
                  className="lucide lucide-calendar-days h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-blue-400"
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
                  {formatDateToReadable(
                    movieDetails?.release_date ||
                      movieDetails?.first_air_date ||
                      ""
                  )}
                </span>
              </div>
              {(movieDetails?.runtime || movieDetails?.episode_run_time[0]) && (
                <div className="flex items-center">
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
                    className="lucide lucide-clock h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-green-400"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {movieDetails?.runtime && (
                    <span>{formatRuntime(movieDetails?.runtime)}</span>
                  )}
                  {movieDetails?.episode_run_time[0] && (
                    <span>{movieDetails?.episode_run_time}m</span>
                  )}
                </div>
              )}
              <div className="flex items-center">
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
                  className="lucide lucide-clapperboard h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-purple-400"
                >
                  <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path>
                  <path d="m6.2 5.3 3.1 3.9"></path>
                  <path d="m12.4 3.4 3.1 4"></path>
                  <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>
                </svg>
                <span className="capitalize">{type}</span>
              </div>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-[#181528] hover:bg-accent hover:text-accent-foreground h-10 w-full md:w-auto mt-4 py-3 px-6 text-base border border-[1px] border-[#363649]"
              aria-pressed="false"
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
                className="lucide lucide-bookmark-plus mr-2 h-4 w-4"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                <line x1="12" x2="12" y1="7" y2="13"></line>
                <line x1="15" x2="9" y1="10" y2="10"></line>
              </svg>
              Add to My List
            </button>
            <div className="my-4 sm:my-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-[#9174e7]">
                Genres
              </h2>
              <div className="flex flex-wrap gap-2">
                {movieDetails?.genres?.map((genre: any) => (
                  <div
                    key={genre.id}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#2d2d43] text-[#c6c6ec] hover:bg-[#2d2d43]/80 text-xs sm:text-sm"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-[#9174e7]">
                Overview
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-[#8585ad]">
                {movieDetails?.overview ||
                  "No overview available for this movie."}
              </p>
            </div>
            <div className="my-6 sm:my-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-[#9174e7]">
                Where to Watch
              </h2>
              <div
                data-orientation="horizontal"
                role="none"
                className="shrink-0 bg-[#414158] h-[1px] w-full mb-4"
              ></div>
              {watchProviders?.flatrate ? (
                <div className="flex flex-wrap gap-3 items-center mt-2">
                  {watchProviders?.flatrate?.map((provider: any) => (
                    <a
                      key={provider.provider_id}
                      href={
                        watchProviders?.link ||
                        `https://www.themoviedb.org/${mediaType}/${id}/watch?locale=IN`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center w-16"
                      title={provider.provider_name}
                    >
                      {provider.logo_path ? (
                        <img
                          src={provider.logo_path}
                          alt={provider.provider_name}
                          width={40}
                          height={40}
                          className="rounded-md object-contain h-10 w-10 transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="h-10 w-10 flex items-center justify-center text-muted-foreground"
                          title={provider.provider_name}
                        >
                          <PlayCircle className="h-8 w-8" />
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-[#8585ad]">
                  Watch information not available for India.
                </p>
              )}
            </div>
          </div>
        </div>
        {type === "tv" && (
          <div className="mt-8 sm:mt-12">
            <div
              data-orientation="horizontal"
              role="none"
              className="shrink-0 bg-[#414158] h-[1px] w-full my-6 sm:my-8"
            ></div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#9174e7]">
              Seasons &amp; Episodes
            </h2>
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="season-select-detail"
                  className="text-base font-medium mb-2 block"
                >
                  Select a Season
                </Label>
                <Select
                  value={selectedSeasonData?.season_number || ""}
                  onValueChange={(value) => {
                    const season = movieDetails?.seasons.find(
                      (s) => s.season_number.toString() === value
                    );
                    setSelectedSeasonData(
                      season
                        ? {
                            season_number: season.season_number.toString(),
                            name: season.name,
                          }
                        : null
                    );
                  }}
                >
                  <SelectTrigger
                    id="season-select-detail"
                    className="w-full md:w-1/2 lg:w-1/3 bg-[#262239] border-[#414158] hover:border-primary/50 focus:border-primary focus:ring-primary"
                  >
                    <SelectValue placeholder="Choose a season" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#262239] border-[#414158]">
                    {movieDetails?.seasons?.map((season) => (
                      <SelectItem
                        key={season.id}
                        value={season.season_number.toString()}
                        className="hover:bg-[#719df4] focus:bg-[#719df4] hover:text-black"
                      >
                        {season.name} (Season {season.season_number}) -{" "}
                        {season.episode_count} episodes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 sm:mt-12">
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-[#414158] h-[1px] w-full my-6 sm:my-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#9174e7]">
              Gallery
            </h2>
            <div
              className="relative overflow-hidden w-full whitespace-nowrap rounded-md pb-4"
              style={{ position: "relative" }}
            >
              <MovieDetailsGallery images={mediaImages} />
            </div>
            <div className="my-6 sm:my-8">
              <div
                data-orientation="horizontal"
                role="none"
                className="shrink-0 bg-[#414158] h-[1px] w-full"
              ></div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 mt-6 text-[#9174e7]">
                Status
              </h2>
              <p className="text-base md:text-lg text-[#8585ad]">
                {movieDetails?.status || "Unknown Status"}
              </p>
            </div>
            <div className="mt-8 sm:mt-12">
              <CastDetails mediaCredits={mediaCredits} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
