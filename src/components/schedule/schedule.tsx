import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { AppDispatch, DataLoadingStatus, RootState } from "../../store";
import { selectSchedule } from "../../store/selectors";
import { ScheduleModel } from "../../store/types";
import { createSchedule } from "../../utils/create-schedule";
import { scheduleCreateAction, scheduleLoadAction, scheduleLoadFailedAction, scheduleLoadSucceededAction } from "../../store/actions";
import { useLocalStorage } from "../../hooks/useLocalStorageAsync";
import { LS_SCHEDULE_KEY } from "../../constants";

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

type Props = {};

const Schedule: React.FC<Props> = (props) => {

  const currYear = new Date().getFullYear();
  const schedule = useSelector<RootState, ScheduleModel>(selectSchedule);
  const scheduleStatus = useSelector<RootState, DataLoadingStatus>(state => state.schedule.status);
  const scheduleError = useSelector<RootState, string | null>(state => state.schedule.error);
  const dispatch = useDispatch<AppDispatch>();
  const match = useRouteMatch();

  console.log("Schedule called", schedule);

  const scheduleDataProvider = useLocalStorage<ScheduleModel>(LS_SCHEDULE_KEY, scheduleDataTransformer);

  useEffect(() => {
    if (scheduleStatus === "succeeded") {
      scheduleDataProvider.save(schedule);
    }
  }, [schedule, scheduleStatus, scheduleDataProvider]);

  useEffect(() => {
    if (scheduleStatus === "idle") {
      dispatch(scheduleLoadAction());
      setTimeout(() => {
        scheduleDataProvider.load()
          .then(schedule => {
            dispatch(scheduleLoadSucceededAction(schedule));
          })
          .catch(error => {
            dispatch(scheduleLoadFailedAction(error));
          })
      }, 1000);
    }
  }, [dispatch, scheduleStatus, scheduleDataProvider]);

  const handleScheduleCreate = () => {
    dispatch(
      scheduleCreateAction(createSchedule([currYear], { trainingsCount: 0 }))
    );
  }

  if (scheduleStatus === "loading") {
    return (
      <LocalLoadingIndicator
        text="Loading schedule"
        type="iphone1"
      />
    );
  }

  if (scheduleError !== null) {
    return (
      <div className="schedule">
        <div className="app-message app-message--error schedule__message">
          <div className="app-message__title">Schedule loading failed.</div>
          <div className="app-message__reason">{scheduleError}.</div>
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

      <Switch>
        {Object.keys(schedule.years).map(year => (
          <Route key={year} path={`${match.path}/${year}`}>
            <TrainingYear year={year} />
          </Route>
        ))}
        <Redirect exact from={match.path} to={`${match.url}/${currYear}`} />
      </Switch>

    </div>
  );
}

const scheduleDataTransformer = (key: any, value: any) => key === "weekStartDate" ? new Date(value) : value;

export { Schedule };