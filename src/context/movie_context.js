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

// rule1: small functions
// rule2: context fetches
// rule3: pages feed data to components
// rule4: unless a page is ready, don't show

const MovieContext = React.createContext();
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
      page: 1,
      totalPage: 1,
    },
    {
      category: "Popular",
      keyword: "/movie/popular",
      movies: null,
      page: 1,
      totalPage: 1,
    },
    {
      category: "Top Rated",
      keyword: "/movie/top_rated",
      movies: null,
      page: 1,
      totalPage: 1,
    },
    {
      category: "Upcoming",
      keyword: "/movie/upcoming",
      movies: null,
      page: 1,
      totalPage: 1,
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
  page: 1,
  totalPage: 1,
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
  page: 1,
  totalPage: 1,
};

const initialSinglePerson = {
  status: "LOADING",
  details: null,
  movies: null,
};

const initialSearchResults = {
  status: "LOADING",
  movies: [],
  page: 1,
  totalPage: 1,
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
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = "d60f4e8797f13dd4c61d8414708bb669";
  const API_LANGUAGE = "en-US";
  const api = axios.create({baseURL : BASE_URL, params: { api_key:API_KEY, language: API_LANGUAGE, }});

  const fetchHome = async () => {
    setMovieCategories({ ...movieCategories, status: "LOADING" });
    const tempCategories = movieCategories.categories;

    try {
      for (let i = 0; i < movieCategories.categories.length; ++i) {
        const response = await api.get(movieCategories.categories[i].keyword, {
          params: {
            page: movieCategories.categories[i].page
          }
        })
        tempCategories[i].movies = response.data.results;
        tempCategories[i].page = response.data.page;
        tempCategories[i].totalPage = response.data.total_pages;
      }

    } catch (error) {
      setMovieCategories({ ...movieCategories, status: "ERROR" });
      return console.log(error);
    }

    setMovieCategories({ ...movieCategories, status: "LOADED" });
  };

  // search
  const fetchFilter = async () => {
    setGenres({ ...genres, status: "LOADING" });
    setCertifications({ ...certifications, status: "LOADING" });
    try {
      const responseGenres = await api.get('/genre/movie/list');
      const responseCertifications = await api.get('/certification/movie/list')

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
  const filterMovies = async (url, params) => {
    setMovieList({ ...movieList, status: "LOADING" });
    try {
      const response = await axios.get(url);
      // const re2 = await api.get('/discover/movie', {params})
      // console.log(re2);
      //console.log(response);

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
  const search = async (keyword, page) => {
    setSearchResults({ ...searchResults, status: "LOADING" });
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    try {
      const response = await api.get('/search/movie',{
        params: {
          query: keyword,
          page
        }
      })
      setSearchResults({
        movies: response.data.results,
        status: "LOADED",
        page: response.data.page,
        totalPage: response.data.total_pages,
      });
    } catch (error) {
      console.log(error);
      setSearchResults({ ...searchResults, status: "ERROR" });
    }
  };

  // for once in movies page
  const fetchMovieList = async () => {
    if (movieList.movieList.length === 0) {
      setMovieList({ ...movieList, status: "LOADING" });
      if (movieCategories.categories[0].movies === null) {
        //must await, else it will continue the code i.e. LOADED before the fetching finishes
        await fetchHome();
      }
      const list = movieCategories.categories[0].movies;
      setMovieList({
        movieList: list,
        status: "LOADED",
        page: movieCategories.categories[0].page,
        totalPage: movieCategories.categories[0].totalPage,
      });
    }
  };

  // watch providers
  const fetchProviders = async () => {
    
    setProviders({ ...providers, status: "LOADING" });
    try {
      const response = await api.get('/watch/providers/movie');
      setProviders({ providers: response.data.results, status: "LOADED" });
    } catch (error) {
      console.log(error);
      setProviders({ ...providers, status: "ERROR" });
    }
  };

  // people
  const fetchPeople = async (page) => {
    setPeople({ ...people, status: "LOADING" });
    try {
      const response = await api.get('/person/popular', {params: {page}})

      setPeople({
        status: "LOADED",
        people: response.data.results,
        page: response.data.page,
        totalPage: response.data.total_pages,
      });
    } catch (error) {
      console.log(error);
      setPeople({ ...people, status: "ERROR" });
    }
  };

  // person
  const fetchSinglePerson = async (id) => {
    setSinglePerson({ ...singlePerson, status: "LOADING" });

    try {
      const responseDetails = await api.get(`/person/${id}`);
      // movies
      const responseMovies = await api.get(`/person/${id}/movie_credits`);

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
    // const urlDetails = `${API_URL}/movie/${id}${API_KEY}${API_LANGUAGE}`;
    // const urlCredits = `${API_URL}/movie/${id}/credits${API_KEY}${API_LANGUAGE}`;
    // const urlVideos = `${API_URL}/movie/${id}/videos${API_KEY}${API_LANGUAGE}`;
    // const urlImages = `${API_URL}/movie/${id}/images?api_key=${API_KEY}`;
    const tempSingleMovie = singleMovie;

    try {
      const responseDetails = await api.get(`/movie/${id}`)
      tempSingleMovie.details = responseDetails.data;

      const responseCredits = await api.get(`/movie/${id}/credits`)
      tempSingleMovie.credits = responseCredits.data;

      const responseVideos = await api.get(`/movie/${id}/videos`)
      tempSingleMovie.videos = responseVideos.data.results;

      const responseImages = await api.get(`/movie/${id}/images`, {
        params: {
          language: null
        }
      })
      // const responseImages = await axios.get(urlImages)
      tempSingleMovie.images = responseImages.data;
      
      tempSingleMovie.status = "LOADED";
      setSingleMovie(tempSingleMovie);
    } catch (error) {
      console.log(error);
      setSingleMovie({ ...singleMovie, status: "ERROR" });
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
