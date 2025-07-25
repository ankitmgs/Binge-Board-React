import { useSelector } from "react-redux";
import BackgroundImage from "../assets/default.png";
import type { RootState } from "../store";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user) as {
    uid: string | null;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  };
  const userHaveList = true;

  return (
    <main className="mt-16 pb-8">
      <div
        className="h-48 md:h-60 w-full bg-muted bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        data-ai-hint="banner abstract"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-background/70 hover:bg-background text-foreground z-10"
          title="Edit Profile (Cover, Avatar, Bio)"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>
      <div className="container mx-auto px-4">
        <div className="bg-[#262239] p-4 sm:p-6 rounded-lg shadow-xl relative -mt-10 md:-mt-16 mx-auto max-w-4xl border-border/30">
          <Link to="/settings">
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-[#719df4] absolute top-3 right-3 sm:top-4 sm:right-4 h-8 w-8 text-[#8585ad] hover:text-[#9174e7] z-20 hover:bg-[#9174e7]"
              title="Go to Settings"
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
                className="lucide lucide-settings h-5 w-5"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </Link>
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <span className="relative flex shrink-0 overflow-hidden h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-[#181528] shadow-md -mt-12 sm:-mt-16 flex-shrink-0">
              <img
                className="aspect-square h-full w-full object-cover"
                alt={user?.displayName || user?.email || "User Name"}
                data-ai-hint="profile avatar"
                src={
                  user?.photoURL ||
                  "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                }
              />
            </span>
            <div className="flex-1 text-center sm:text-left pt-4 sm:pt-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center sm:text-left">
                {user?.displayName || "User Name"}
              </h1>
              <p className="text-sm text-[#8585ad] mt-1 break-words line-clamp-3 text-center sm:text-left">
                No bio yet. Click the edit icon on the cover to add one.
              </p>
            </div>
          </div>
          {/*When user have list then will show */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#9174e7]">
                My Lists
              </h2>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input bg-[#181528] hover:bg-[#719df4] hover:text-[#121721] h-10 w-10"
                  title="Refresh lists"
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
                    className="lucide lucide-refresh-cw h-5 w-5"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5"></path>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                    <path d="M8 16H3v5"></path>
                  </svg>
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input bg-[#181528] hover:bg-[#719df4] hover:text-[#121721] h-10 w-10"
                  title="Import List"
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
                    className="lucide lucide-file-plus2 h-5 w-5"
                  >
                    <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M3 15h6"></path>
                    <path d="M6 12v6"></path>
                  </svg>
                </button>
                {userHaveList && (
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-[#9174e7] text-[#161221] hover:bg-[#9174e7]/90 px-4 py-2 h-10">
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
                      className="lucide lucide-circle-plus mr-2 h-5 w-5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 12h8"></path>
                      <path d="M12 8v8"></path>
                    </svg>{" "}
                    Create New List
                  </button>
                )}
              </div>
            </div>
            {userHaveList ? (
              <div>
                <div className="mb-6">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium">
                    Filter by Genre (across all lists)
                  </label>
                  <button
                    type="button"
                    role="combobox"
                    aria-controls="radix-«r0»"
                    aria-expanded="false"
                    aria-autocomplete="none"
                    dir="ltr"
                    data-state="closed"
                    className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-[#8585ad] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 w-full md:w-1/2 mt-1"
                    id="genre-filter-my-list"
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
                      className="lucide lucide-filter mr-2 h-4 w-4 text-[#8585ad]"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    <span style={{ pointerEvents: "none" }}>
                      All My List Genres
                    </span>
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
                      className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                    className="rounded-lg text-card-foreground shadow-sm flex flex-col justify-between bg-[#262239]/80 hover:shadow-[#9174e7]/20 transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 "
                    style={{ border: "1px solid #414158" }}
                  >
                    <div className="flex flex-col space-y-1.5 cursor-pointer group hover:bg-[#3d3d524d]/30 transition-colors p-4">
                      <div className="flex justify-between items-start">
                        <Link
                          className="block flex-grow outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm min-w-0 group-hover:text-[#9174e7] transition-colors"
                          to="/me/list/list-1753170914309-xxjutvl"
                        >
                          <div className="tracking-tight text-lg sm:text-xl font-semibold break-words">
                            test
                          </div>
                          <div className="text-[#8585ad] text-xs group-hover:text-[#9174e7]/80 transition-colors mt-0.5">
                            1 item
                          </div>
                        </Link>
                        <button
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-[#719df4] text-[#8585ad] hover:text-[#9174e7] flex-shrink-0 ml-2 h-8 w-8"
                          data-action-button="true"
                          title="Pin list"
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
                            className="lucide lucide-pin h-4 w-4"
                          >
                            <path d="M12 17v5"></path>
                            <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path>
                          </svg>
                          <span className="sr-only">Pin list</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end items-center gap-1 p-3 border-t border-border/50">
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-[#719df4] hover:text-[#121721] h-8 w-8"
                        data-action-button="true"
                        title="Export list"
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
                          className="lucide lucide-share2 h-4 w-4 text-[#8585ad] hover:text-[#9174e7]"
                        >
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line
                            x1="8.59"
                            x2="15.42"
                            y1="13.51"
                            y2="17.49"
                          ></line>
                          <line
                            x1="15.41"
                            x2="8.59"
                            y1="6.51"
                            y2="10.49"
                          ></line>
                        </svg>
                        <span className="sr-only">Export list</span>
                      </button>
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-[#719df4] hover:text-[#121721] h-8 w-8"
                        data-action-button="true"
                        title="Rename list"
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
                          className="lucide lucide-pen-line h-4 w-4 text-[#8585ad] hover:text-[#9174e7]"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"></path>
                        </svg>
                        <span className="sr-only">Rename list</span>
                      </button>
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-[#8585ad] hover:text-[#d74242] hover:bg-[#d74242]/10 h-8 w-8"
                        data-action-button="true"
                        title="Delete list"
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
                          className="lucide lucide-trash2 h-4 w-4"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" x2="10" y1="11" y2="17"></line>
                          <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                        <span className="sr-only">Delete list</span>
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-[#719df4] hover:text-[#121721] rounded-md h-8 px-2 text-xs">
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
                          className="lucide lucide-eye mr-1.5 h-3.5 w-3.5"
                        >
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>{" "}
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-[#3d3d52] rounded-lg">
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
                  className="lucide lucide-list-x h-16 w-16 sm:h-20 sm:w-20 text-[#8585ad] mx-auto mb-6"
                >
                  <path d="M11 12H3"></path>
                  <path d="M16 6H3"></path>
                  <path d="M16 18H3"></path>
                  <path d="m19 10-4 4"></path>
                  <path d="m15 10 4 4"></path>
                </svg>
                <p className="text-[#8585ad] text-xl sm:text-2xl font-medium mb-3">
                  You haven't created any lists yet.
                </p>
                <p className="text-[#8585ad] text-sm sm:text-base mb-8">
                  Start organizing your favorite movies and shows!
                </p>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-[#9174e7] text-[#161221] hover:bg-[#9174e7]/90 h-11 rounded-md px-8">
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
                    className="lucide lucide-circle-plus mr-2 h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                  Create Your First List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
