import { useMemo, useState } from "react";
import { useRouteMatch, NavLink, useLocation } from "react-router-dom";
import { TrainingDayModel, calculateDayStats, updateTrainingDayAction, RootState, WeekScheduleModel } from "../../../store";
import { WEEK_DAYS, WeekDay } from "../../../constants/date-and-time";
import { useDispatch, useSelector } from "react-redux";
import { createClonedTraining } from "../../../utils/schedule-utils";

// COMPONENTS --------------------------------------
import Stats from "../stats/stats";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./menu-day.css";
// -------------------------------------------------

type Props = {
  trainingDay: TrainingDayModel
};

const MenuDay: React.FC<Props> = (props) => {

  const match = useRouteMatch();
  const location = useLocation();

  const dispatch = useDispatch();
  const [cloneMenuVisible, setCloneMenuVisible] = useState(false);
  const weekSchedule = useSelector<RootState, WeekScheduleModel>(state => state.weekSchedule);

  const dayStats = useMemo(
    () => calculateDayStats(props.trainingDay),
    [props.trainingDay]
  );

  const handleCloneDay = (dayToClone: WeekDay) => {
    dispatch(
      updateTrainingDayAction({
        ...props.trainingDay,
        trainings: weekSchedule[dayToClone].trainings.map(tr => createClonedTraining(tr))
      })
    );
    setCloneMenuVisible(false);
  }

  const isCurrentDayUrl = () => location.pathname.endsWith(props.trainingDay.day.toLocaleLowerCase());

  const getMenuDayClasses = () => {
    return `${isCurrentDayUrl() ? "menu-day--active" : ""} ${dayStats.volume > 0 ? "menu-day--used" : ""}`;
  }

  return (
    <div className={`menu-day ${getMenuDayClasses()}`}>

      <NavLink
        to={`${match?.url}/${props.trainingDay.day.toLocaleLowerCase()}`}
        className="menu-day__link"
        activeClassName="menu-day__link--active"
      />

      <div className="menu-day__title">
        <button className="button-type1 menu-day__menu-button" onClick={() => setCloneMenuVisible(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgba(0, 0, 0, 0.25)">
            <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
          </svg>
        </button>
        <div className="menu-day__day-name">{props.trainingDay.day}</div>
        <div className="menu-day__trainings">{props.trainingDay.trainings.length}</div>
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
      <div className={`dropdown ${cloneMenuVisible ? "dropdown--visible" : ""} dropdown--anim_from-ct menu-day__dropdown`}>
        <div className="dropdown__inner">
          <div className="dropdown-title">Clone from:</div>
          <div className="dropdown-menu">
            <ul className="dropdown-menu__list">
              {WEEK_DAYS.map(day =>
                day !== props.trainingDay.day
                  ? (
                    <li key={day} className="dropdown-menu__item">
                      <button
                        className="dropdown-menu__button"
                        onClick={() => handleCloneDay(day)}
                      >{day}</button>
                    </li>
                  )
                  : null
              )}
            </ul>
          </div>
        </div>
        <button className="button-type1 dropdown__close-btn" onClick={() => setCloneMenuVisible(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default MenuDay;