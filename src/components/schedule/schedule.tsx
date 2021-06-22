import { WeekScheduleModel, calculateWeekStats, Day, RootState, calculateDayStats } from "../../store";
import { useMemo } from "react";
import { NavLink, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// COMPONENTS --------------------------------------
import TrainingDay from "./training-day/training-day";
import Stats from "./stats/stats";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./schedule.css";
// -------------------------------------------------

type Props = {
  initialSchedule: WeekScheduleModel
}

const Schedule: React.FC<Props> = (props) => {

  const activeDay = useSelector<RootState, Day>(state => state.appOptions.schedule.activeDay);
  const { path, url } = useRouteMatch();

  const weekStats = useMemo(
    () => calculateWeekStats(props.initialSchedule),
    [props.initialSchedule]
  );

  return (
    <div className="schedule">

      <div className="schedule__head">
        <div className="schedule__title-layout">
          <span className="schedule__title">Week stats</span>
        </div>
        <div className="schedule__stats">
          <Stats
            statsOptions={{
              modifierClasses: [
                "stats--week",
                "stats--colored-terms",
                "stats--colored-values"
              ],
              repsUnits: "",
            }}
            stats={weekStats}
          />
        </div>
      </div>

      <div className="schedule__days">
        <div className="days-menu">
          <div className="days-menu__items">
            {Object.keys(props.initialSchedule).map(dayKey => {
              const trainingDay = props.initialSchedule[dayKey as Day];
              const dayStats = calculateDayStats(trainingDay);
              return (
                <div key={dayKey} className="days-menu__item">
                  <NavLink
                    to={`${url}/${dayKey.toLocaleLowerCase()}`}
                    className={`menu-day ${dayStats.volume > 0 ? "menu-day--used" : ""}`}
                    activeClassName="menu-day--active"
                  >
                    <div className="menu-day__title">
                      <div className="menu-day__day-name">{dayKey}</div>
                      <div className="menu-day__trainings">{trainingDay.trainings.length}</div>
                    </div>
                    <div className="menu-day__stats">
                      <Stats
                        statsOptions={{
                          modifierClasses: [
                            "stats--vertical",
                            "stats--colored-values",
                          ]
                        }}
                        stats={dayStats}
                      />
                    </div>
                  </NavLink>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="schedule__selected-day">
        <Redirect path={`${path}`} exact to={`${path}/${activeDay.toLocaleLowerCase()}`} />

        {Object.keys(props.initialSchedule).map(dayKey => {
          return (
            <Route key={dayKey} path={`${path}/${dayKey.toLocaleLowerCase()}`}>
              <TrainingDay initialTrainingDay={props.initialSchedule[dayKey as Day]} />
            </Route>
          )
        })}
      </div>

    </div>
  );
}

export default Schedule;