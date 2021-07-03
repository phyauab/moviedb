import { React, useState } from "react";
import Header from "../Header";

export const Cast = ({ cast }) => {
  const castArr = [];
  const allCastArr = [];
  const [showAll, setShowAll] = useState(false);

  // show only 10 initially
  const length = cast.length;
  for (let i = 0; i < length && cast[i] !== undefined; ++i) {
    const { id, name, character, profile_path } = cast[i];
    const element = (
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
    if (i < 10) castArr.push(element);
    else allCastArr.push(element);
  }

  return (
    <div className="mb-10">
      <Header title="Cast" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {castArr}
        {showAll && allCastArr}
      </div>

      {allCastArr.length > 0 && (
        <div className="my-2 flex justify-end">
          <button
            className="text-blue-600 text-right hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cast;
