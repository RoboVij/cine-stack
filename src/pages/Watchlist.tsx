import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Movie } from "../features/movies/moviesSlice";
import { removeFromWatchlist } from "../features/movies/watchlistSlice";
import { Link } from "react-router-dom";

const Watchlist: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.watchlist.items);

  if (items.length === 0) return <p>Your watchlist is currently empty.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Watchlist</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {items.map((movie: Movie) => (
          <div key={movie.id} style={{ width: "200px" }}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%" }}
              />
            </Link>
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
            <button onClick={() => dispatch(removeFromWatchlist(movie.id))}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Watchlist;
