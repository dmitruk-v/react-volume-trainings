import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { RootState } from "../../../store";
import { WeekCopyModeProvider } from "../contexts/week-copy-mode-provider";
import { selectScheduleById } from "../schedules-selectors";
import { ScheduleModel } from "../schedules-types";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./YearsSchedule.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { YearsScheduleYear } from "./YearsScheduleYear";
// -------------------------------------------------------------------

type RouteParams = {
  scheduleId: string
}

type Props = {};

const YearsSchedule = (props: PropsWithChildren<Props>) => {

  console.log("YearsSchedule called!");

  const currYear = new Date().getFullYear();
  const match = useRouteMatch<RouteParams>();

  const schedule = useSelector<RootState, ScheduleModel | undefined>(
    state => selectScheduleById(state, match.params.scheduleId)
  );

  if (schedule === undefined) {
    return <div>Schedule with scheduleId: "{match.params.scheduleId}" not found.</div>
  }

  return (
    <div className="years-schedule">

      <div className="years-schedule__year-selector">
        {Object.keys(schedule.years).map(year => (
          <NavLink
            key={year}
            to={`${match.url}/${year}`}
            className="years-schedule__button ysch-button"
            activeClassName="ysch-button--active"
          >{year}</NavLink>
        ))}
      </div>

      <WeekCopyModeProvider scheduleId={schedule.scheduleId}>
        <Switch>
          {Object.keys(schedule.years).map(year => (
            <Route key={year} path={`${match.path}/${year}`}>
              <YearsScheduleYear
                scheduleId={schedule.scheduleId}
                year={year}
                trainingYear={schedule.years[year]}
              />
            </Route>
          ))}
          <Route path={`${match.path}/*`}>Training year not found.</Route>
          <Redirect exact from={match.path} to={`${match.url}/${currYear}`} />
        </Switch>
      </WeekCopyModeProvider>

    </div>
  );
}

export { YearsSchedule };