import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { AppDispatch, DataLoadingStatus, RootState } from "../../store";
import { selectScheduleById } from "../../store/selectors";
import { ScheduleModel } from "../../store/types";
import { createSchedule } from "../../utils/create-schedule";
import { schedulesCreateScheduleAction } from "../../store/actions";
import { WeekCopyModeContext, weekCopyModeDefault } from "../../contexts";

// ASSETS ------------------------------------------------------------
import icoPlus from "../../assets/svg/add_black_24dp.svg";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./schedule.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { LocalLoadingIndicator } from "../common/local-loading-indicator/local-loading-indicator";
import { TrainingYear } from "../training-year/training-year";
// -------------------------------------------------------------------

type RouteParams = {
  scheduleId: string
}

type Props = {};

const Schedule: React.FC<Props> = (props) => {

  console.log("Schedule called!");

  const now = new Date();
  const currYear = now.getFullYear();
  const dispatch = useDispatch<AppDispatch>();
  const match = useRouteMatch<RouteParams>();
  const [weekCopyMode, setWeekCopyMode] = useState(weekCopyModeDefault);

  const schedule = useSelector<RootState, ScheduleModel | undefined>(
    state => selectScheduleById(state, match.params.scheduleId)
  );

  const schedulesStatus = useSelector<RootState, DataLoadingStatus>(state => state.schedules.status);
  const schedulesError = useSelector<RootState, string | null>(state => state.schedules.error);

  const handleScheduleCreate = () => {
    dispatch(
      schedulesCreateScheduleAction(createSchedule([currYear - 2, currYear - 1, currYear], { trainingsCount: 0 }))
    );
  }

  if (schedule === undefined) {
    return <div>Schedule (scheduleId: {match.params.scheduleId}) not found.</div>
  }

  if (schedulesStatus === "loading") {
    return (
      <LocalLoadingIndicator
        text="Loading schedule"
        type="iphone1"
      />
    );
  }

  if (schedulesError !== null) {
    return (
      <div className="schedule">
        <div className="app-message app-message--error schedule__message">
          <div className="app-message__title">Schedule loading failed.</div>
          <div className="app-message__reason">{schedulesError}.</div>
        </div>
        <div className="schedule__create-button">
          <button onClick={handleScheduleCreate} className="button button--ico-text">
            <img src={icoPlus} alt="ico-plus" />
            <span>Create new schedule</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule">

      <div className="schedule__year-selector">
        {Object.keys(schedule.years).map(year => (
          <NavLink
            key={year}
            to={`${match.url}/${year}`}
            className="schedule__button schedule-button"
            activeClassName="schedule-button--active"
          >{year}</NavLink>
        ))}
      </div>

      <WeekCopyModeContext.Provider value={{ ...weekCopyMode, setWeekCopyMode }}>
        <Switch>
          {Object.keys(schedule.years).map(year => (
            <Route key={year} path={`${match.path}/${year}`}>
              <TrainingYear
                scheduleId={schedule.scheduleId}
                year={year}
                trainingYear={schedule.years[year]}
              />
            </Route>
          ))}
          <Route path={`${match.path}/*`}>Training year not found.</Route>
          <Redirect exact from={match.path} to={`${match.url}/${currYear}`} />
        </Switch>
      </WeekCopyModeContext.Provider>

    </div>
  );
}

export { Schedule };