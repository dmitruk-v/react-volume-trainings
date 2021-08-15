import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../shared/hooks";
// import { selectOptionsById } from "../../options/options-selectors";
// import { AppOptionsModel } from "../../options/options-types";
// import { selectScheduleById } from "../../schedules/schedules-selectors";
// import { ScheduleModel } from "../../schedules/schedules-types";
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

  const selectedUser = useAppSelector<UserModel | null>(state => state.selectedUser);

  if (!selectedUser) return null;

  // const options = useAppSelector<AppOptionsModel | undefined>(state => selectOptionsById(state, props.selectedUserId));
  // const currYear = new Date().getFullYear();
  // const currWeek = useAppSelector<TrainingWeekModel | undefined>(
  //   state => selectTrainingWeekByDate(state, schedule ? schedule.scheduleId : "", new Date())
  // );

  return (
    <div className="header-menu">
      <ul className="header-menu__list">

        <li className="header-menu__item">
          <NavLink
            to={`/years-schedule/${selectedUser.scheduleId}`}
            className="header-menu__link"
            activeClassName="header-menu__link--active">Schedule</NavLink>
        </li>

        {/* <li className="header-menu__item">
          <NavLink
            to={`/week-schedule/${selectedUser.scheduleId}/${currYear}/${currWeek?.weekId}`}
            className="header-menu__link"
            activeClassName="header-menu__link--active">Current Week</NavLink>
        </li> */}

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