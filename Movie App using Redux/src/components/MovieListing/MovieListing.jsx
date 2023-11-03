import React from "react";
import { useSelector } from "react-redux";
import { getMovieData } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import { getSeriesData } from "../../features/series/seriesSlice";

export default function MovieListing() {
  const { movies, loading, error } = useSelector(getMovieData);
  const seriesData = useSelector(getSeriesData);

  return (
    <>
      <div className="movie-wrapper">
        <div className="movie-list">
          <h2>Movies</h2>
          {loading && (
            <h2 style={{ textAlign: "center", color: "#fff" }}>Loading...</h2>
          )}
          {!loading && error && (
            <p style={{ textAlign: "center", color: "#fff" }}>{error}</p>
          )}
          {!loading && movies?.Response && (
            <div className="movie-container">
              {movies.Search.map((movie, index) => {
                return <MovieCard key={index} data={movie} />;
              })}
            </div>
          )}
        </div>
        <div className="show-list">
          <h2>Shows</h2>
          {seriesData.loading && (
            <h2 style={{ textAlign: "center", color: "#fff" }}>Loading...</h2>
          )}
          {!seriesData.loading && seriesData.error && (
            <p style={{ textAlign: "center", color: "#fff" }}>
              {seriesData.error}
            </p>
          )}
          {!seriesData.loading && seriesData.series?.Response && (
            <div className="movie-container">
              {seriesData.series.Search.map((movie, index) => {
                return <MovieCard key={index} data={movie} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
