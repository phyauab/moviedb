import React from "react";
import { Link } from "react-router-dom";

export const CardMovie = ({
  id,
  title,
  release_date,
  vote_average,
  poster_path,
}) => {
  return (
    <div className="w-48 mr-10 inline-block">
      {/* Movie Poster + Rating */}

      <Link to={`/movies/${id}`}>
        <div className="rounded-lg cursor-pointer shadow-lg overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="poster"
          />
          <div
            className={`h-6 ${
              vote_average >= 7
                ? `bg-green-400`
                : vote_average >= 4
                ? `bg-yellow-400`
                : `bg-red-400`
            }`}
          >
            <p className="text-center text-white font-bold ">
              {vote_average * 10}%
            </p>
          </div>
        </div>
      </Link>

      <div className="flex flex-col py-2">
        <h3 className="w-full inline font-bold overflow-ellipsis overflow-hidden">
          {title}
        </h3>
        <p className="text-gray-500">{release_date}</p>
      </div>
    </div>
  );
};

export default CardMovie;
