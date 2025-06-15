import type { Movie } from "../features/movies/moviesSlice";

const WATCHLIST_KEY = "cine-stack-watchlist";

export const loadWatchlist = (): Movie[] => {
  try {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load watchlist from local storage", e);
    return [];
  }
};

export const saveWatchlist = (items: Movie[]): void => {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save watchlist to local storage", e);
  }
};
