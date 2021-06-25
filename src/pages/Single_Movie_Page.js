import { React, useEffect } from "react";
import { useMovieContext } from "../context/movie_context";
import { useParams } from "react-router";
import Hero from "../components/Single_Movie/Hero";
import Info from "../components/Single_Movie/Info";

export const Single_Movie_Page = () => {
  const { fetchMovie } = useMovieContext();
  const { id } = useParams();
  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <section>
      <Hero />
      <Info />
    </section>
  );
};

export default Single_Movie_Page;
