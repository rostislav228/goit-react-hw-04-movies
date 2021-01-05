import error from "../../404-error.jpg";
import Container from "../../components/Container/Container";
import s from "./NotFoundView.module.css";

export default function NotFoundView() {
  return (
    <Container>
      <img
        src={error}
        alt="404 error"
        width="700px"
        height="525px"
        className={s.image}
      />
      <h1 className={s.title}>404 Page not found</h1>
    </Container>
  );
}
