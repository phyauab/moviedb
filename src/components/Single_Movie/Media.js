import { React, useState, useEffect } from "react";
import Header from "../Header";

export const Media = ({ videos, images }) => {
  const [videoList, setVideoList] = useState([]);
  const [backdropList, setBackdropList] = useState([]);
  const [posterList, setPosterList] = useState([]);

  useEffect(() => {
    const tempMovieList = [];
    var length = videos.length < 5 ? videos.length : 5;
    for (let i = 0; i < length; ++i) {
      tempMovieList.push(videos[i]);
    }

    const tempBackdropList = [];
    length = images.backdrops.length < 5 ? images.backdrops.length : 5;
    for (let i = 0; i < length; ++i) {
      tempBackdropList.push(images.backdrops[i]);
    }

    const tempPosterList = [];
    length = images.posters.length < 10 ? images.posters.length : 10;
    for (let i = 0; i < length; ++i) {
      tempPosterList.push(images.posters[i]);
    }

    setVideoList(tempMovieList);
    setBackdropList(tempBackdropList);
    setPosterList(tempPosterList);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="mb-10">
      <Header title={"Media"} />
      {/* Video */}
      <div className="mb-5">
        <h1 className="font-semibold">Videos</h1>
        <div className="flex py-5 whitespace-nowrap overflow-x-scroll max-w-3xl md:px-0">
          {videoList.map((video) => {
            const { id, key, name } = video;
            return (
              <iframe
                title={name}
                key={id}
                className="w-full"
                src={`https://www.youtube.com/embed/${key}`}
              ></iframe>
            );
          })}
        </div>
      </div>

      {/* Backdrops */}
      <div className="mb-5">
        <h1 className="font-semibold">Backdrops</h1>
        <div className="flex py-5 whitespace-nowrap overflow-x-scroll max-w-3xl md:px-0">
          {backdropList.map((backdrop, index) => {
            const { file_path } = backdrop;
            return (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/original${file_path}`}
                className="w-80"
                alt="Backdrops"
              />
            );
          })}
        </div>
      </div>

      {/* Posters */}
      <div className="mb-5">
        <h1 className="font-semibold">Posters</h1>
        <div className="flex py-5 whitespace-nowrap overflow-x-scroll max-w-3xl md:px-0">
          {posterList.map((poster, index) => {
            const { file_path } = poster;
            return (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/original${file_path}`}
                className="w-36"
                alt="Poster"
              />
            );
          })}
        </div>
      </div>

      {/* Posters */}
    </section>
  );
};

export default Media;
