import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
const HomeView = lazy(() => import("./views/HomeView"));
const MoviesView = lazy(() => import("./views/MoviesView/MoviesView"));
const MovieDetailsView = lazy(() =>
  import("./views/MovieDetailsView/MovieDetailsView")
);
const NotFoundView = lazy(() => import("./views/NotFoundView/NotFoundView"));

const App = () => {
  return (
    <>
      <Header />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
