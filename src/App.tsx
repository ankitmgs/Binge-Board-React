import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged, auth } from "./services/firebase";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./userSlice";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setIsAuthenticated(!!user);
      setLoading(false);
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email || null,
            displayName: user.displayName || null,
            photoURL: user.photoURL || null,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return null; // or a spinner
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <nav
      >
        <Header />
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/media/:type/:id" element={<MovieDetail />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
