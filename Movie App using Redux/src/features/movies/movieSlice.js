import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";
const initialState = {
  loading: false,
  movies: null,
  movieOrShowDetail: null,
};

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Spider";
    const res = await movieApi.get(
      `?apikey=${APIKey}&s=${movieText}&type=movie`
    );
    return res.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (imdbID) => {
    const movieText = "Spider";
    const res = await movieApi.get(`?apikey=${APIKey}&i=${imdbID}&Plot=full`);
    return res.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.movieOrShowDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.movies = payload;
        state.error = "";
      })
      .addCase(fetchAsyncMovies.rejected, (state, action) => {
        state.loading = false;
        state.movies = {};
        state.error = action.error.message;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        state.movieOrShowDetail = payload;
      });
  },
});

export const getMovieData = (state) => state.movies;
export const getMovieOrShowData = (state) => state.movies.movieOrShowDetail;
export const { removeSelectedMovieOrShow } = movieSlice.actions;
export default movieSlice.reducer;
