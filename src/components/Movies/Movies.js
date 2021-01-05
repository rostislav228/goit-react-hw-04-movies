import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import noImage from "../../no-image.jpg";
import s from "./Movies.module.css";

export default function Movies({ fetchAPI, name = "" }) {
  const [movies, setMovies] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    setStatus("pending");
    setMessage("");
    fetchAPI(name).then((data) => {
      if (data.results.length === 0) {
        setStatus("rejected");
        return setMessage("Oops... We don't have that.");
      }

      setMovies(data.results);
      return setStatus("resolved");
    });
  }, [fetchAPI, name]);

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "resolved") {
    return (
      <ul className={s.list}>
        {movies &&
          movies.map(({ id, title, poster_path }) => (
            <li key={id} className={s.item}>
              <Link to={`/movies/${id}`}>
                {poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    width="294px"
                    className={s.image}
                  />
                ) : (
                  <img
                    src={noImage}
                    alt={title}
                    width="294px"
                    className={s.image}
                  />
                )}
              </Link>
              <p className={s.title}>{title}</p>
            </li>
          ))}
      </ul>
    );
  }

  if (status === "rejected") {
    return <h2>{message}</h2>;
  }

  return <h2>404 ERROR</h2>;
}

Movies.propTypes = {
  fetchAPI: PropTypes.func,
  name: PropTypes.string,
};
