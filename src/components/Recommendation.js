import React from "react";
import { useMovieContext } from "../context/movie_context";
import HorizontalScroller from "./HorizontalScroller";

export const Recommendation = () => {
  const { movieCategories } = useMovieContext();

  return (
    <section className="w-full content-center">
      {movieCategories.categories.map((item, index) => {
        const { category, movies } = item;
        return (
          <HorizontalScroller
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
