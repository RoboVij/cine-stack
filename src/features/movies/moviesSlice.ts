import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "../../api/tmdb";

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average?: number;
  genres?: Genre[];
}

interface MoviesState {
  popular: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  popular: [],
  loading: false,
  error: null,
};
export const getPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async () => {
    return await fetchPopularMovies();
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.loading = false;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong.";
      });
  },
});
export default moviesSlice.reducer;
