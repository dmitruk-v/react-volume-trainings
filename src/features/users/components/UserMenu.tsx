import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../shared/hooks";
import { selectTrainingWeekByDate, TrainingWeekModel } from "../../schedules";
import { UserModel } from "../users-types";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./UserMenu.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const UserMenu = (props: Props) => {

  const now = new Date();
  const currYear = now.getFullYear();
  const selectedUser = useAppSelector<UserModel | null>(state => state.selectedUser);
  const currTrainingWeek = useAppSelector<TrainingWeekModel | undefined>(
    state => selectTrainingWeekByDate(state, selectedUser?.scheduleId || "", now)
  );

  if (selectedUser === null) {
    return null;
  }

  return (
    <div className="header-menu">
      <ul className="header-menu__list">

        <li className="header-menu__item">
          <NavLink
            to={`/years-schedule/${selectedUser.scheduleId}`}
            className="header-menu__link"
            activeClassName="header-menu__link--active">Schedule</NavLink>
        </li>

        <li className="header-menu__item">
          <NavLink
            to={`/week-schedule/${selectedUser.scheduleId}/${currYear}/${currTrainingWeek?.weekId}`}
            className="header-menu__link"
            activeClassName="header-menu__link--active">Current Week</NavLink>
        </li>

        <li className="header-menu__item">
          <NavLink
            to={`/options/${selectedUser.optionsId}`}
            className="header-menu__link"
            activeClassName="header-menu__link--active">Options</NavLink>
        </li>

      </ul>
    </div>
  );
}

export { UserMenu };