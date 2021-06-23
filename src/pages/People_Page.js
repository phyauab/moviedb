import { React, useEffect } from "react";
import { useMovieContext } from "../context/movie_context";
import Card_Person from "../components/Card_Person";
import people_data from "../data/people_data";

export const People_Page = () => {
  const { fetchPeople, people } = useMovieContext();
  const mock_people = people_data.results;
  console.log(mock_people);
  useEffect(() => {
    //fetchPeople();
  }, []);
  return (
    <section className="content-center">
      <h1 className="mt-10 content-header">Popular People</h1>
      <div className="grid grid-cols-5 gap-10 mb-10">
        {mock_people.map((person) => {
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
