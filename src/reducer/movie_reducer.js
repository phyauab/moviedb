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
import compareCertifications from "../helpers/helpers";
import popular_movie_data from "../data/popular_movie_data";

const movie_reducer = (state, action) => {
  // fectch movies
  if (
    action.type === FETCH_TRENDING_MOVIE ||
    action.type === FETCH_POPULAR_MOVIE ||
    action.type === FETCH_TOP_RATED_MOVIE ||
    action.type === FETCH_UPCOMING_MOVIE
  ) {
    const tempMovieCategories = state.movieCategories;
    tempMovieCategories.forEach((item) => {
      if (item.action === action.type) {
        item.movies = action.payload.data.results;
      }
    });
    return { ...state, movieCategories: tempMovieCategories };
  }

  if (action.type === FETCH_MOVIE_GENRE) {
    return { ...state, genres: action.payload.data.genres };
  }

  if (action.type === FETCH_MOVIE_CERTIFICATIONS) {
    const certifications = action.payload.data.certifications.US;
    certifications.sort(compareCertifications);
    return { ...state, certifications: certifications };
  }

  if (action.type === FETCH_FILTER) {
    return { ...state, display_movies: action.payload };
  }

  if (action.type === FETCH_PEOPLE) {
    return { ...state, people: action.payload.data.results };
  }

  if (action.type === FETCH_MOVIE_DETAIL) {
    const tempMovie = state.singleMovie;
    tempMovie.details = action.payload.data;
    return { ...state, singleMovie: tempMovie };
  }

  if (action.type === FETCH_MOVIE_CREDITS) {
    const tempMovie = state.singleMovie;
    tempMovie.credits = action.payload.data;
    return { ...state, singleMovie: tempMovie };
  }
  return { ...state };
};

export default movie_reducer;
