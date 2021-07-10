import { React, useEffect, useState } from "react";
import { useMovieContext } from "../context/movie_context";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Search_Result_Page = () => {
  const [keyword, setKeyword] = useState("");
  const { searchResults, search } = useMovieContext();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(keyword);
  };

  useEffect(() => {
    if (location.state) {
      setKeyword(location.state.keyword);
      search(location.state.keyword);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="content-center">
      <div className="mb-10"></div>

      <Header title="Search" />

      {/* Search Bar */}
      <form className="mb-10" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex bg-white rounded-lg border">
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

      {/* Result List */}
      {searchResults.status === "LOADING" ? (
        <Loading />
      ) : searchResults.status === "ERROR" ? (
        <Error />
      ) : (
        <List results={searchResults.movies} />
      )}
    </section>
  );
};

const List = ({ results }) => {
  return (
    <div className="grid gap-10 justify-center mb-10">
      {results.map((movie) => {
        const { id, poster_path, overview, title, release_date, vote_average } =
          movie;
        return (
          <Link to={`/movies/${id}`}>
            <div
              key={id}
              className="flex flex-col border lg:flex-row lg:h-48 justify-between hover:bg-green-100 transition ease-in-out duration-500"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="flex-shrink-0 overflow-hidden lg:w-32">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt="poster"
                  />
                </div>
                {/* Info */}
                <div className="p-5 overflow-hidden">
                  <h1 className="font-semibold">{title}</h1>
                  <p>{release_date}</p>
                  <div className="py-2" />
                  <p>{overview}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="p-5">
                <div
                  className={`flex w-full h-12 items-center justify-center lg:h-full lg:px-5 ${
                    vote_average >= 7
                      ? `bg-green-400`
                      : vote_average >= 4
                      ? `bg-yellow-400`
                      : `bg-red-400`
                  }`}
                >
                  <h1 className="text-center text-white font-bold">
                    {vote_average * 10}
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Search_Result_Page;
