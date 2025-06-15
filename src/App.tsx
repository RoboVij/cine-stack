// import Layout from "./components/Layout.tsx";
// import { Suspense, lazy } from "react";
// import Loading from "./components/Loading.tsx";
// import { useAppSelector } from "../redux/hooks";
// import { selectIsDarkMode } from "../redux/slices/themeSlice";
// import { ThemeProvider } from "styled-components";
// import { darkTheme, lightTheme } from "./styles/theme";
// import { GlobalStyle } from "../styles/globalStyles";
// import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routes/Router";
import Navbar from "./components/Navbar";

const App = () => {
  // const isDarkMode = useAppSelector(selectIsDarkMode);

  // useEffect(() => {
  //   document.documentElement.setAttribute(
  //     "data-theme",
  //     isDarkMode ? "dark" : "light"
  //   );
  // }, [isDarkMode]);

  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;

// CineStack – A Movie Discovery & Watchlist App
// Summary:
// Build an app that lets users browse, search, and save movies to a personal watchlist. Pull data from a public movie API like TMDb or OMDb.
// Key Features:
// Search & Browse Movies (by genre, popularity, release year)
// View Movie Details (cast, synopsis, rating, etc.)
// Add to Watchlist / Mark as Watched
// Pagination & Infinite Scroll
// Redux Toolkit to manage movie data, filters, and watchlist state
// Forms using React Hook Form for a simple user review feature
// Routing for search (/search?q=blade), details (/movie/:id), and user pages (/watchlist)
// Why It’s Great:
// Mimics real streaming UIs like Netflix or Letterboxd
// Combines async data fetching, form handling, and conditional UI
// Opportunities to expand: auth, filters, ratings, and reviews

// MVP Features:
// ✅ Browse popular movies
// ✅ Search movies by keyword
// ✅ View detailed info for each movie (poster, synopsis, rating, etc.)
// ✅ Add/remove movies from personal Watchlist
// ✅ Mark movies as Watched
// ✅ Responsive layout

// Stretch Goals (Add Later):
// ⭐ Filter by genre / release year
// ⭐ Submit user rating or short review
// ⭐ Authentication (mock or Firebase)
// ⭐ Dark mode
