import Navigation from "../Navigation/Navigation";
import Container from "../Container/Container";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
}
