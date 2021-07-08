import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import {
  Home,
  SearchResult,
  Movies,
  SingleMovie,
  Providers,
  People,
  SinglePerson,
  About,
} from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route path="/movies/:id" children={<SingleMovie />} />
        <Route path="/providers">
          <Providers />
        </Route>
        <Route exact path="/people">
          <People />
        </Route>
        <Route path="/people/:id" children={<SinglePerson />} />
        <Route path="/about">
          <About />
        </Route>
        <Route path="/search">
          <SearchResult />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
