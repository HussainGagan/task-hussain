import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/movieSlice";
import seriesReducer from "./series/seriesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    series: seriesReducer,
  },
});
