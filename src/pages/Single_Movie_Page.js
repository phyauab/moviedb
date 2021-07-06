import { React, useEffect } from "react";
import { useMovieContext } from "../context/movie_context";
import { useParams } from "react-router";
import Hero from "../components/Single_Movie/Hero";
import Info from "../components/Single_Movie/Info";
import Loading from "../components/Loading";
import Error from "../components/Error";

export const Single_Movie_Page = () => {
  const { singleMovie, fetchSingleMovie } = useMovieContext();
  const { id } = useParams();
  const { details, credits, videos, images } = singleMovie;

  useEffect(() => {
    fetchSingleMovie(id);
    // eslint-disable-next-line
  }, [id]);

  if (singleMovie.status === "LOADING") {
    return <Loading />;
  } else if (singleMovie.status === "ERROR") {
    return <Error />;
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
