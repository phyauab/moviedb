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
  FETCH_MOVIE_VIDEOS,
  FETCH_MOVIE_IMAGES,
  FETCH_WATCH_PROVIDERS,
  SET_ISLOADING_TRUE,
  SET_ISLOADING_FALSE,
} from "../constants/action";
import compareCertifications from "../helpers/helpers";

const movie_reducer = (state, action) => {
  // set loading
  if (action.type === SET_ISLOADING_TRUE) {
    //console.log("reducer loading true ");
    return { ...state, isLoading: true };
  }

  if (action.type === SET_ISLOADING_FALSE) {
    //console.log("reducer loading false ");
    return { ...state, isLoading: false };
  }

  // fectch recommendation
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
    console.log("finish fetching");
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

  if (action.type === FETCH_MOVIE_VIDEOS) {
    const tempMovie = state.singleMovie;
    tempMovie.videos = action.payload.data.results;
    return { ...state, singleMovie: tempMovie };
  }

  if (action.type === FETCH_MOVIE_IMAGES) {
    const tempMovie = state.singleMovie;
    tempMovie.images = action.payload.data;
    return { ...state, singleMovie: tempMovie, isLoading: false };
  }

  if (action.type === FETCH_WATCH_PROVIDERS) {
    return {
      ...state,
      watchProviders: action.payload.data.results,
      isLoading: false,
    };
  }
  return { ...state };
};

export default movie_reducer;
