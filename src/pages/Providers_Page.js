import { React, useEffect } from "react";
import { useMovieContext } from "../context/movie_context";
import Header from "../components/Header";
import CardProvider from "../components/CardProvider";
import Loading from "../components/Loading";
import Error from "../components/Error";

export const Providers_Page = () => {
  const { providers, fetchProviders } = useMovieContext();
  const providersList = [];

  useEffect(() => {
    if (providers.providers.length === 0) {
      console.log("useEffect fetchProviders");
      fetchProviders();
    }
    // eslint-disable-next-line
  }, []);

  if (providers.status === "LOADING") {
    return <Loading />;
  } else if (providers.status === "ERROR") {
    return <Error />;
  }

  const sortList = () => {
    const length = providers.providers.length;
    for (let i = 0; i < length; ++i) {
      if (providers.providers[i].display_priority < 10)
        providersList.push(providers.providers[i]);
    }
  };
  sortList();

  return (
    <section className="content-center mt-10">
      <Header title="Providers" />
      <div className=" grid justify-center justify-items-center grid-cols-4 gap-y-5 my-10 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 ">
        {providersList.map((provider) => {
          const { provider_id, provider_name, logo_path } = provider;
          return (
            <CardProvider
              key={provider_id}
              provider_name={provider_name}
              logo_path={logo_path}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Providers_Page;
