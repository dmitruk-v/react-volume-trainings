import React, { PropsWithChildren, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks/common";
import { schedulesRemoveScheduleAction, selectedUserActivate, usersRemoveUserAction } from "../../store/actions";
import { UserModel } from "../../store/types";
import { getClasses } from "../../utils/css-utils";

// ASSETS ------------------------------------------------------------
import icoMenu from "../../assets/svg/menu_grey_24dp.svg";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./user.css";
import { Dropdown } from "../common/dropdown/dropdown";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  selectedUserId: string,
  user: UserModel,
};

const User = (props: PropsWithChildren<Props>) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [menuOpened, setMenuOpened] = useState(false);

  const activateUser = () => {
    dispatch(selectedUserActivate(props.user.userId));
    dispatch<any>(Promise.resolve({ type: "promise", payload: {} }));
    history.push(`/years-schedule/${props.user.scheduleId}`);
  }

  const removeUser = (removedUser: UserModel) => {
    dispatch(usersRemoveUserAction(removedUser));
    dispatch(schedulesRemoveScheduleAction(removedUser.scheduleId));
    if (props.selectedUserId === props.user.userId) {
      dispatch(selectedUserActivate(""));
    }
  }

  const userClasses = getClasses({ "user--selected": props.user.userId === props.selectedUserId });

  return (
    <div className={`user ${userClasses}`}>
      <div className="user__layout">
        <div className="user__menu-button">
          <button className="button-type1" onClick={() => setMenuOpened(true)}>
            <img src={icoMenu} alt="" />
          </button>
        </div>
        <div className="user__name">{props.user.name}</div>
        <div className="user__select">
          <button
            className="button button--primary button--wide"
            disabled={props.selectedUserId === props.user.userId}
            onClick={activateUser}
          >{`${props.user.userId === props.selectedUserId ? "Selected" : "Select"}`}</button>
        </div>
      </div>

      <Dropdown
        isOpened={menuOpened}
        onClose={() => setMenuOpened(false)}
        classNames="user__menu-dropdown"
      >
        <div className="dropdown-title">{props.user.name}</div>
        <div className="dropdown-menu">
          <ul className="dropdown-menu__list">
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button">Change name</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button" onClick={() => { }}>Measure</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button" onClick={() => removeUser(props.user)}>Remove</button>
            </li>
          </ul>
        </div>
      </Dropdown>

    </div>
  );
}

export { User };