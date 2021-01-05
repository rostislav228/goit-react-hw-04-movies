import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { actors } from "../../services/fetchAPI";
import Loader from "../Loader/Loader";
import noImage from "../../no-image.jpg";
import s from "./Cast.module.css";

export default function Cast() {
  const { movieId } = useParams();
  const [actor, setActor] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    actors(movieId).then(({ cast }) => setActor(cast));
  }, [movieId]);

  useEffect(() => {
    if (actor === null) {
      return setStatus("pending");
    }
    if (actor && actor.length !== 0) {
      return setStatus("resolved");
    }

    return setStatus("rejected");
  }, [actor]);

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "resolved") {
    return (
      <ul className={s.list}>
        {actor &&
          actor.map(({ id, name, character, profile_path }) => (
            <li key={id} className={s.item}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                  alt={name}
                  width="200px"
                  className={s.image}
                />
              ) : (
                <img
                  src={noImage}
                  alt={name}
                  width="200px"
                  className={s.image}
                />
              )}
              <h3 className={s.title}>{name}</h3>
              <p className={s.text}>{character}</p>
            </li>
          ))}
      </ul>
    );
  }

  if (status === "rejected") {
    return <h3 className={s.title}>This film has no cast.</h3>;
  }

  return <h1>404 ERROR</h1>;
}
