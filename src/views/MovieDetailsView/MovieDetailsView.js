import { useState, useEffect } from "react";
import { useParams, Link, Route } from "react-router-dom";
import { movie } from "../../services/fetchAPI";
import Loader from "../../components/Loader/Loader";
import Cast from "../../components/Cast/Cast";
import Reviews from "../../components/Reviews/Reviews";
import Container from "../../components/Container/Container";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import s from "./MovieDetailsView.module.css";

export default function MovieDetailsView() {
  const [
    { genres, poster_path, original_title, overview, vote_average },
    setMovieObg,
  ] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    movie(movieId).then(
      ({ genres, poster_path, original_title, overview, vote_average }) => {
        setMovieObg({
          genres,
          poster_path,
          original_title,
          overview,
          vote_average,
        });
      }
    );
  }, [movieId]);

  if (original_title) {
    return (
      <Container>
        <MovieDetails
          genres={genres}
          poster_path={poster_path}
          original_title={original_title}
          overview={overview}
          vote_average={vote_average}
        />
        <hr />
        <h2 className={s.title}>Additional information</h2>
        <ul className={s.list}>
          <li className={s.item}>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li className={s.item}>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
        <hr />

        <Route path="/movies/:movieId/cast">
          <Cast />
        </Route>
        <Route path="/movies/:movieId/reviews">
          <Reviews />
        </Route>
      </Container>
    );
  }

  return <Loader />;
}
