import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../hooks/common";
import { selectOptionsByUserId, selectScheduleByUserId, selectTrainingWeekByDate } from "../../../store/selectors";
import { AppOptionsModel, ScheduleModel, TrainingWeekModel } from "../../../store/types";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./header-menu.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  selectedUserId: string
};

const HeaderMenu = (props: PropsWithChildren<Props>) => {

  const schedule = useAppSelector<ScheduleModel | undefined>(state => selectScheduleByUserId(state, props.selectedUserId));
  const options = useAppSelector<AppOptionsModel | undefined>(state => selectOptionsByUserId(state, props.selectedUserId));
  const currYear = new Date().getFullYear();
  const currWeek = useAppSelector<TrainingWeekModel | undefined>(
    state => selectTrainingWeekByDate(state, schedule ? schedule.scheduleId : "", new Date())
  );

  return (
    <div className="header-menu">
      <ul className="header-menu__list">

        <li className="header-menu__item">
          <NavLink
            to={`/years-schedule/${schedule?.scheduleId}`}
            className="header-menu__link"
            activeClassName="header-menu__link--active">Schedule</NavLink>
        </li>

        <li className="header-menu__item">
          <NavLink
            to={`/week-schedule/${schedule?.scheduleId}/${currYear}/${currWeek?.weekId}`}
            className="header-menu__link"
            activeClassName="header-menu__link--active">Current Week</NavLink>
        </li>

        <li className="header-menu__item">
          <NavLink
            to={`/options/${options?.optionsId}`}
            className="header-menu__link"
            activeClassName="header-menu__link--active">Options</NavLink>
        </li>

      </ul>
    </div>
  );
}

export { HeaderMenu };