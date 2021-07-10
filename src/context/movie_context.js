import React, { useContext, useState } from "react";
import axios from "axios";
// import reducer from "../reducer/movie_reducer";
// import {
//   FETCH_TRENDING_MOVIE,
//   FETCH_POPULAR_MOVIE,
//   FETCH_TOP_RATED_MOVIE,
//   FETCH_UPCOMING_MOVIE,
//   FETCH_MOVIE_GENRE,
//   FETCH_MOVIE_CERTIFICATIONS,
//   SET_ISLOADING_TRUE,
//   SET_ISLOADING_FALSE,
// } from "../constants/action";

const MovieContext = React.createContext();
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "?api_key=d60f4e8797f13dd4c61d8414708bb669";
const API_LANGUAGE = "&language=en-US";
const API_PAGE = "&page";

// rule1: small functions
// rule2: context fetches
// rule3: pages feed data to components
// rule4: unless a page is ready, don't show

// const initialState = {
//   movieCategories: [
//     {
//       category: "Trending",
//       keyword: "/trending/movie/day",
//       action: FETCH_TRENDING_MOVIE,
//       movies: null,
//     },
//     {
//       category: "Popular",
//       keyword: "/movie/popular",
//       action: FETCH_POPULAR_MOVIE,
//       movies: null,
//     },
//     {
//       category: "Top Rated",
//       keyword: "/movie/top_rated",
//       action: FETCH_TOP_RATED_MOVIE,
//       movies: null,
//     },
//     {
//       category: "Upcoming",
//       keyword: "/movie/upcoming",
//       action: FETCH_UPCOMING_MOVIE,
//       movies: null,
//     },
//   ],
//   genres: genre_data.genres,
//   certifications: certifications_data.certifications.US,
//   displayMovies: popular_movie_data.results,
//   people: [],
//   singleMovie: {
//     details: null,
//     credits: null,
//     videos: null,
//     images: null,
//   },
//   isLoading: false,
//   watchProviders: null,
// };

const initialSingleMovie = {
  status: "LOADING",
  details: null,
  credits: null,
  videos: null,
  images: null,
};

const initialMovieCategories = {
  status: "LOADING",
  categories: [
    {
      category: "Trending",
      keyword: "/trending/movie/day",
      movies: null,
    },
    {
      category: "Popular",
      keyword: "/movie/popular",
      movies: null,
    },
    {
      category: "Top Rated",
      keyword: "/movie/top_rated",
      movies: null,
    },
    {
      category: "Upcoming",
      keyword: "/movie/upcoming",
      movies: null,
    },
  ],
};

const initialProviders = {
  status: "LOADING",
  providers: [],
};

const initialPeople = {
  status: "LOADING",
  people: [],
};

const initialGenres = {
  status: "LOADING",
  genres: [],
};

const initialCertifications = {
  status: "LOADING",
  certifications: [],
};

const initialMovieList = {
  status: "LOADING",
  movieList: [],
  page: 0,
  totalPage: 0,
};

const initialSinglePerson = {
  status: "LOADING",
  details: null,
  movies: null,
};

const initialSearchResults = {
  status: "LOADING",
  movies: [],
};

