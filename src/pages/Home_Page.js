import { React, useEffect, useState } from "react";
import { useMovieContext } from "../context/movie_context";
import Hero from "../components/Hero";
import Recommendation from "../components/Recommendation";

export const Home_Page = () => {
  const { movieCategories, fetchHome } = useMovieContext();
  const [heroImg, setHeroImg] = useState("");

  useEffect(() => {
    console.log("useEffect fetchHome");
    fetchHome();
  }, []);

  console.log(movieCategories.status);
  if (movieCategories.status === "LOADING") {
    return <h1>LOADING...</h1>;
  } else if (movieCategories.status === "LOADED") {
  }

  return (
    <main>
      <Hero />
      <Recommendation movieCategories={movieCategories} />
    </main>
  );
};

export default Home_Page;
