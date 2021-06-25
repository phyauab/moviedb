import React, { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "../reducer/movie_reducer";
import {
  FETCH_TRENDING_MOVIE,
  FETCH_POPULAR_MOVIE,
  FETCH_TOP_RATED_MOVIE,
  FETCH_UPCOMING_MOVIE,
  FETCH_MOVIE_GENRE,
  FETCH_MOVIE_CERTIFICATIONS,
  FETCH_FILTER,
  FETCH_PEOPLE,
  FETCH_MOVIE_DETAIL,
  FETCH_MOVIE_CREDITS,
} from "../constants/action";
import popular_movie_data from "../data/popular_movie_data";
import genre_data from "../data/genre_data";
import certifications_data from "../data/certifications_data";

const MovieContext = React.createContext();
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "d60f4e8797f13dd4c61d8414708bb669";

// initialState with dummy data
// uncomment useEffect() in here, filter.js to fetch
const initialState = {
  movieCategories: [
    {
      category: "Trending",
      keyword: "/trending/movie/day",
      action: FETCH_TRENDING_MOVIE,
      movies: popular_movie_data.results,
    },
    {
      category: "Popular",
      keyword: "/movie/popular",
      action: FETCH_POPULAR_MOVIE,
      movies: popular_movie_data.results,
    },
    {
      category: "Top Rated",
      keyword: "/movie/top_rated",
      action: FETCH_TOP_RATED_MOVIE,
      movies: popular_movie_data.results,
    },
    {
      category: "Upcoming",
      keyword: "/movie/upcoming",
      action: FETCH_UPCOMING_MOVIE,
      movies: popular_movie_data.results,
    },
  ],
  // {id,name}
  genres: genre_data.genres,
  certifications: certifications_data.certifications.US,
  displayMovies: popular_movie_data.results,
  people: [],
  singleMovie: {},
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAPI = async (action, url) => {
    console.log("WARNING: FETCHING");
    try {
      const response = await axios.get(url);
      console.log(response);
      dispatch({ type: action, payload: response });
    } catch (error) {}
  };

  // genres + certifications
  const fetchFilter2 = async () => {
    // https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
    const urlGenres = `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    // https://api.themoviedb.org/3/certification/movie/list?api_key=<<api_key>>
    const urlCertifications = `${API_URL}/certification/movie/list?api_key=${API_KEY}`;
    fetchAPI(FETCH_MOVIE_GENRE, urlGenres);
    fetchAPI(FETCH_MOVIE_CERTIFICATIONS, urlCertifications);
  };

  // search
  const fetchFilter = async (url) => {
    try {
      // const response = await axios.get(url);
      // const temp_display_movies = response.data.results;
      const temp_display_movies = popular_movie_data.results;
      dispatch({ type: FETCH_FILTER, payload: temp_display_movies });
    } catch (error) {}
  };

  // people
  const fetchPeople = async () => {
    const url = `${API_URL}/person/popular?api_key=${API_KEY}`;
    fetchAPI(FETCH_PEOPLE, url);
  };

  // movie detail + credit
  const fetchMovie = async (id) => {
    // detail
    // https://api.themoviedb.org/3/movie/423108?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US
    const urlDetail = `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
    fetchAPI(FETCH_MOVIE_DETAIL, urlDetail);
    // credits
    //https://api.themoviedb.org/3/movie/423108/credits?api_key=d60f4e8797f13dd4c61d8414708bb669&language=en-US
    const urlCredits = `${API_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
    fetchAPI(FETCH_MOVIE_CREDITS, urlCredits);
  };

  // Fetch Home Page Content
  // i.e. The 4 categories
  useEffect(() => {
    const tempMovieCategories = state.movieCategories;
    tempMovieCategories.forEach((item) => {
      const action = item.action;
      const url = `${API_URL}${item.keyword}?api_key=${API_KEY}&language=en-US&page=1`;
      //fetchAPI(action, url);
    });
  }, []);

  return (
    <MovieContext.Provider
      value={{ ...state, fetchFilter2, fetchFilter, fetchPeople, fetchMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