export const MovieProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [movieCategories, setMovieCategories] = useState(
    initialMovieCategories
  );
  const [singleMovie, setSingleMovie] = useState(initialSingleMovie);
  const [providers, setProviders] = useState(initialProviders);
  const [people, setPeople] = useState(initialPeople);
  const [genres, setGenres] = useState(initialGenres);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [movieList, setMovieList] = useState(initialMovieList);
  const [singlePerson, setSinglePerson] = useState(initialSinglePerson);
  const [searchResults, setSearchResults] = useState(initialSearchResults);

  // const fetchAPI = async (action, url) => {
  //   console.log("WARNING: FETCHING");
  //   try {
  //     const response = await axios.get(url);
  //     //console.log(response);
  //     dispatch({ type: action, payload: response });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // genres + certifications
  // const fetchFilter2 = async () => {
  //   dispatch({ type: SET_ISLOADING_TRUE });
  //   // https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
  //   const urlGenres = `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  //   // https://api.themoviedb.org/3/certification/movie/list?api_key=<<api_key>>
  //   const urlCertifications = `${API_URL}/certification/movie/list?api_key=${API_KEY}`;
  //   fetchAPI(FETCH_MOVIE_GENRE, urlGenres);
  //   fetchAPI(FETCH_MOVIE_CERTIFICATIONS, urlCertifications);
  //   dispatch({ type: SET_ISLOADING_FALSE });
  // };

  const fetchHome = async (url) => {
    setMovieCategories({ ...movieCategories, status: "LOADING" });
    const tempCategories = movieCategories.categories;
    await Promise.all(
      movieCategories.categories.map(async (movieCategory, i) => {
        const url = `${API_URL}${movieCategory.keyword}${API_KEY}${API_LANGUAGE}${API_PAGE}=1`;
        try {
          const response = await axios.get(url);
          // console.log(response);
          tempCategories[i].movies = response.data.results;
        } catch (error) {
          setMovieCategories({ ...movieCategories, status: "ERROR" });
          console.log(error);
          return;
        }
      })
    );

    setMovieCategories({ categories: tempCategories, status: "LOADED" });
  };

  // search
  const fetchFilter = async () => {
    setGenres({ ...genres, status: "LOADING" });
    setCertifications({ ...certifications, status: "LOADING" });
    try {
      const urlGenres = `${API_URL}/genre/movie/list${API_KEY}${API_LANGUAGE}`;
      const urlCertifications = `${API_URL}/certification/movie/list${API_KEY}`;
      const responseGenres = await axios.get(urlGenres);
      const responseCertifications = await axios.get(urlCertifications);
      setGenres({ genres: responseGenres.data.genres, status: "LOADED" });
      setCertifications({
        certifications: responseCertifications.data.certifications.US,
        status: "LOADED",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // search for user's input, for movieList
  const filterMovies = async (url) => {
    setMovieList({ ...movieList, status: "LOADING" });
    try {
      const response = await axios.get(url);
      console.log(response);
      setMovieList({
        ...movieList,
        movieList: response.data.results,
        status: "LOADED",
        page: response.data.page,
        totalPage: response.data.total_pages,
      });
    } catch (error) {
      console.log(error);
      setMovieList({ ...movieList, status: "ERROR" });
    }
  };

  // search bar
  const search = async (keyword) => {
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    const url = `${API_URL}/search/movie${API_KEY}${API_LANGUAGE}&query=${keyword}&page=1&include_adult=false`;
    try {
      setSearchResults({ ...searchResults, status: "LOADING" });
      const response = await axios(url);
      console.log(response.data.results);
      setSearchResults({ movies: response.data.results, status: "LOADED" });
    } catch (error) {
      console.log(error);
      setSearchResults({ ...searchResults, status: "ERROR" });
    }

    // setSearchResults({ ...searchResults, status: "LOADED" });
  };

  const fetchMovieList = async () => {
    if (movieList.movieList.length === 0) {
      setMovieList({ ...movieList, status: "LOADING" });
      if (movieCategories.categories[0].movies === null) {
        //must await, else it will continue the code i.e. LOADED before the fetching finishes
        await fetchHome();
      }
      const list = movieCategories.categories[0].movies;
      setMovieList({ movieList: list, status: "LOADED" });
    }
  };

  // watch providers
  const fetchProviders = async () => {
    const url = `${API_URL}/watch/providers/movie${API_KEY}`;
    setProviders({ ...providers, status: "LOADING" });
    try {
      const response = await axios.get(url);
      setProviders({ providers: response.data.results, status: "LOADED" });
    } catch (error) {
      console.log(error);
      setProviders({ ...providers, status: "ERROR" });
    }
  };

  // people
  const fetchPeople = async () => {
    const url = `${API_URL}/person/popular${API_KEY}`;
    setPeople({ ...people, status: "LOADING" });
    try {
      const response = await axios.get(url);
      setPeople({ status: "LOADED", people: response.data.results });
    } catch (error) {
      console.log(error);
      setPeople({ ...people, status: "ERROR" });
    }
  };

  // person
  const fetchSinglePerson = async (id) => {
    // https://api.themoviedb.org/3/person/18918?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US
    const urlDetails = `${API_URL}/person/${id}${API_KEY}${API_LANGUAGE}`;
    // https://api.themoviedb.org/3/person/18918/movie_credits?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US
    const urlMovies = `${API_URL}/person/${id}/movie_credits${API_KEY}${API_LANGUAGE}`;
    setSinglePerson({ ...singlePerson, status: "LOADING" });

    try {
      const responseDetails = await axios.get(urlDetails);
      console.log(urlMovies);

      // movies
      const responseMovies = await axios.get(urlMovies);
      console.log(responseMovies);
      const tempMovies = responseMovies.data;
      tempMovies.cast.sort(function (a, b) {
        const y1 = new Date(a.release_date).getFullYear();
        const y2 = new Date(b.release_date).getFullYear();
        if (y1 > y2) return 1;
        else if (y1 < y2) return -1;
        return 0;
      });
      tempMovies.cast.reverse();
      tempMovies.crew.sort(function (a, b) {
        const y1 = new Date(a.release_date).getFullYear();
        const y2 = new Date(b.release_date).getFullYear();
        if (y1 > y2) return 1;
        else if (y1 < y2) return -1;
        return 0;
      });
      tempMovies.crew.reverse();
      // movies

      setSinglePerson({
        status: "LOADED",
        details: responseDetails.data,
        movies: tempMovies,
      });
    } catch (error) {
      console.log(error);
      setSinglePerson({ ...singlePerson, status: "ERROR" });
    }
  };

  // movie detail + credit + videos + images
  const fetchSingleMovie = async (id) => {
    setSingleMovie({ ...singleMovie, status: "LOADING" });
    const urlDetails = `${API_URL}/movie/${id}${API_KEY}${API_LANGUAGE}`;
    const urlCredits = `${API_URL}/movie/${id}/credits${API_KEY}${API_LANGUAGE}`;
    const urlVideos = `${API_URL}/movie/${id}/videos${API_KEY}${API_LANGUAGE}`;
    const urlImages = `${API_URL}/movie/${id}/images${API_KEY}`;
    const tempSingleMovie = singleMovie;

    try {
      const responseDetails = await axios.get(urlDetails);
      tempSingleMovie.details = responseDetails.data;
      console.log(responseDetails);
      const responseCredits = await axios.get(urlCredits);
      console.log(responseCredits);
      tempSingleMovie.credits = responseCredits.data;
      const responseVideos = await axios.get(urlVideos);
      console.log(responseVideos);
      tempSingleMovie.videos = responseVideos.data.results;
      const responseImages = await axios.get(urlImages);
      console.log(responseImages);
      tempSingleMovie.images = responseImages.data;
      tempSingleMovie.status = "LOADED";
      setSingleMovie(tempSingleMovie);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movieCategories,
        singleMovie,
        providers,
        people,
        singlePerson,
        genres,
        certifications,
        movieList,
        searchResults,
        fetchHome,
        fetchFilter,
        fetchPeople,
        fetchSinglePerson,
        fetchSingleMovie,
        fetchProviders,
        fetchMovieList,
        filterMovies,
        search,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
