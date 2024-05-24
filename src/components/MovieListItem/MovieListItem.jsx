import { Link, Outlet } from "react-router-dom";
import { getPoster } from "../../apiService/Films";
import css from "./MovieListItem.module.css";

export const MovieListItem = ({ movie }) => {
  return (
    <div>
      <div className={css.posterAndDesc}>
        {movie.poster_path ? (
          <img
            src={getPoster(movie.poster_path)}
            alt={movie.title}
            className={css.poster}
          />
        ) : (
          <img
            src="https://fakeimg.pl/300x450?text=No+poster"
            alt="No poster"
            className={css.poster}
          />
        )}
        <div className={css.desc}>
          <h1 className={css.title}>
            {movie.title} ({movie.release_date.substring(0, 4)})
          </h1>
          <p>User score: {Math.round(movie.vote_average * 10)}&#x25;</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <ul className={css.geners}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h3>Additional information</h3>
        <ul className={css.list}>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};
