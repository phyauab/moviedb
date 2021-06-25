import { React, useEffect } from "react";
import { useMovieContext } from "../context/movie_context";
import { useParams } from "react-router";
import Hero from "../components/Single_Movie/Hero";
import Info from "../components/Single_Movie/Info";

export const Single_Movie_Page = () => {
  const { singleMovie, fetchMovie } = useMovieContext();
  const { id } = useParams();
  useEffect(() => {
    fetchMovie(id);
  }, []);
  return (
    <section>
      {singleMovie.details === null ? (
        <h1>loading</h1>
      ) : (
        <Hero details={singleMovie.details} />
      )}
      <Info
        details={singleMovie.details}
        cast={singleMovie.credits.cast}
        crew={singleMovie.credits.crew}
      />
    </section>
  );
};

export default Single_Movie_Page;
