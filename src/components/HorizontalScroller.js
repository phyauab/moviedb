import React from "react";
import Header from "./Header";
import CardMovie from "./CardMovie";

export const HorizontalScroller = ({ category, movies }) => {
  return (
    <section className="mb-10">
      <Header title={category} />
      <div className="py-5 whitespace-nowrap overflow-x-scroll md:px-0">
        {movies.map((movie) => {
          const { id, title, release_date, vote_average, poster_path } = movie;
          return (
            <CardMovie
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

export default HorizontalScroller;
