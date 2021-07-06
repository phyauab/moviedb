import { React, useEffect } from "react";
import { useParams } from "react-router";
import { useMovieContext } from "../context/movie_context";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Header from "../components/Header";
import Details from "../components/Single_Person/Details";
import Bio from "../components/Single_Person/Bio";
import CastList from "../components/Single_Person/CastList";
import CrewList from "../components/Single_Person/CrewList";

export const Single_Person_Page = () => {
  const { id } = useParams();
  const { singlePerson, fetchSinglePerson } = useMovieContext();
  const { details } = singlePerson;

  useEffect(() => {
    console.log("FETCH SINGLE PERSON");
    fetchSinglePerson(id);
    // eslint-disable-next-line
  }, [id]);

  if (singlePerson.status === "LOADING") {
    return <Loading />;
  } else if (singlePerson.status === "ERROR") {
    return <Error />;
  }

  return (
    <section className="content-center mt-10">
      <Header title={details.name} />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Bio biography={details.biography} />
          {singlePerson.movies.cast.length > 0 && (
            <CastList cast={singlePerson.movies.cast} />
          )}
          {singlePerson.movies.crew.length > 0 && (
            <CrewList crew={singlePerson.movies.crew} />
          )}
        </div>
        <Details details={details} />
      </div>
    </section>
  );
};

export default Single_Person_Page;
