import { useSelector } from "react-redux";
import { useAppSelector } from "../../../shared/hooks";
import { RootState } from "../../../store";
import { UserModel, UsersModel } from "../users-types";
import { selectAllUsers } from "../users-selectors";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./UsersList.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { Message } from "../../../shared/components/Message";
import { UserCreateForm } from "./UserCreateForm";
import { User } from "./User";
// -------------------------------------------------------------------

type Props = {};

const UsersList = (props: Props) => {

  const selectedUser = useAppSelector<UserModel | null>(state => state.selectedUser)
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
                  <User selectedUser={selectedUser} user={users[userId]} />
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

export { UsersList };