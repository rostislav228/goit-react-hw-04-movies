import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Movies from "../../components/Movies/Movies";
import Container from "../../components/Container/Container";
import { searchWord } from "../../services/fetchAPI";
import s from "./MoviesView.module.css";

export default function Search() {
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState(null);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query === "") {
      return;
    }
    setName(query);
  }, [query]);

  const changeHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    history.push({ ...location, search: `query=${name}` });
  };

  const inputValue = () => {
    if (name !== null) {
      return name;
    }

    if (query) {
      return query;
    }

    return "";
  };

  return (
    <Container>
      <form action="" onSubmit={submitHandler} className={s.form}>
        <input
          className={s.input}
          type="text"
          value={inputValue()}
          onChange={changeHandler}
          placeholder="Search movies..."
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>

      {query && <Movies fetchAPI={searchWord} name={query} />}
    </Container>
  );
}
