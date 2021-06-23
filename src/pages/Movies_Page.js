import React from "react";
import Filter from "../components/Filter";
import Movie_List from "../components/Movie_List";
import { useMovieContext } from "../context/movie_context";

// TODO:
// 1. FLITER COMPONENT
// 2. DIVIDER + SORT
// 3. GRIDVIEW + LISTVIEW
// REFERENCE: https://developers.themoviedb.org/3/discover/movie-discover

export const Movies_Page = () => {
  const { fetchFilter, displayMovies } = useMovieContext();
  return (
    <main className="content-center mt-10">
      <h3 className="content-header">Filter</h3>
      <Filter fetchFilter={fetchFilter} />
      <Movie_List display_movies={displayMovies} />
    </main>
  );
};

export default Movies_Page;
