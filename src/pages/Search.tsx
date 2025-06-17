import React, { useEffect, useState } from "react";
import type { Movie } from "../features/movies/moviesSlice";
import { Link } from "react-router-dom";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (query.length > 1) searchMovies(query);
      else setResults([]);
    }, 500);

    return () => clearTimeout(delayBounce);
  }, [query]);

  const searchMovies = async (searchTerm: String) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchTerm}`
      );
      const data = await res.json();
      setResults(data.results);
    } catch (e) {
      console.error("Error while searching movie title", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Search results</h2>
      <input
        type="text"
        value={query}
        placeholder="Search for a title"
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      />
      {isLoading && <p>Loading...</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 150px)",
          gap: "1rem",
        }}
      >
        {results.map((movie: Movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Search;
