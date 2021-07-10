import { useMemo, useState } from "react";
import { useRouteMatch, NavLink, useLocation } from "react-router-dom";
import { AppDispatch, calculateTrainingDayStats, RootState } from "../../store";
import { yearScheduleUpdateTrainingDayAction } from "../../store/actions";
import { WeekDay, TrainingWeekModel, TrainingDayModel } from "../../store/types";
import { WEEK_DAYS } from "../../constants/date-and-time";
import { useDispatch, useSelector } from "react-redux";
import { createClonedTraining } from "../../utils/schedule-utils";
import { getClasses } from "../../utils/css-utils";

// ASSETS ------------------------------------------
import icoMenu from "../../assets/svg/menu_grey_24dp.svg";
import icoMenuClose from "../../assets/svg/close_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./menu-day.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Stats } from "../stats/stats";
// -------------------------------------------------

type Props = {
  year: string,
  weekId: string,
  trainingDay: TrainingDayModel
};

const MenuDay: React.FC<Props> = (props) => {

  const match = useRouteMatch();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const [cloneMenuVisible, setCloneMenuVisible] = useState(false);
  const trainingWeek = useSelector<RootState, TrainingWeekModel | undefined>(
    state => state.yearSchedule[props.year].find(week => week.weekId === props.weekId)
  );

  const dayStats = useMemo(
    () => calculateTrainingDayStats(props.trainingDay),
    [props.trainingDay]
  );

  const handleCloneDay = (dayToClone: WeekDay) => {
    if (trainingWeek === undefined) return;
    const updatedTrainingDay: TrainingDayModel = {
      ...props.trainingDay,
      trainings: trainingWeek.days[dayToClone].trainings.map(tr => createClonedTraining(tr))
    };
    dispatch(
      yearScheduleUpdateTrainingDayAction(props.year, props.weekId, updatedTrainingDay)
    );
    setCloneMenuVisible(false);
  }

  const isCurrentDayUrl = () => location.pathname.endsWith(props.trainingDay.day);

  const menuDayClasses = getClasses({
    "menu-day--active": isCurrentDayUrl(),
    "menu-day--used": dayStats.volume > 0,
  });

  return (
    <div className={`menu-day ${menuDayClasses}`}>

      <NavLink
        to={`${match.url}/${props.trainingDay.day}`}
        className="menu-day__link"
        activeClassName="menu-day__link--active"
      />

      <div className="menu-day__title">
        <button className="button-type1 menu-day__menu-button" onClick={() => setCloneMenuVisible(true)}>
          <img src={icoMenu} alt="" />
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
          <button className="button-type1 dropdown__close-btn" onClick={() => setCloneMenuVisible(false)}>
            <img src={icoMenuClose} alt="" />
          </button>
        </div>
      </div>

    </div>
  );
}

export { MenuDay };