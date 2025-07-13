import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Movie } from "../features/movies/moviesSlice";
import { Link } from "react-router-dom";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage((prev) => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (query.length > 1) {
        setPage(1);
        setResults([]);
        searchMovies(query, 1, true);
      } else setResults([]);
    }, 500);

    return () => clearTimeout(delayBounce);
  }, [query]);

  useEffect(() => {
    if (page > 1 && query.length > 1) searchMovies(query, page);
  }, [page]);

  const searchMovies = async (
    searchTerm: String,
    pageNum: Number,
    overwrite = false
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchTerm}&page=${pageNum}`
      );
      const data = await res.json();
      if (overwrite) setResults(data.results || []);
      else setResults((prev: Movie[]) => [...prev, ...(data.results || [])]);
      setHasMore(data.page < data.total_pages);
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 150px)",
          gap: "1rem",
        }}
      >
        {results.map((movie: Movie, index) => {
          if (results.length === index + 1) {
            return (
              <div ref={lastMovieRef} key={movie.id}>
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
                      {movie.title} (
                      {new Date(movie.release_date).getFullYear()})
                    </p>
                  </div>
                </Link>
              </div>
            );
          } else {
            return (
              <div key={movie.id}>
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
                      {movie.title} (
                      {new Date(movie.release_date).getFullYear()})
                    </p>
                  </div>
                </Link>
              </div>
            );
          }
        })}
      </div>
      {isLoading && <p>Loading...</p>}
      {!hasMore && query.length > 1 && (
        <p style={{ marginTop: "1rem" }}>End of Results</p>
      )}
    </div>
  );
};
export default Search;
