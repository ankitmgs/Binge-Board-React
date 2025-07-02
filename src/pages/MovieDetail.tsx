import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMediaDetails } from "../services/tmdb";

const MovieDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  console.log("Movie ID:", id, type);

  const getMoviesDetails = async () => {
    const response = await getMediaDetails(type, id);
    console.log(response);
  };

  useEffect(() => {
    getMoviesDetails();
  }, []);

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
            src="/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=3840&amp;q=75 3840w"
            src="http://localhost:9002/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw1280%2FuIpJPDNFoeX0TVml9smPrs9KUVx.jpg&amp;w=3840&amp;q=75"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              objectFit: "cover",
              color: "transparent",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 relative -mt-24 sm:-mt-32 md:-mt-48 z-10">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              alt="Poster for Final Destination Bloodlines"
              data-ai-hint="movie poster"
              loading="lazy"
              width="400"
              height="600"
              decoding="async"
              data-nimg="1"
              className="rounded-lg shadow-2xl mx-auto md:mx-0 w-full max-w-xs sm:max-w-sm md:max-w-full"
              src="/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2F6WxhEvFsauuACfv8HyoVX6mZKFj.jpg&amp;w=640&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2F6WxhEvFsauuACfv8HyoVX6mZKFj.jpg&amp;w=828&amp;q=75 2x"
              src="http://localhost:9002/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2F6WxhEvFsauuACfv8HyoVX6mZKFj.jpg&amp;w=828&amp;q=75"
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
                Final Destination Bloodlines
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#8585ad] italic mb-4 sm:mb-6">
              "Death runs in the family."
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 mb-3 sm:mb-4 text-sm sm:text-base">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-star h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-yellow-400"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                <span>7.2 (1442 votes)</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                <span>May 14, 2025</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-clock h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-green-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>1h 50m</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-clapperboard h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-purple-400"
                >
                  <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path>
                  <path d="m6.2 5.3 3.1 3.9"></path>
                  <path d="m12.4 3.4 3.1 4"></path>
                  <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>
                </svg>
                <span className="capitalize">movie</span>
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#2d2d43] text-[#c6c6ec] hover:bg-[#2d2d43]/80 text-xs sm:text-sm">
                  Horror
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#2d2d43] text-[#c6c6ec] hover:bg-[#2d2d43]/80 text-xs sm:text-sm">
                  Mystery
                </div>
              </div>
            </div>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-[#9174e7]">
                Overview
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-[#8585ad]">
                Plagued by a violent recurring nightmare, college student
                Stefanie heads home to track down the one person who might be
                able to break the cycle and save her family from the grisly
                demise that inevitably awaits them all.
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
              <p className="text-[#8585ad]">
                Watch information not available for India.
              </p>
            </div>
          </div>
        </div>
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
                <div className="h-full w-full rounded-[inherit]" style={{overflow: "scroll"}}>
                    <div style={{minWidth: "100%", display: "table"}}>
                        <div className="flex space-x-4">
                            Here the slider will come
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
