import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";

// STYLES ------------------------------------------
import "./App.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { UserSelector } from "./features/users/components/UserSelector";
import { UserMenu } from "./features/users/components/UserMenu";
import { Header } from "./shared/components/Header";
import { Footer } from "./shared/components/Footer";

import { HomePage } from "./pages/home";
import { OptionsPage } from "./pages/options";
import { WeekSchedulePage } from "./pages/week-schedule";
import { YearsSchedulePage } from "./pages/years-schedule";
import { VirtualizationPage } from "./pages/virtualization-demo";
import { GameOfLifePage } from "./pages/game-of-life";
import { OtherMain as OtherMainPage } from "./pages/other";
// --------------------------------------------------

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__header">
          <Header
            userSelector={<UserSelector />}
            userMenu={<UserMenu />}
          />
        </div>
        <div className="app__main">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/years-schedule/:scheduleId" component={YearsSchedulePage} />
            <Route path="/week-schedule/:scheduleId/:year/:weekId" component={WeekSchedulePage} />
            <Route path="/options/:optionsId" component={OptionsPage} />
            <Route path="/features/virtualization" component={VirtualizationPage} />
            <Route path="/features/game-of-life" component={GameOfLifePage} />
            <Route path="/features/other" component={OtherMainPage} />
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
