import React from "react";
import { Link } from "react-router-dom";

export const Card_Person = ({ id, img, name, known_for }) => {
  return (
    <div className="w-52 shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <Link to={`/people/${id}`}>
        <div>
          <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="actor_pic" />
        </div>
        <div className="p-3">
          <h3 className="text-center font-bold">{name}</h3>
          <p className="text-center text-gray-500 truncate">
            {known_for.map((item) => {
              const { title, name } = item;
              return title !== undefined ? title + ", " : name + ", ";
            })}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card_Person;
