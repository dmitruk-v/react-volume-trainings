import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store";
import { selectScheduleByUserId, selectTrainingWeekByDate, selectUserById } from "../../../store/selectors";
import { ScheduleModel, TrainingWeekModel, UserModel } from "../../../store/types";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./header.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {}

const Header: React.FC<Props> = (props) => {

  const selectedUserId = useSelector<RootState, string>(state => state.selectedUser);
  const selectedUser = useSelector<RootState, UserModel | undefined>(state => selectUserById(state, selectedUserId));
  const schedule = useSelector<RootState, ScheduleModel | undefined>(state => selectScheduleByUserId(state, selectedUserId));
  const currYear = new Date().getFullYear();
  const currWeek = useSelector<RootState, TrainingWeekModel | undefined>(
    state => selectTrainingWeekByDate(state, schedule ? schedule.scheduleId : "", new Date())
  );
  const history = useHistory();

  if (selectedUserId.length === 0) {
    history.push("/users");
  }

  console.log("Header selectedUserId", selectedUserId);
  console.log("Header selectedUser", selectedUser);
  console.log("Header currWeek", currWeek);

  return (
    <header className="header">
      <div className="header__layout">
        {selectedUser && (
          <div className="header__user">
            {selectedUser.name}
          </div>
        )}
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

              {selectedUserId.length !== 0 && (
                <li className="header-menu__item">
                  <NavLink
                    to={`/years-schedule/${schedule && schedule.scheduleId}`}
                    className="header-menu__link"
                    activeClassName="header-menu__link--active">Schedule</NavLink>
                </li>
              )}

              {selectedUserId.length > 0 && currWeek !== undefined
                && (
                  <li className="header-menu__item">
                    <NavLink
                      to={`/week-schedule/${schedule && schedule.scheduleId}/${currYear}/${currWeek?.weekId}`}
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

              {selectedUserId.length !== 0 && (
                <li className="header-menu__item">
                  <NavLink
                    to={"/options"}
                    className="header-menu__link"
                    activeClassName="header-menu__link--active">Options</NavLink>
                </li>
              )}

            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };