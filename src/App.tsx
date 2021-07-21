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
import { Users } from "./components/users/users";
import { Auth } from "./components/auth/auth";
// -------------------------------------------------

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/bla" component={Bla} />
            <Route path="/auth" component={Auth} />
            <Route path="/users" component={Users} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/week-schedule/:year/:weekId" component={TrainingWeek} />
            <Route path="/options" component={Options} />
            <Route path="*" component={NoMatch} />
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
  return <h3>No match for <code>{location.pathname}</code></h3>;
}

export default App;
