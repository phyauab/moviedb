import React from "react";
import Header from "../Header";
import data from "../../data/movie_crew";

const { cast } = data;

export const Cast = ({ cast }) => {
  const castArr = [];
  for (let i = 0; i < 10; ++i) {
    const { id, name, character, profile_path } = cast[i];
    castArr.push(
      <div key={id} className="flex shadow-md">
        <div className="w-28 h-28 rounded-lg overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt="Cast"
          />
        </div>
        <div className="px-5">
          <h1 className="font-bold">{name}</h1>
          <p className="text-gray-500">as {character}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <Header title="Cast" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{castArr}</div>
      <div className="my-2">
        <p className="text-blue-600 text-right hover:underline">
          <a href="#">See all cast</a>
        </p>
      </div>
    </div>
  );
};

export default Cast;
