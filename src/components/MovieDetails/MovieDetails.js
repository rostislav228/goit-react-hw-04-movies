import PropTypes from "prop-types";
import noImage from "../../no-image.jpg";
import s from "./MovieDetails.module.css";

const MovieDetails = ({
  genres,
  poster_path,
  original_title,
  overview,
  vote_average,
}) => {
  const rating = vote_average ? vote_average * 10 : null;

  return (
    <>
      <div className={s.divContainer}>
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={original_title}
            width="320px"
            className={s.image}
          />
        ) : (
          <img
            src={noImage}
            alt={original_title}
            width="320px"
            className={s.image}
          />
        )}

        <div className={s.div}>
          <h1 className={s.h1}>{original_title}</h1>
          <p className={s.p}>User Score: {rating}%</p>
          <h2 className={s.h2}>Overview</h2>
          <p className={s.p}>{overview}</p>
          <h2 className={s.h2}>Genres</h2>
          <ul className={s.list}>
            {genres &&
              genres.map(({ id, name }) => (
                <li key={id} className={s.item}>
                  {name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  poster_path: PropTypes.string,
  original_title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
};

export default MovieDetails;
