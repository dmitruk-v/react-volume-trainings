import { PropsWithChildren, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TrainingDayModel } from "../schedules-types";
import { calculateTrainingDayStats } from "../utils";
import { getClasses } from "../../../shared/utils/css-utils";
import { WEEK_DAYS } from "../../../shared/constants";
import { WeekDay } from "../../../shared/types";

// ASSETS ------------------------------------------
import icoMenu from "../../../assets/svg/menu_grey_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./WeekScheduleMenuDay.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Stats } from "./Stats";
import { Dropdown } from "../../../shared/components/Dropdown";
// -------------------------------------------------

type Props = {
  trainingDay: TrainingDayModel,
  onCopyDay: (fromDay: WeekDay, toDay: WeekDay) => void
};

const WeekScheduleMenuDay = (props: PropsWithChildren<Props>) => {

  const location = useLocation();
  const [cloneMenuOpened, setCloneMenuOpened] = useState(false);

  const dayStats = useMemo(
    () => calculateTrainingDayStats(props.trainingDay),
    [props.trainingDay]
  );

  const dayStatsOptions = useMemo(() => ({
    modifierClasses: [
      "stats--vertical",
      "stats--colored-values",
    ]
  }), []);

  const isCurrentDayUrl = () => location.pathname.endsWith(props.trainingDay.day);

  const menuDayClasses = getClasses({
    "wsch-menu-day--active": isCurrentDayUrl(),
    "wsch-menu-day--used": dayStats.volume > 0,
  });

  return (
    <div className={`wsch-menu-day ${menuDayClasses}`}>

      <NavLink
        to={`${props.trainingDay.day}`}
        className="wsch-menu-day__link"
        activeClassName="wsch-menu-day__link--active"
      />

      <div className="wsch-menu-day__title">
        <button className="button-type1 wsch-menu-day__menu-button" onClick={() => setCloneMenuOpened(true)}>
          <img src={icoMenu} alt="" />
        </button>
        <div className="wsch-menu-day__day-name">{props.trainingDay.day}</div>
        <div className="wsch-menu-day__trainings">{props.trainingDay.trainings.length}</div>
      </div>
      <div className="wsch-menu-day__stats">
        <Stats
          statsOptions={dayStatsOptions}
          stats={dayStats}
        />
      </div>

      <Dropdown
        isOpened={cloneMenuOpened}
        classNames="wsch-menu-day__dropdown"
        withCloseBtn
        onClose={() => setCloneMenuOpened(false)}
      >
        <div className="dropdown-title">Clone from:</div>
        <div className="dropdown-menu">
          <ul className="dropdown-menu__list">
            {WEEK_DAYS.map(day =>
              day !== props.trainingDay.day && (
                <li key={day} className="dropdown-menu__item">
                  <button className="dropdown-menu__button" onClick={() => props.onCopyDay(day, props.trainingDay.day)}>
                    {day}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </Dropdown>

    </div>
  );
}

export { WeekScheduleMenuDay };