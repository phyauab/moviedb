import React from "react";

export const Hero = ({ details }) => {
  const {
    backdrop_path,
    poster_path,
    title,
    tagline,
    release_date,
    runtime,
    genres,
    vote_average,
    overview,
    production_companies,
  } = details;

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url("https://image.tmdb.org/t/p/original${backdrop_path}")`,
      }}
      className="bg-fixed bg-cover bg-center mb-10 h-full"
    >
      {/* Content */}
      <div className="grid justify-center content-center p-5 lg:grid-cols-3 ">
        {/* Poster Left/Top */}
        <div
          className="w-48 justify-center content-center
         lg:w-96"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt="movie_poster"
            className="w-full h-auto "
          />
        </div>

        {/* Hero Info Bottom/Right */}
        <div className="justify-center text-white flex flex-col gap-y-2 lg:mx-10 lg:col-span-2">
          {/* Title */}
          <div>
            <h1 className="text-2xl text-center lg:text-4xl">{title}</h1>
          </div>
          {/* Sub Info */}
          <div className="text-gray-400 text-center flex flex-col">
            <p>{tagline}</p>
            <p>{release_date}</p>
            <p>{runtime} mins</p>
            <div className="flex justify-center my-1">
              {genres.map((genre) => {
                const { id, name } = genre;
                return (
                  <p key={id} className="mx-1 px-2 border rounded-xl">
                    {name}
                  </p>
                );
              })}
            </div>
          </div>

          {/* User Score */}
          <div className="flex">
            <p className="whitespace-nowrap mr-1">User Score</p>
            <div className="h-6 w-full bg-green-500 rounded-lg text-center font-bold">
              {vote_average * 10}%
            </div>
          </div>

          {/* Overview */}
          <div>
            <p>Overview</p>
            <p className="text-gray-400">{overview}</p>
          </div>

          {/* Company */}
          <div className="flex">
            <div>
              <p className="mr-2">Produced by </p>
            </div>

            <div className="inline-block">
              {production_companies.map((company) => {
                const { id, name } = company;
                return <p key={id}>{name}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
