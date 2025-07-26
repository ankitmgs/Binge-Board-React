import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllList } from "../redux/rtk-apis/getList";
import BackgroundImage from "../assets/default.png";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import CreateListModal from "../components/Modals/CreateListModal";
import type { AppDispatch, RootState } from "../redux/store";
import MyList from "../components/Lists/MyList";

const Profile = () => {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const user = useSelector((state: RootState) => state.user) as {
    uid: string | null;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  };
  const listsResponse = useSelector((state: RootState) => state.getAllList);
  const dispatch = useDispatch<AppDispatch>();

  const isListDataPresent =
    listsResponse &&
    listsResponse.lists &&
    Array.isArray(listsResponse.lists) &&
    listsResponse.lists.length > 0;

  useEffect(() => {
    if (!isListDataPresent) {
      dispatch(getAllList());
    }
  }, [isListDataPresent, dispatch]);

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
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 absolute top-3 right-3 sm:top-4 sm:right-4 h-8 w-8 text-[#8585ad] hover:text-[#9174e7] z-20 hover:bg-[#9174e7]"
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
                {listsResponse?.lists?.length && (
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-[#9174e7] text-[#161221] hover:bg-[#9174e7]/90 px-4 py-2 h-10"
                    onClick={() => setShowCreateListModal(true)}
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
            <MyList
              listsResponse={listsResponse}
              setShowCreateListModal={setShowCreateListModal}
            />
          </div>
        </div>
      </div>
      {showCreateListModal && (
        <CreateListModal onClose={() => setShowCreateListModal(false)} />
      )}
    </main>
  );
};

export default Profile;
