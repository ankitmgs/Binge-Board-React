import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { signOut, auth } from "../../services/firebase";
import { toast } from "react-toastify";
import { Sun, Moon } from "lucide-react";
import { onAuthStateChanged } from "../../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { clearUser } from "../../userSlice";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { getInitials } from "../../helper";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as {
    uid: string | null;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  };
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const renderAuthSection = () => {
    if (user && isAuthenticated) {
      return (
        <Link to="/me">
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full p-0 group"
            aria-label="My Profile and Lists"
          >
            <Avatar className="h-9 w-9 border-2 border-primary/30">
              <AvatarImage
                src={user.photoURL || undefined}
                alt={user.displayName || user.email || "User Avatar"}
                data-ai-hint="user avatar"
                className="object-cover"
              />
              <AvatarFallback email={user.email}>
                {user.displayName
                  ? getInitials(user.displayName, user.email)
                  : null}
              </AvatarFallback>
            </Avatar>
            {/* Responsive Tooltip on hover, shown below avatar */}
            <div
              className="user-tooltip invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200"
              style={{
                position: "absolute",
                top: "110%",
                border: "1px solid #aaa",
                borderRadius: "6px",
                padding: "12px 8px",
                right: "0",
                backgroundColor: "#111"
              }}
            >
              <span className="font-semibold break-words text-center w-full block mb-[5px]">
                {user.displayName || "No Name"}
              </span>
              <span className="opacity-80 break-words text-center w-full">
                {user.email || "No Email"}
              </span>
            </div>
          </Button>
        </Link>
      );
    }
    return null;
  };

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-border/40 bg-background/75 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60" style={{
                position: "fixed",
                backdropFilter: "blur(4px)",
                backgroundColor: "hsl(250 30% 12% / .6)",
                width: "100%",
                zIndex: "11"
              }}>
        <div className="container flex h-16 max-w-screen-2xl items-center mx-auto px-4">
          <Link
            to="/"
            className="mr-3 sm:mr-4 md:mr-6 flex items-center space-x-2 group"
          >
            <img
              src={logo}
              alt="BingeBoard Logo"
              width={32}
              height={32}
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary transition-transform group-hover:scale-110"
              data-ai-hint="logo popcorn"
            />
            <span
              className={`font-bold text-md sm:text-lg md:text-xl sm:inline-block whitespace-nowrap transition-colors ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              BingeBoard
            </span>
          </Link>
          <button
            onClick={toggleTheme}
            className="ml-auto mr-2 px-3 py-2 rounded bg-[#3d3d5280] text-foreground hover:bg-[#3d3d5280]/80 transition flex items-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          {isAuthenticated && (
            <>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded bg-primary hover:bg-primary/80 transition ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Logout
              </button>
              <div>Search</div>
              <div className="ml-2.5">{renderAuthSection()}</div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
