import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/common";
import { createSchedule, WithChildren } from "../../store";
import { schedulesCreateScheduleAction, selectedUserActivate, usersCreateAction } from "../../store/actions";
import { createUser } from "../../utils/create-users";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./user-create-form.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const UserCreateForm = (props: WithChildren<Props>) => {

  const currYear = new Date().getFullYear();
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (username.length === 0) return;
    const createdSchedule = createSchedule([currYear]);
    const createdUser = createUser(username, createdSchedule.scheduleId);
    dispatch(schedulesCreateScheduleAction(createdSchedule))
    dispatch(usersCreateAction(createdUser));
    dispatch(selectedUserActivate(createdUser.userId));
    setUsername("");
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
          </div>
        </div>
      </div>
    </form>
  );
}

export { UserCreateForm };