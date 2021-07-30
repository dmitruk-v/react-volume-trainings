import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UsersModel } from "../../store/types";
import { selectAllUsers } from "../../store/selectors";
import { useAppSelector } from "../../hooks/common";
import { PropsWithChildren } from "react";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./users.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Message } from "../common/message/message";
import { UserCreateForm } from "../user-create-form/user-create-form";
import { User } from "../user/user";
// -------------------------------------------------------------------

type Props = {};

const Users = (props: PropsWithChildren<Props>) => {

  const selectedUserId = useAppSelector<string>(state => state.selectedUser)
  const users = useSelector<RootState, UsersModel>(selectAllUsers);
  const hasUsers = () => Object.keys(users).length > 0;

  return (
    <div className="users">
      {
        hasUsers()
          ? (
            <div className="users__list">
              {Object.keys(users).map(userId => (
                <div key={userId} className="users__user">
                  <User selectedUserId={selectedUserId} user={users[userId]} />
                </div>
              ))}
            </div>
          ) : (
            <div className="users__message">
              <Message type="warning">Users not found. Please create one.</Message>
            </div>
          )
      }
      <div className="users__create-form">
        <UserCreateForm />
      </div>
    </div >
  );
}

export { Users };