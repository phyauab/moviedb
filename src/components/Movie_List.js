import React, { useEffect } from "react";
import Card_Movie from "./Card_Movie";
//   title,
//   release_date,
//   vote_average,
//   poster_path,
export const Movie_List = ({ movieList }) => {
  return (
    <section className="grid justify-center justify-items-center grid-cols-2 gap-y-5 my-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movieList.movieList.map((movie, index) => {
        const { id, title, release_date, vote_average, poster_path } = movie;
        return (
          <Card_Movie
            key={index}
            id={id}
            title={title}
            release_date={release_date}
            vote_average={vote_average}
            poster_path={poster_path}
          />
        );
      })}
    </section>
  );
};

export default Movie_List;
