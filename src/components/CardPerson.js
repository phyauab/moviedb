import React from "react";
import { Link } from "react-router-dom";

export const CardPerson = ({ id, img, name, known_for }) => {
  return (
    <div className="w-52 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out hover:-translate-y-1 transform">
      <Link to={`/people/${id}`}>
        <div className="w-full">
          <img
            src={`https://image.tmdb.org/t/p/w185${img}`}
            alt="actor_pic"
            className="object-cover w-full"
          />
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

export default CardPerson;
