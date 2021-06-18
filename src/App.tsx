import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { RootState, WeekScheduleModel } from "./store";
import { useSelector } from 'react-redux';

// COMPONENTS --------------------------------------
import Schedule from './components/schedule/schedule';
import Options from "./components/options/options";
import Header from './components/header/header';
import Footer from './components/footer/footer';
// -------------------------------------------------

// STYLES ------------------------------------------
import './App.css';
// -------------------------------------------------

function App() {

  const schedule = useSelector<RootState, WeekScheduleModel>(state => state.weekSchedule);

  return (
    <div className="app theme-girls">

      <BrowserRouter>

        <div className="app__header">
          <Header />
        </div>

        <div className="app__main">

          <Switch>

            <Route path="/" exact>
              <div className="app__home">Home page</div>
            </Route>

            <Route path="/schedule">
              <div className="app__schedule">
                <Schedule initialSchedule={schedule} />
              </div>
            </Route>

            <Route path="/options">
              <div className="app__options">
                <Options />
              </div>
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>

          </Switch>

        </div>
        <div className="app__footer"><Footer /></div>
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
