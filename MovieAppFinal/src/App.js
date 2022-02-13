import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import FavIcon from "./components/FavIcon";
import Favorites from "./pages/Favorites";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import store from "./store/store";
import { Provider } from "react-redux";
import RegisterForm from "./components/RegisterForm";
import { useState } from "react";
import Search from "./pages/Search";
import ChangeLanguage from "./components/ChangeLanguage";
import { LanguageContext } from "./store/reducers/languageContext ";
import PageAr from "./pages/PageAr";

function App() {
  const [searchValue,setsearchValue ] = useState({
    searchValue: "",
  });
  const handleChange = (e) => {
    if (e.target.name === "searchValue") {
      setsearchValue({
        ...searchValue,
        searchValue: e.target.value,
      });
    }
  };
  const [contextLang, setContextLang] = useState("en");
  return (
    <div
      className={contextLang === "ar" ? "text-right bg-dark" : "text-left bg-dark"}
      dir={contextLang === "ar" ? "rtl" : "ltr"}
      >
      <LanguageContext.Provider value={{ contextLang, setContextLang }}>
    <Router>
    <div className="container">
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black">
        <div className="container">
          <div className="navbar-brand" >
            MoviesApp
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Popular
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/favorites"}>
                   Favorites <FavIcon />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/login"}>
                  <div className="">Login</div>  
                </Link>
              </li>
              <li className="nav-item">
                <ChangeLanguage />
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                value={searchValue.searchValue}
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="searchValue"
                onChange={(e) => handleChange(e)}
              />
              <Link to={"/search/:searchValue"}><button className="btn btn-outline-success" type="submit">
                Search
              </button></Link>
            </form>
          </div>
        </div>
      </nav>
      <Switch>
      <Route path={"/"} exact component={Movies} />
      <Route path={"/favorites"} exact component={Favorites} />
      <Route path={"/MovieDetails/:id"} exact component={MovieDetails} />
      <Route path={"/search/:searchValue"} exact render={()=>(<Search searchValue={searchValue}/>)} />
      <Route path={"/login"} exact component={LoginForm} />
      <Route path={"/register"} exact component={RegisterForm} />
      <Route path={"/ar"} exact component={PageAr} />
      </Switch>
      <Footer />
    </div>
    </Router>
    </LanguageContext.Provider>
    </div>
  );
}

function AppWithStore(){
  return <Provider store={store}>
  <App />
  </Provider>
}
export default AppWithStore;
