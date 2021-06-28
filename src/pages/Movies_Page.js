import { React, useEffect } from "react";
import Filter from "../components/Filter";
import Movie_List from "../components/Movie_List";
import Header from "../components/Header";
import { useMovieContext } from "../context/movie_context";

// TODO:
// 1. FLITER COMPONENT
// 2. DIVIDER + SORT
// 3. GRIDVIEW + LISTVIEW
// REFERENCE: https://developers.themoviedb.org/3/discover/movie-discover

export const Movies_Page = () => {
  const { genres, certifications, fetchFilter, movieList, filterMovies } =
    useMovieContext();

  useEffect(() => {
    if (genres.genres.length === 0) {
      console.log("fetch filter");
      fetchFilter();
    }
  }, []);

  return (
    <main className="content-center mt-10">
      <Header title="Filter" />
      {genres.status === "LOADING" || certifications.status === "LOADING" ? (
        <h1>Loading...</h1>
      ) : (
        <Filter
          genres={genres.genres}
          certifications={certifications.certifications}
        />
      )}
      <Movie_List movieList={movieList} filterMovies={filterMovies} />
    </main>
  );
};

export default Movies_Page;
