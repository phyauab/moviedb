import { React, useEffect } from "react";
import { useMovieContext } from "../context/movie_context";
import Hero from "../components/Hero";
import Recommendation from "../components/Recommendation";

export const Home_Page = () => {
  const { movieCategories, fetchHome } = useMovieContext();

  useEffect(() => {
    // this is to prevent fetching data every time visit the home page
    if (movieCategories.categories[0].movies === null) {
      console.log("FETCH HOME");
      fetchHome();
    }
  }, []);

  if (movieCategories.status === "LOADING") {
    return <h1>LOADING...</h1>;
  } else if (movieCategories.status === "ERROR") {
    return <h1>Sorry, something is wrong</h1>;
  }

  return (
    <main>
      <Hero heroImg={movieCategories.categories[0].movies[0].backdrop_path} />
      <Recommendation movieCategories={movieCategories} />
    </main>
  );
};

export default Home_Page;
