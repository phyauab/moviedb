import React from "react";
import { useMovieContext } from "../context/movie_context";
import { Horizontal_Scroller } from "./Horizontal_Scroller";

export const Recommendation = () => {
  const { movieCategories } = useMovieContext();
  //console.log("recommendation");
  //console.log(JSON.stringify(movieCategories));
  return (
    <section className="w-full content-center">
      {movieCategories.categories.map((item, index) => {
        const { category, movies } = item;
        //console.log("movies: " + movies);
        return (
          <Horizontal_Scroller
            key={index}
            category={category}
            movies={movies}
          />
        );
      })}
    </section>
  );
};

export default Recommendation;
