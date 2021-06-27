import { React, useEffect, useState } from "react";
import { useMovieContext } from "../context/movie_context";
import { useParams } from "react-router";
import Hero from "../components/Single_Movie/Hero";
import Info from "../components/Single_Movie/Info";
import movie_data from "../data/movie_data";
import crew_data from "../data/movie_crew";
import movie_video from "../data/movie_video";

export const Single_Movie_Page = () => {
  const { isLoading, singleMovie, fetchSingleMovie } = useMovieContext();
  const { id } = useParams();
  const { details, credits, videos, images } = singleMovie;

  useEffect(() => {
    fetchSingleMovie(id);
  }, [id]);

  if (singleMovie.status === "LOADING") {
    return <h1 className="content-center">Loading...</h1>;
  } else if (singleMovie.status === "LOADED") {
    console.log("SINGLE MOVIE LOADED");
  }
  return (
    <section>
      <Hero details={details} />
      <Info
        details={details}
        cast={credits.cast}
        crew={credits.crew}
        videos={videos}
        images={images}
      />
    </section>
  );
};

export default Single_Movie_Page;
