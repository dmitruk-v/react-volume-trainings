import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../store";
import { selectTrainingWeekByDate } from "../../../store/selectors";
import { TrainingWeekModel } from "../../../store/types";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./header.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {}

const Header: React.FC<Props> = (props) => {

  const currYear = new Date().getFullYear();
  const currWeek = useSelector<RootState, TrainingWeekModel | undefined>(
    state => selectTrainingWeekByDate(state, new Date())
  );

  return (
    <header className="header">
      <div className="header__menu">
        <div className="header-menu">
          <ul className="header-menu__list">

            {/* <li className="header-menu__item">
              <NavLink
                to={"/"}
                exact={true}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Home</NavLink>
            </li> */}

            <li className="header-menu__item">
              <NavLink
                to={"/schedule"}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Schedule</NavLink>
            </li>

            {currWeek !== undefined && (
              <li className="header-menu__item">
                <NavLink
                  to={`/week-schedule/${currYear}/${currWeek?.weekId}`}
                  className="header-menu__link"
                  activeClassName="header-menu__link--active">Current Week</NavLink>
              </li>
            )}

            <li className="header-menu__item">
              <NavLink
                to={"/users"}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Users</NavLink>
            </li>

            <li className="header-menu__item">
              <NavLink
                to={"/options"}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Options</NavLink>
            </li>

            <li className="header-menu__item">
              <NavLink
                to={"/auth"}
                className="header-menu__link"
                activeClassName="header-menu__link--active">Auth</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </header>
  );
}

export { Header };