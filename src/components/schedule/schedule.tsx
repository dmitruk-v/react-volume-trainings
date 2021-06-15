import { WeekScheduleModel, calculateWeekStats, Day, RootState } from "../../store";
import { useMemo } from "react";
import { NavLink, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// COMPONENTS --------------------------------------
import TrainingDay from "./training-day/training-day";
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
        <div className="schedule__title">Week</div>
        <div className="schedule__stats">
          <div className="stats">
            <div className="stats__item">
              <div className="stats-item stats-item--volume">
                <div className="stats-item__term">Volume</div>
                <div className="stats-item__value">{weekStats.volume.toFixed(2)} <span className="stats-item__units">t</span></div>
              </div>
            </div>
            <div className="stats__item">
              <div className="stats-item stats-item--intensity">
                <div className="stats-item__term">Intensity</div>
                <div className="stats-item__value">{weekStats.intensity.toFixed(1)} <span className="stats-item__units">kg</span></div>
              </div>
            </div>
            <div className="stats__item">
              <div className="stats-item stats-item--reps">
                <div className="stats-item__term">Reps</div>
                <div className="stats-item__value">{weekStats.reps} <span className="stats-item__units">reps</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="schedule__menu">
        <div className="schedule-menu">
          <div className="schedule-menu__list">
            {Object.keys(props.initialSchedule).map(dayKey => {
              return (
                <li key={dayKey} className="schedule-menu__item">
                  <NavLink
                    to={`${url}/${dayKey.toLocaleLowerCase()}`}
                    className="schedule-menu__link"
                    activeClassName="schedule-menu__link--active">{dayKey}</NavLink>
                </li>
              );
            })}
          </div>
        </div>
      </div>

      <div className="schedule__days">

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