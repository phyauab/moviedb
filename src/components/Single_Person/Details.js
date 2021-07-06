import React from "react";

// details of person
const Details = ({ details }) => {
  const {
    name,
    birthday,
    //   deathday,
    gender,
    //    hompage,
    place_of_birth,
    profile_path,
    also_known_as,
  } = details;

  return (
    <div className="items-center flex flex-col gap-3">
      <div>
        <img
          className="w-60"
          src={`https://image.tmdb.org/t/p/original${profile_path}`}
          alt="profile_path"
        />
      </div>
      <div className="flex flex-col gap-3 justify-start w-60">
        <div>
          <p className="font-bold">Name</p>
          <p>{name}</p>
        </div>
        <div>
          <p className="font-bold">Birthday</p>
          <p>{birthday}</p>
        </div>
        <div>
          <p className="font-bold">Gender</p>
          <p>{gender === 1 ? "Female" : "Male"}</p>
        </div>
        <div>
          <p className="font-bold">Place of birth</p>
          <p>{place_of_birth}</p>
        </div>
        <div>
          <p className="font-bold">Also known as</p>
          {also_known_as.map((name, index) => {
            return <p key={index}>{name}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
