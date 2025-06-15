import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "./moviesSlice";
import { loadWatchlist, saveWatchlist } from "../../utils/localStorage";

interface WatchlistState {
  items: Movie[];
}

const initialState = {
  items: loadWatchlist(),
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state: WatchlistState, action: PayloadAction<Movie>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items = [...state.items, action.payload];
        saveWatchlist(state.items);
      }
    },
    removeFromWatchlist: (
      state: WatchlistState,
      action: PayloadAction<number>
    ) => {
      state.items = state.items.filter(
        (movie: Movie) => movie.id !== action.payload
      );
      saveWatchlist(state.items);
    },
  },
});
export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
