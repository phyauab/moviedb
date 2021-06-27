import React from "react";
import Header from "./Header";
import Card_Movie from "./Card_Movie";

export const Horizontal_Scroller = ({ category, movies, isLoading }) => {
  return (
    <section className="mb-10">
      <Header title={category} />
      <div className="py-5 whitespace-nowrap overflow-x-scroll md:px-0">
        {movies.map((movie) => {
          const { id, title, release_date, vote_average, poster_path } = movie;
          return (
            <Card_Movie
              key={id}
              id={id}
              title={title}
              release_date={release_date}
              vote_average={vote_average}
              poster_path={poster_path}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Horizontal_Scroller;
