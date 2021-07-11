import { React, useEffect, useState } from "react";
import { useMovieContext } from "../context/movie_context";
import CardPerson from "../components/CardPerson";
import Pager from "../components/Pager";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Error from "../components/Error";

export const People_Page = () => {
  const { fetchPeople, people } = useMovieContext();
  const { status } = people;
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPeople(page);
    // eslint-disable-next-line
  }, [page]);

  if (status === "LOADING") {
    return <Loading />;
  } else if (status === "ERROR") {
    return <Error />;
  }

  return (
    <section className="content-center">
      <div className="mb-10"></div>
      <Header title="Popuplar People" />
      <div className="grid grid-cols-2 gap-10 mb-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {people.people.map((person) => {
          const { id, name, profile_path, known_for } = person;
          return (
            <CardPerson
              key={id}
              id={id}
              name={name}
              img={profile_path}
              known_for={known_for}
            />
          );
        })}
      </div>
      <Pager
        page={people.page}
        totalPage={people.totalPage}
        setPage={setPage}
      />
    </section>
  );
};

export default People_Page;
