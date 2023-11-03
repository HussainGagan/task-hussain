import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";

import { useDispatch } from "react-redux";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";
import { fetchAsyncSeries } from "../../features/series/seriesSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncSeries());
  }, []);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
}
