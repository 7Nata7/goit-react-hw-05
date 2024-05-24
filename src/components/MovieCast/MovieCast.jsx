import { useParams } from "react-router-dom";
import { getMovieCast, getPoster } from "../../api/Films.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    getMovieCast({
      movieId: movieId,
      abortController: controller,
    })
      .then((resp) => {
        setMovieCast(resp.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });

    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <div>
      {movieCast.length > 0 ? (
        <ul className={css.list}>
          {movieCast.map(({ id, name, character, profile }) => (
            <li key={id} className={css.listItem}>
              {profile ? (
                <img
                  src={getPoster(profile)}
                  alt={name}
                  className={css.castImg}
                />
              ) : (
                <img
                  src="https://fakeimg.pl/100x150?text=No+photo"
                  alt="No photo"
                  className={css.castImg}
                />
              )}

              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>We don`t have any information about cast.</div>
      )}
    </div>
  );
}
