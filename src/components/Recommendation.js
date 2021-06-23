import React from "react";
import { useMovieContext } from "../context/movie_context";
import { Horizontal_Scroller } from "./Horizontal_Scroller";

export const Recommendation = () => {
  const { movieCategories } = useMovieContext();
  return (
    <section className="w-full content-center">
      {movieCategories.map((item, index) => {
        const { category, movies } = item;
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
