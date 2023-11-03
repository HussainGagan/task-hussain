import React from "react";
import "./MovieCard.scss";
import { Link } from "react-router-dom";

export default function MovieCard({ data }) {
  return (
    <Link to={`movie/${data.imdbID}`}>
      <div className="card-item">
        <div className="card-inner">
          <div className="card-top">
            <img src={data.Poster} alt={data.Title} />
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <h4>{data.Title}</h4>
              <h4>{data.Year}</h4>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
