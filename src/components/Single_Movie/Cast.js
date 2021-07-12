import { React, useState } from "react";
import { Link } from "react-router-dom";
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
      <Link to={`/people/${id}`}>
        <div
          key={id}
          className="flex bg-gray-50 rounded-lg hover:shadow-2xl transition duration-300 ease-in-out hover:-translate-y-1 transform"
        >
          <div className="w-28 h-28 rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w185${profile_path}`}
              alt="Cast"
            />
          </div>
          <div className="px-5 py-2">
            <h1 className="font-bold ">{name}</h1>
            <p className="text-gray-500">as {character}</p>
          </div>
        </div>
      </Link>
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
