import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMovieById } from "../api/Films";
import { MovieListItem } from "../components/MovieListItem/MovieListItem";
import { BackLink } from "../components/BackLink/BackLink";
import axios from "axios";

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getMovieById({
      movieId: movieId,
      abortController: controller,
    })
      .then((resp) => {
        setMovie(resp.data.data);
        setError(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (error) {
    return <div>Failed to load movie details. Please try again later.</div>;
  }

  return (
    <div>
      <BackLink href={backLinkRef.current ?? "/movies"}>Go back</BackLink>
      {movie && <MovieListItem movie={movie} />}
    </div>
  );
}
