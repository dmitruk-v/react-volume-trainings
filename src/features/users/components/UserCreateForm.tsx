import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { selectedUserActivate } from "../../../store/actions";
import { appOptionsCreateAppOptionsAction } from "../../options/options-actions";
import { createOptions } from "../../options/utils/create-options";
import { schedulesCreateScheduleAction } from "../../schedules/schedules-actions";
import { createSchedule } from "../../schedules/utils";
import { usersCreateUserAction } from "../users-actions";
import { selectAllUsers } from "../users-selectors";
import { UsersModel } from "../users-types";
import { createUser } from "../utils/create-users";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./UserCreateForm.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const UserCreateForm = (props: Props) => {

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
    dispatch(selectedUserActivate(createdUser));
    setUsername("");
    setError(null);
    history.push(`/years-schedule/${createdUser.scheduleId}`);
  }

  const handleUsernameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
    setError(null);
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
              onChange={handleUsernameChange}
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