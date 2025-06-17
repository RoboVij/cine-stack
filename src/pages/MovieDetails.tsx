import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../app/store";
import { useParams } from "react-router-dom";
import type { Movie } from "../features/movies/moviesSlice";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../features/movies/watchlistSlice";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const watchlist = useSelector((state: RootState) => state.watchlist.items);
  const isInWatchlist = watchlist.some((item) => item.id === Number(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (!id) {
    return <p>Invalid movie ID</p>;
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        style={{ float: "left", marginRight: "2rem" }}
      />
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Rating:</strong> ⭐ {movie.vote_average}
      </p>
      <p>
        <strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(", ")}
      </p>

      {isInWatchlist ? (
        <button onClick={() => dispatch(removeFromWatchlist(movie.id))}>
          ❌ Remove from Watchlist
        </button>
      ) : (
        <button onClick={() => dispatch(addToWatchlist(movie))}>
          ➕ Add to Watchlist
        </button>
      )}
    </div>
  );
};

export default MovieDetails;
