import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      {movies.length > 0 && (
        <ul className={css.list}>
          {movies.map((movie) => (
            <li key={movie.id} className={css.listItem}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
