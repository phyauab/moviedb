import { React, useEffect } from "react";
import { useMovieContext } from "../context/movie_context";
import Hero from "../components/Hero";
import Recommendation from "../components/Recommendation";
import Loading from "../components/Loading";
import Error from "../components/Error";

export const Home_Page = () => {
  const { movieCategories, fetchHome } = useMovieContext();

  useEffect(() => {
    // this is to prevent fetching data every time visit the home page
    if (movieCategories.categories[0].movies === null) {
      console.log("FETCH HOME");
      fetchHome();
    }
    // eslint-disable-next-line
  }, []);

  
  if (movieCategories.status === "LOADING") {
    console.log("LOADING")
    return <Loading />;
  } else if (movieCategories.status === "ERROR") {
    return <Error />;
  }
  console.log("feteched")
  return (
    <main>
      <Hero heroImg={movieCategories.categories[0].movies[0].backdrop_path} />
      <Recommendation movieCategories={movieCategories} />
    </main>
  );
};

export default Home_Page;
