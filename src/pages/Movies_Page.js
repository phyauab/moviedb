import { React, useEffect, useState } from "react";
import { useMovieContext } from "../context/movie_context";
import Filter from "../components/Filter";
import MovieList from "../components/MovieList";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pager from "../components/Pager";

// TODO:
// 1. FLITER COMPONENT
// 2. DIVIDER + SORT
// 3. GRIDVIEW + LISTVIEW
// REFERENCE: https://developers.themoviedb.org/3/discover/movie-discover

export const Movies_Page = () => {
  const {
    genres,
    certifications,
    fetchFilter,
    movieList,
    fetchMovieList,
    filterMovies,
  } = useMovieContext();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (genres.genres.length === 0) {
      console.log("fetch filter");
      fetchFilter();
    }
    //fetchMovieList();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="content-center mt-10">
      <Header title="Filter" />
      {genres.status === "LOADING" || certifications.status === "LOADING" ? (
        <Loading />
      ) : genres.status === "ERROR" || certifications.status === "ERROR" ? (
        <Error />
      ) : (
        <Filter
          genres={genres.genres}
          certifications={certifications.certifications}
          filterMovies={filterMovies}
          page={page}
        />
      )}
      {movieList.status === "LOADING" ? (
        <Loading />
      ) : movieList.status === "ERROR" ? (
        <Error />
      ) : (
        <MovieList movieList={movieList} />
      )}

      <Pager page={page} setPage={setPage} totalPage={movieList.totalPage} />
    </section>
  );
};

export default Movies_Page;
