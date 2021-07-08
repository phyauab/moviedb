import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const Search_Result_Page = () => {
  const [keyword, setKeyword] = useState("");
  const location = useLocation();

  const handleSubmit = () => {};

  useEffect(() => {
    console.log(location.search);
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
      <div>{keyword}</div>
    </section>
  );
};

export default Search_Result_Page;
