import { React, useState } from "react";
import { useHistory } from "react-router-dom";

export const Hero = ({ heroImg }) => {
  const [keyword, setKeyword] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    console.log("HI");
    history.push({
      pathname: "/search",
      state: { keyword: keyword },
    });
    e.preventDefault();

    //search(keyword);
  };

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
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex bg-white rounded-lg">
            <input
              type="text"
              className="flex-1 p-2 rounded-l-lg focus:outline-none md:text-xl"
              placeholder="Search for a movie, tv or actor..."
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            ></input>
            <button type="submit" className="btn lg:px-10 xl:px-16">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
