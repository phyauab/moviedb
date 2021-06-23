import React from "react";
import Cast from "./Cast";
import Detail from "./Detail";
import Media from "./Media";

export const Info = () => {
  return (
    <section className="content-center flex flex-col gap-10 lg:flex-row">
      <div>
        <Cast />
        <Media />
      </div>

      <Detail />
    </section>
  );
};

export default Info;
