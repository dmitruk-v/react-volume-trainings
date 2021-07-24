import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { AppDispatch, calculateTrainingDayStats, DataLoadingStatus, RootState } from "../../store";
import { selectScheduleById, selectAllSchedules, selectTrainingYear } from "../../store/selectors";
import { ScheduleModel, SchedulesModel, TrainingWeekModel, TrainingYearModel, WeekDay } from "../../store/types";
import { createSchedule } from "../../utils/create-schedule";
import { schedulesCreateScheduleAction, schedulesLoadAction, schedulesLoadFailedAction, schedulesLoadSucceededAction } from "../../store/actions";
import { useLocalStorage } from "../../hooks/useLocalStorageAsync";
import { LS_SCHEDULE_KEY } from "../../constants";
import { getDayStartDate, getWeekStartDate } from "../../utils/date-utils";

// ASSETS ------------------------------------------------------------
import icoPlus from "../../assets/svg/add_black_24dp.svg";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./schedule.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { LocalLoadingIndicator } from "../common/local-loading-indicator/local-loading-indicator";
import { TrainingYear } from "../training-year/training-year";
import { YearWeek } from "../year-week/year-week";
import { YearDay } from "../year-day/year-day";
import { useScrollIntoView } from "../../hooks/useScrollIntoView";
// -------------------------------------------------------------------

type RouteParams = {
  scheduleId: string
}

type Props = {};

const Schedule: React.FC<Props> = (props) => {

  const now = new Date();
  const currYear = now.getFullYear();
  const dispatch = useDispatch<AppDispatch>();
  const match = useRouteMatch<RouteParams>();
  const allSchedules = useSelector<RootState, SchedulesModel>(selectAllSchedules);

  const schedule = useSelector<RootState, ScheduleModel | undefined>(
    state => selectScheduleById(state, match.params.scheduleId)
  );

  const schedulesStatus = useSelector<RootState, DataLoadingStatus>(state => state.schedules.status);
  const schedulesError = useSelector<RootState, string | null>(state => state.schedules.error);

  const todayStartDate = getDayStartDate(now);
  const todayWeekStartDate = getWeekStartDate(now);

  const currWeekRef = useRef<HTMLDivElement>(null);

  const getRef = (week: TrainingWeekModel) => {
    // console.log("GET_REF", week, week.weekStartDate.getTime() === todayWeekStartDate.getTime());
    return week.weekStartDate.getTime() === todayWeekStartDate.getTime() ? currWeekRef : null
  };

  useScrollIntoView<HTMLDivElement>(currWeekRef, []);

  console.log("Schedule called", schedule, todayWeekStartDate, todayWeekStartDate.getTime());

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

      <Switch>
        {Object.keys(schedule.years).map(year => (
          <Route key={year} path={`${match.path}/${year}`}>
            <TrainingYear
              scheduleId={schedule.scheduleId}
              year={year}
            >
              {schedule.years[year].weeks.map((week, weekIdx) => (
                <div ref={getRef(week)} key={week.weekId} className="training-year__week">
                  <YearWeek
                    scheduleId={schedule.scheduleId}
                    year={year}
                    weekNum={weekIdx + 1}
                    trainingWeek={week}
                    todayWeekStartDate={todayWeekStartDate}
                  >
                    {Object.keys(week.days).map((day, dayIdx) => {
                      const dayStats = calculateTrainingDayStats(week.days[day as WeekDay]);
                      const dayDate = new Date(
                        week.weekStartDate.getFullYear(),
                        week.weekStartDate.getMonth(),
                        week.weekStartDate.getDate() + dayIdx
                      );
                      return (
                        <div key={day} className="t-year-week__day">
                          <YearDay
                            isUsed={dayStats.volume > 0}
                            scheduleId={schedule.scheduleId}
                            year={year}
                            weekId={week.weekId}
                            day={day as WeekDay}
                            dayDate={dayDate}
                            todayStartDate={todayStartDate}
                          />
                        </div>
                      );
                    })}
                  </YearWeek>
                </div>
              ))}
            </TrainingYear>
          </Route>
        ))}
        <Redirect exact from={match.path} to={`${match.url}/${currYear}`} />
      </Switch>

    </div>
  );
}

const scheduleDataTransformer = (key: any, value: any) => key === "weekStartDate" ? new Date(value) : value;

export { Schedule };