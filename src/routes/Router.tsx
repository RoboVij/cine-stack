import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import MovieDetails from "../pages/MovieDetails.tsx";
import Search from "../pages/Search.tsx";
import Watchlist from "../pages/Watchlist.tsx";
import NotFound from "../pages/NotFound.tsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
