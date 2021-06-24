import React from "react";
import Header from "../Header"
import image from "../../data/movie_image";
import video from "../../data/movie_video";

export const Media = () => {
  return (
    <div>
      <Header title={"Media"} />
      
      <div>
        <h1>Video</h1>
      </div>
      <div>
        <h1>Backdrops</h1>
        <div className="flex">
          <img
            src={`https://image.tmdb.org/t/p/original${image.backdrops[0].file_path}`}
            className="w-80"
          />
          <img
            src={`https://image.tmdb.org/t/p/original${image.backdrops[1].file_path}`}
            className="w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Media;
