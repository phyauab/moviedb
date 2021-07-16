import React from "react";
import { useMovieContext } from "../context/movie_context";
import HorizontalScroller from "./HorizontalScroller";
import { TransitionGroup } from "react-transition-group";

export const Recommendation = () => {
  const { movieCategories } = useMovieContext();
  //console.log("recommendation");
  //console.log(JSON.stringify(movieCategories));
  return (
    <section className="w-full content-center">
      {movieCategories.categories.map((item, index) => {
        const { category, movies } = item;
        return (
          <TransitionGroup>
            <HorizontalScroller
              key={index}
              category={category}
              movies={movies}
            />
          </TransitionGroup>
        );
      })}
    </section>
  );
};

export default Recommendation;
