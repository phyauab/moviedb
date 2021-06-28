import React, { useEffect } from "react";
import popular_movie_data from "../data/popular_movie_data";
import Card_Movie from "./Card_Movie";
//   title,
//   release_date,
//   vote_average,
//   poster_path,
export const Movie_List = ({ movieList, filterMovies }) => {
  useEffect(() => {
    filterMovies();
  }, []);

  if (movieList.status === "LOADING") {
    return <h1 className="content-center">LOADING...</h1>;
  } else if (movieList.status === "ERROR") {
    return <h1 className="content-center">Sorry, something is wrong...</h1>;
  }

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
