import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserModel } from "../users-types";
import { useAppDispatch } from "../../../shared/hooks";
import { schedulesRemoveScheduleAction, selectedUserActivate } from "../../../store/actions";
import { usersRemoveUserAction } from "../users-actions";
import { getClasses } from "../../../shared/utils/css-utils";

// ASSETS ------------------------------------------------------------
import icoMenu from "../../../assets/svg/menu_grey_24dp.svg";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./User.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Dropdown } from "../../../shared/components/Dropdown";
// -------------------------------------------------------------------

type Props = {
  selectedUser: UserModel | null,
  user: UserModel,
};

const User = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [menuOpened, setMenuOpened] = useState(false);

  const activateUser = () => {
    dispatch(selectedUserActivate(props.user));
    dispatch<any>(Promise.resolve({ type: "promise", payload: {} }));
    history.push(`/years-schedule/${props.user.scheduleId}`);
  }

  const removeUser = (removedUser: UserModel) => {
    dispatch(usersRemoveUserAction(removedUser));
    dispatch(schedulesRemoveScheduleAction(removedUser.scheduleId));
    if (props.selectedUser && props.selectedUser.userId === props.user.userId) {
      dispatch(selectedUserActivate(null));
    }
  }

  const userClasses = getClasses({ "user--selected": props.user.userId === props.selectedUser?.userId });

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
            disabled={props.selectedUser?.userId === props.user.userId}
            onClick={activateUser}
          >{`${props.user.userId === props.selectedUser?.userId ? "Selected" : "Select"}`}</button>
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