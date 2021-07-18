import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";

// STYLES ------------------------------------------
import "./App.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Home } from "./components/home/home";
import { Options } from "./components/options/options";
import { Header } from "./components/common/header/header";
import { Footer } from "./components/common/footer/footer";
import { TrainingWeek } from "./components/training-week/training-week";
import { Schedule } from "./components/schedule/schedule";
import { Bla } from "./components/bla/bla";
// -------------------------------------------------

function App() {

  return (
    <div className="app theme-girls">

      <BrowserRouter>

        <div className="app__header">
          <Header />
        </div>

        <div className="app__main">

          <Switch>

            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/bla" exact>
              <Bla />
            </Route>

            <Route path="/schedule">
              <Schedule />
            </Route>

            <Route path="/week-schedule/:year/:weekId">
              <TrainingWeek />
            </Route>

            <Route path="/options">
              <Options />
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>

          </Switch>

        </div>

        <div className="app__footer">
          <Footer />
        </div>

      </BrowserRouter>

    </div>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
