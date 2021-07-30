import React, { PropsWithChildren, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/common";
import { createSchedule } from "../../store";
import { schedulesCreateScheduleAction, selectedUserActivate, usersCreateUserAction, appOptionsCreateAppOptionsAction } from "../../store/actions";
import { selectAllUsers } from "../../store/selectors";
import { UsersModel } from "../../store/types";
import { createUser } from "../../utils/create-users";
import { createOptions } from "../../utils/create-options";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./user-create-form.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const UserCreateForm = (props: PropsWithChildren<Props>) => {

  const currYear = new Date().getFullYear();
  const users = useAppSelector<UsersModel>(selectAllUsers);
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (username.length === 0) {
      return setError("Username can not be empty!");
    }

    const userAlreadyExists = Object.keys(users).some(userId => users[userId].name === username);
    if (userAlreadyExists) {
      return setError(`User "${username}" already exists!`);
    }

    const createdOptions = createOptions();
    const createdSchedule = createSchedule([currYear - 2, currYear - 1, currYear]);
    const createdUser = createUser(username, createdSchedule.scheduleId, createdOptions.optionsId);
    dispatch(schedulesCreateScheduleAction(createdSchedule));
    dispatch(appOptionsCreateAppOptionsAction(createdOptions));
    dispatch(usersCreateUserAction(createdUser));
    dispatch(selectedUserActivate(createdUser.userId));
    setUsername("");
    setError(null);
    history.push(`/years-schedule/${createdUser.scheduleId}`);
  }

  return (
    <form
      className="form user-create-form"
      onSubmit={handleFormSubmit}
    >
      <div className="small-cols">
        <div className="small-cols__col small-cols__col--auto">
          <div className="form__field">
            <button className="button button--primary">
              <span>Create user</span>
            </button>
          </div>
        </div>
        <div className="small-cols__col">
          <div className="form__field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="control-input"
              value={username}
              onChange={evt => setUsername(evt.target.value)}
            />
            {error && (
              <div className="form-error">
                <div className="form-error__text">{error}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export { UserCreateForm };