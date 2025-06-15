import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies, type Movie } from "../features/movies/moviesSlice";
import type { RootState, AppDispatch } from "../app/store";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../features/movies/watchlistSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popular, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const watchlist = useSelector((state: RootState) => state.watchlist.items);

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  return (
    <div>
      <h2>Popular Movies</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {popular.map((movie: Movie) => (
          <div key={movie.id} style={{ width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
            {watchlist.findIndex(
              (watchlistMovie: Movie) => watchlistMovie.id === movie.id
            ) === -1 ? (
              <button onClick={() => dispatch(addToWatchlist(movie))}>
                ➕ Add to Watchlist
              </button>
            ) : (
              <button onClick={() => dispatch(removeFromWatchlist(movie.id))}>
                ❌ Remove from Watchlist
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
