import { useSelector } from "react-redux";
import { RootState, WithChildren } from "../../store";
import { UsersModel } from "../../store/types";
import { selectUsers } from "../../store/selectors";
import { Link, useRouteMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/common";
import { getClasses } from "../../utils/css-utils";
import { selectedUserActivate } from "../../store/actions";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./users.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Message } from "../common/message/message";
import { UserCreateForm } from "../user-create-form/user-create-form";
// -------------------------------------------------------------------

type Props = {};

const Users = (props: WithChildren<Props>) => {

  const dispatch = useAppDispatch();
  const selectedUserId = useAppSelector<string>(state => state.selectedUser)
  const users = useSelector<RootState, UsersModel>(selectUsers);
  const hasUsers = () => Object.keys(users).length > 0;

  const usersView = hasUsers()
    ? (
      <div className="users__list">
        {Object.keys(users).map(userId => {
          const user = users[userId];
          const userClasses = getClasses({ "user--selected": userId === selectedUserId });
          return (
            <div key={userId} className="users__user">
              <div className={`user ${userClasses}`}>
                {/* <div className="user__user-id">{user.userId}</div> */}
                <div className="user__name">{user.name}</div>
                <Link to={`/years-schedule/${user.scheduleId}`} className="user__schedule">Schedule →</Link>
                <div className="user__select">
                  <button
                    className="button button--primary button--wide"
                    disabled={selectedUserId === userId}
                    onClick={() => { dispatch(selectedUserActivate(userId)) }}
                  >{`${userId === selectedUserId ? "Selected" : "Select"}`}</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    ) : (
      <div className="users__message">
        <Message type="warning">Users not found. Please create one.</Message>
      </div>
    );

  return (
    <div className="users">
      {usersView}
      <div className="users__create-form">
        <UserCreateForm />
      </div>
    </div >
  );
}

export { Users };