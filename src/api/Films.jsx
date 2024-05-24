import axios from "axios";

const API_KEY = "11144b71e142cd1f6ec8753ecdd5b102";

const ACCESS_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGY0ZmVhYTEyOGJlZDM2ZTA4NjhlMDc0NTQ5MjRjMCIsInN1YiI6IjY1Y2UxMDAxYTNiNWU2MDE4NTJjYzQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yhGBT9Nh_d9rnX7qKs-acxPXijQBOJ1GEZQxl8mReIY";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = ACCESS_TOKEN;
axios.defaults.headers.accept = "application/json";

axios.defaults.params = {
  language: "en-US",
  api_key: API_KEY,
  per_page: 10,
};

export const getTrendingMovies = async ({ abortController }) => {
  const data = await axios.get("/trending/movie/day", {
    signal: abortController.signal,
  });

  const normalizedData = data.data.results.map(({ id, title }) => ({
    id,
    title,
  }));

  return { movies: normalizedData };
};

export const getMovieById = async ({ movieId, abortController }) => {
  const data = await axios.get(`/movie/${movieId}`, {
    signal: abortController.signal,
  });

  return { data };
};

export const getPoster = (poster_path) => {
  return `https://image.tmdb.org/t/p/w500${poster_path}`;
};

export const getMovies = async ({ query, page, abortController }) => {
  const movies = await axios.get(`/search/movie?query=${query}&page=${page}`, {
    signal: abortController.signal,
  });

  const normalizedData = movies.data.results.map(({ id, title }) => ({
    id,
    title,
  }));

  return { movies: normalizedData, totalMovies: movies.data.total_results };
};

export const getMovieCast = async ({ movieId, abortController }) => {
  const data = await axios.get(`/movie/${movieId}/credits`, {
    signal: abortController.signal,
  });

  const normalizedData = data.data.cast.map(
    ({ id, character, name, profile_path }) => ({
      id,
      character,
      name,
      profile: profile_path,
    })
  );

  return { data: normalizedData };
};

export const getMovieReviews = async ({ movieId, abortController }) => {
  const data = await axios.get(`/movie/${movieId}/reviews`, {
    signal: abortController.signal,
  });

  return { data };
};
