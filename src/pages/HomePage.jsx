import { useEffect, useState } from "react";
import { getTrendingMovies } from "../apiService/Films";
import { MovieList } from "../components/MovieList/MovieList";
import axios from "axios";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getTrendingMovies({
      abortController: controller,
    })
      .then((resp) => {
        setMovies(resp.movies);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {error && <p>Oops! Error!</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
