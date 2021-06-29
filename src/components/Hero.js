import React from "react";

export const Hero = ({ heroImg }) => {
  console.log(heroImg);
  // const { results } = data;
  // const heroImg = `https://image.tmdb.org/t/p/original${results[0].backdrop_path}`;
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(7, 77, 0, 0.5), rgba(7, 77, 0, 0.5)),url("https://image.tmdb.org/t/p/original${heroImg}")`,
      }}
      className="bg-fixed bg-cover mb-10"
    >
      <div className="content-center py-32 md:py-40 xl:py-48">
        {/* Intro */}
        <div className="text-white font-bold py-4">
          <h1 className="text-5xl md:text-7xl">Welcome!</h1>
          <h4 className="text-2xl md:text-4xl">Explore millions of movies!</h4>
        </div>

        {/* Search */}
        <form className="">
          <div className="flex bg-white rounded-lg">
            <input
              type="text"
              className="flex-1 p-2 rounded-l-lg focus:outline-none md:text-xl"
              placeholder="Search for a movie, tv or actor..."
            ></input>
            <button className="btn lg:px-10 xl:px-16">Search</button>
          </div>
        </form>
      </div>

      {/* <div className="">
        <img
          className=""
          src={`https://image.tmdb.org/t/p/original${a}`}
          alt="img"
        />
      </div> */}
    </section>
  );
};

export default Hero;
