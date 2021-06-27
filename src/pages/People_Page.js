import { React, useEffect } from "react";
import { useMovieContext } from "../context/movie_context";
import Card_Person from "../components/Card_Person";
import Header from "../components/Header";
import people_data from "../data/people_data";

export const People_Page = () => {
  const { fetchPeople, people } = useMovieContext();
  const { status } = people;

  useEffect(() => {
    fetchPeople();
  }, []);

  if (status === "LOADING") {
    return <h1>LOADING...</h1>;
  } else if (status === "LOADED") {
    console.log("PEOPLE LOADED");
    // console.log(JSON.stringify(people));
  }

  return (
    <section className="content-center">
      <div className="mb-10"></div>
      <Header title="Popuplar People" />
      <div className="grid grid-cols-2 gap-10 mb-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {people.people.map((person) => {
          const { id, name, profile_path, known_for } = person;
          return (
            <Card_Person
              key={id}
              name={name}
              img={profile_path}
              known_for={known_for}
            />
          );
        })}
      </div>
    </section>
  );
};

export default People_Page;
