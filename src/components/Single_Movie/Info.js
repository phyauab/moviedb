import React from "react";
import Cast from "./Cast";
import Detail from "./Detail";
import Media from "./Media";

export const Info = ({ details, cast, crew, videos, images }) => {
  return (
    <section className="content-center flex flex-col gap-10 lg:flex-row">
      <div>
        <Cast cast={cast} />
        <Media videos={videos} images={images} />
      </div>

      <Detail details={details} crew={crew} />
    </section>
  );
};

export default Info;
