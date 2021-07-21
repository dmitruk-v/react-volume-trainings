import React from "react";
import { useSelector } from "react-redux";
import { RootState, WithChildren } from "../../store";
import { selectUsers } from "../../store/selectors";
import { UsersModel, UserId, ScheduleId } from "../../store/types";
import { LoginForm } from "../login-form/login-form";
import { RegistrationForm } from "../registration-form/registration-form";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const Auth = (props: WithChildren<Props>) => {
  const users = useSelector<RootState, UsersModel>(selectUsers);
  console.log("---", users);

  if (Object.keys(users).length === 0) {
    return <RegistrationForm />;
  }

  return (
    <div>
      {/* <LoginForm />
      <RegistrationForm /> */}
      bla!
    </div>
  );
}

type App = {
  selectedUser: UserId,
  users: {
    [userId: string]: {
      username: string,
      scheduleId: ScheduleId
    }
  }
}

export { Auth };