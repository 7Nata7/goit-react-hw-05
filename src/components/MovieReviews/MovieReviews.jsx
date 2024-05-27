import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/Films";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getMovieReviews({
      movieId: movieId,
      abortController: controller,
    })
      .then((resp) => {
        setMovieReviews(resp.data.data.results);
        setError(false);
      })
      .catch((error) => {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      });

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (error) {
    return <div>Failed to load reviews. Please try again later.</div>;
  }

  return (
    <div>
      {movieReviews.length > 0 ? (
        <ul className={css.list}>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id} className={css.listItem}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>We don`t have any reviews for this movie.</div>
      )}
    </div>
  );
}
