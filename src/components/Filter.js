import { React, useState, useEffect } from "react";

// Filter only makes API fetch when user is in the Movie Page
export const Filter = ({ genres, certifications, filterMovies, page }) => {
  //const [keyword, setKeyword] = useState("");
  const [with_genres, setWith_genres] = useState([]);
  // need country: US
  // https://api.themoviedb.org/3/discover/movie?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US&sort_by=popularity.desc&certification_country=US&certification=NR&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
  const [certification, setCertification] = useState([]);
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(10);
  const [fromReleaseDate, setFromReleaseDate] = useState("");
  const [toReleaseDate, setToReleaseDate] = useState("");

  // nothing
  // https://api.themoviedb.org/3/discover/movie?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate

  // the whole url
  // https://api.themoviedb.org/3/discover/movie?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US&sort_by=popularity.desc&certification=NR%2CG%2CPG%2CPG-13%2CR%2CNC-17&include_adult=false&include_video=false&page=1&release_date.gte=2021-01-01&release_date.lte=2021-12-13&vote_average.gte=0&vote_average.lte=10&with_genres=28%2C12&with_watch_monetization_types=flatrate

  // modify
  // https://api.themoviedb.org/3/discover/movie?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2021-01-01&release_date.lte=2021-12-13&vote_average.gte=0&vote_average.lte=10&with_genres=28%2C12&certification=NR%2CG%2CPG%2CPG-13%2CR%2CNC-17&with_watch_monetization_types=flatrate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit");
    createAndFetch();
  };

  const createAndFetch = () => {
    console.log("create and fetch");

    // &release_date.gte=2021-01-01&release_date.lte=2021-12-13
    var url =
      "https://api.themoviedb.org/3/discover/movie?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate";
    // if (fromReleaseDate !== "" && toReleaseDate !== "") {
    //   url += "";
    // }

    if (fromReleaseDate !== "") url += `&release_date.gte=${fromReleaseDate}`;

    if (toReleaseDate !== "") url += `&release_date.lte=${toReleaseDate}`;

    if (with_genres !== []) {
      url += `&with_genres=${with_genres}`;
    }

    if (certification !== []) {
      url += "&certification_country=US&certification=";
      for (let i = 0; i < certification.length; ++i) {
        url += certification[i];
        if (i + 1 < certification.length) url += "|";
      }
    }

    if (lowerBound !== null && upperBound !== null) {
      url += `&vote_average.gte=${lowerBound}`;
      url += `&vote_average.lte=${upperBound}`;
    }

    // keywords
    // &with_keywords=Comedy
    // if (keyword !== "") {
    //   url += `&with_keywords=${keyword}`;
    // }

    // page
    url += `&page=${page}`;
    filterMovies(url);
  };

  const filter_genres = (e) => {
    const genre_id = e.target.value;
    if (!with_genres.includes(genre_id)) {
      with_genres.push(genre_id);
    } else {
      const temp_arr = with_genres.filter((id) => id !== genre_id);
      setWith_genres(temp_arr);
    }
  };

  const filter_certification = (e) => {
    const temp_text = e.target.value;
    if (!certification.includes(temp_text)) {
      certification.push(temp_text);
    } else {
      const temp_arr = certification.filter((text) => text !== temp_text);
      setCertification(temp_arr);
    }
  };

  const clearAll = () => {
    // release dates
    setFromReleaseDate("");
    document.getElementById("release_date.gte").value = null;
    setToReleaseDate("");
    document.getElementById("release_date.lte").value = null;

    // genres
    setWith_genres([]);
    // genres.map((genre) => {
    //   const id = genre.name;
    //   const chkbox = document.getElementById(id);
    //   chkbox.checked = false;
    // });
    const genresLength = genres.length;
    for (let i = 0; i < genresLength; ++i) {
      const id = genres[i].name;
      const chkbox = document.getElementById(id);
      chkbox.checked = false;
    }

    // certifications
    setCertification([]);
    // certifications.map((certification) => {
    //   const id = certification.order;
    //   const chkbox = document.getElementById(id);
    //   chkbox.checked = false;
    // });
    const certificationsLength = certifications.length;
    for (let i = 0; i < certificationsLength; ++i) {
      const id = certifications[i].order;
      const chkbox = document.getElementById(id);
      chkbox.checked = false;
    }

    // user score
    setLowerBound(0);
    setUpperBound(10);

    // keyword
    //setKeyword("");
  };

  useEffect(() => {
    createAndFetch();
    // eslint-disable-next-line
  }, [page]);

  const td = "table-cell pb-2";

  return (
    <section className="border rounded-lg shadow-xl my-10 p-10">
      <form
        className="text-green-900 font-semibold"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="table">
          <div className="table-row-group">
            {/* Release Date */}
            <div className="table-row">
              <div className={`${td} lg:w-28`}>
                <label htmlFor="input_date">Release Dates</label>
              </div>
              <div id="input_date" className={`${td} lg:flex`}>
                <div className="flex justify-between">
                  <label htmlFor="release_date.gte" className="text-gray-400">
                    from
                  </label>
                  <input
                    type="date"
                    id="release_date.gte"
                    name="release_date.gte"
                    className="mx-5"
                    onChange={(e) => setFromReleaseDate(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="release_date.lte" className="text-gray-400">
                    to
                  </label>
                  <input
                    type="date"
                    id="release_date.lte"
                    name="release_date.lte"
                    className="mx-5"
                    onChange={(e) => setToReleaseDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Genres */}
            <div className="table-row">
              <div className={td}>
                <label className="text-left">Genres</label>
              </div>
              <div className={td}>
                <ul className="flex flex-wrap">
                  {genres.map((genre) => {
                    const { id, name } = genre;
                    return (
                      <li key={id} className="py-1 pr-1 my-1 mr-1">
                        <label className="border border-gray-300 p-1 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            id={name}
                            name={name}
                            className="mr-1"
                            value={id}
                            onChange={(e) => {
                              filter_genres(e);
                            }}
                          />
                          {name}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* Certification */}
            <div className="table-row">
              <div className={td}>
                <label className="mr-1">Certification</label>
              </div>
              <div className={td}>
                <ul className="flex flex-wrap">
                  {certifications.map((item) => {
                    const { certification, order } = item;
                    return (
                      <li key={order} className="py-1 pr-1 my-1 mr-1">
                        <label className="border border-gray-300 p-1 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            id={order}
                            name={certification}
                            value={certification}
                            className="mr-1"
                            onChange={(e) => filter_certification(e)}
                          />
                          {certification}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* User Score */}
            <div className="table-row">
              <div className={td}>
                <label>User Score</label>
              </div>
              <div className={td}>
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-400 rounded text-center w-8"
                  value={lowerBound}
                  onChange={(e) => {
                    setLowerBound(e.target.value);
                  }}
                />
                <span className="text-gray-400"> to </span>
                <input
                  type="text"
                  placeholder="10"
                  className="border border-gray-400 rounded text-center w-8"
                  value={upperBound}
                  onChange={(e) => {
                    setUpperBound(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Keywords */}
            {/* <div className="table-row">
              <div className={td}>
                <label>Keywords </label>
              </div>
              <div className={td}>
                <input
                  type="text"
                  className="border border-gray-400 rounded pl-1"
                  value={keyword}
                  placeholder="e.g. funny"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div> */}
          </div>
        </div>

        {/* Search */}
        <button type="submit" className="table-row btn my-1 w-full">
          Search
        </button>
        <button
          type="button"
          className="btn my-1 bg-red-400 w-full hover:bg-red-700"
          onClick={() => clearAll()}
        >
          Clear
        </button>
      </form>
    </section>
  );
};

export default Filter;
