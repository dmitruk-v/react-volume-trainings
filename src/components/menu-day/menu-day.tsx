import { useMemo, useState } from "react";
import { useRouteMatch, NavLink, useLocation } from "react-router-dom";
import { AppDispatch, calculateTrainingDayStats, RootState } from "../../store";
import { scheduleUpdateTrainingDayAction } from "../../store/actions";
import { WeekDay, TrainingWeekModel, TrainingDayModel } from "../../store/types";
import { WEEK_DAYS } from "../../constants/date-and-time";
import { useDispatch, useSelector } from "react-redux";
import { createClonedTraining } from "../../utils/schedule-utils";
import { getClasses } from "../../utils/css-utils";
import { selectTrainingWeekById } from "../../store/selectors";

// ASSETS ------------------------------------------
import icoMenu from "../../assets/svg/menu_grey_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./menu-day.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Stats } from "../stats/stats";
import { Dropdown } from "../common/dropdown/dropdown";
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
  const [cloneMenuOpened, setCloneMenuOpened] = useState(false);
  const trainingWeek = useSelector<RootState, TrainingWeekModel | undefined>(
    state => selectTrainingWeekById(state, props.year, props.weekId)
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
      scheduleUpdateTrainingDayAction(props.year, props.weekId, updatedTrainingDay)
    );
    setCloneMenuOpened(false);
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
        <button className="button-type1 menu-day__menu-button" onClick={() => setCloneMenuOpened(true)}>
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

      <Dropdown
        isOpened={cloneMenuOpened}
        classNames="menu-day__dropdown"
        withCloseBtn
        onClose={() => setCloneMenuOpened(false)}
      >
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
      </Dropdown>

    </div>
  );
}

export { MenuDay };