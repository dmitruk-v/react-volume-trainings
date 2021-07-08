import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store";
import { YearScheduleModel } from "../../store/types";
import { getCurrentWeekStartDate } from "../../utils/date-utils";

// STYLES ------------------------------------------
import "./header.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {}

const Header: React.FC<Props> = (props) => {

  const yearSchedule = useSelector<RootState, YearScheduleModel>(state => state.yearSchedule);

  const currYear = new Date().getFullYear();
  const currWeekStartDate = getCurrentWeekStartDate();
  const currWeek = yearSchedule[currYear].find(week => week.weekStartDate.getTime() === currWeekStartDate.getTime());

  return (
    <header className="header">
      <div className="header__menu">
        <div className="header-menu">
          <ul className="header-menu__list">
            <li className="header-menu__item">
              <NavLink
                to={"/"}
                exact={true}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Home</NavLink>
            </li>

            <li className="header-menu__item">
              <NavLink
                to={"/year-schedule"}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Schedule</NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink
                to={`/week-schedule/${currYear}/${currWeek?.weekId}`}
                className="header-menu__link header-menu__link--schedule"
                activeClassName="header-menu__link--active">Current Week</NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink
                to={"/options"}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Options</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export { Header };