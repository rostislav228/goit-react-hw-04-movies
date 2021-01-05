import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { reviews } from "../../services/fetchAPI";
import Loader from "../Loader/Loader";
import s from "./Reviews.module.css";

export default function Reviews() {
  const { movieId } = useParams();
  const [review, setReview] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    reviews(movieId).then(({ results }) => setReview(results));
  }, [movieId]);

  useEffect(() => {
    if (review === null) {
      return setStatus("pending");
    }
    if (review && review.length !== 0) {
      return setStatus("resolved");
    }

    return setStatus("rejected");
  }, [review]);

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "resolved") {
    return (
      <ul>
        {review &&
          review.map(({ id, author, content }) => (
            <li key={id} className={s.item}>
              <h3 className={s.title}>Author: {author}</h3>
              <p className={s.text}>{content}</p>
            </li>
          ))}
      </ul>
    );
  }

  if (status === "rejected") {
    return (
      <h3 className={s.title}>We don't have any reviews for this movie.</h3>
    );
  }

  return <h1>404 ERROR</h1>;
}
