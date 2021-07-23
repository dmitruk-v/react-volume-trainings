import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { AppDispatch, DataLoadingStatus, RootState } from "../../store";
import { selectScheduleById, selectAllSchedules } from "../../store/selectors";
import { ScheduleModel, SchedulesModel } from "../../store/types";
import { createSchedule } from "../../utils/create-schedule";
import { schedulesCreateScheduleAction, schedulesLoadAction, schedulesLoadFailedAction, schedulesLoadSucceededAction } from "../../store/actions";
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

type RouteParams = {
  scheduleId: string
}

type Props = {};

const Schedule: React.FC<Props> = (props) => {

  const dispatch = useDispatch<AppDispatch>();
  const match = useRouteMatch<RouteParams>();
  const currYear = new Date().getFullYear();
  const allSchedules = useSelector<RootState, SchedulesModel>(selectAllSchedules);
  const schedule = useSelector<RootState, ScheduleModel | undefined>(state => selectScheduleById(state, match.params.scheduleId));
  const schedulesStatus = useSelector<RootState, DataLoadingStatus>(state => state.schedules.status);
  const schedulesError = useSelector<RootState, string | null>(state => state.schedules.error);

  console.log("Schedule called", schedule);

  // const scheduleDataProvider = useLocalStorage<SchedulesModel>(LS_SCHEDULE_KEY, scheduleDataTransformer);

  // useEffect(() => {
  //   if (schedulesStatus === "succeeded") {
  //     scheduleDataProvider.save(allSchedules);
  //   }
  // }, [allSchedules, schedulesStatus, scheduleDataProvider]);

  // useEffect(() => {
  //   if (schedulesStatus === "idle") {
  //     dispatch(schedulesLoadAction());
  //     setTimeout(() => {
  //       scheduleDataProvider.load()
  //         .then(schedules => {
  //           dispatch(schedulesLoadSucceededAction(schedules));
  //         })
  //         .catch(error => {
  //           dispatch(schedulesLoadFailedAction(error));
  //         })
  //     }, 1000);
  //   }
  // }, [dispatch, schedulesStatus, scheduleDataProvider]);

  const handleScheduleCreate = () => {
    dispatch(
      schedulesCreateScheduleAction(createSchedule([currYear], { trainingsCount: 0 }))
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

      <Switch>
        {Object.keys(schedule.years).map(year => (
          <Route key={year} path={`${match.path}/${year}`}>
            <TrainingYear
              scheduleId={schedule.scheduleId}
              year={year}
            />
          </Route>
        ))}
        <Redirect exact from={match.path} to={`${match.url}/${currYear}`} />
      </Switch>

    </div>
  );
}

const scheduleDataTransformer = (key: any, value: any) => key === "weekStartDate" ? new Date(value) : value;

export { Schedule };