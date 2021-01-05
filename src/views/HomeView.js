import Movies from "../components/Movies/Movies";
import Container from "../components/Container/Container";
import { popular } from "../services/fetchAPI";

export default function HomeView() {
  return (
    <Container>
      <h1>Trending today</h1>

      <Movies fetchAPI={popular} />
    </Container>
  );
}
