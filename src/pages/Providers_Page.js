import { React, useEffect, useState } from "react";
import { useMovieContext } from "../context/movie_context";
import Card_Provider from "../components/Card_Provider";

export const Providers_Page = () => {
  const { providers, fetchProviders } = useMovieContext();
  const providersList = [];

  useEffect(() => {
    console.log("useEffect fetchProviders");
    fetchProviders();
  }, []);

  if (providers.status === "LOADING") {
    return <h1>Loading...</h1>;
  } else if (providers.status === "LOADED") {
    console.log("PROVIDERS LOADED");
    //console.log(JSON.stringify(providers));
  }

  const sortList = () => {
    providers.providers.map((provider) => {
      if (provider.display_priority < 10) providersList.push(provider);
    });
  };
  sortList();

  return (
    <section className="content-center grid justify-center justify-items-center grid-cols-4 gap-y-5 my-10 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {providersList.map((provider) => {
        const { provider_id, provider_name, logo_path } = provider;
        return (
          <Card_Provider
            key={provider_id}
            provider_name={provider_name}
            logo_path={logo_path}
          />
        );
      })}
    </section>
  );
};

export default Providers_Page;
