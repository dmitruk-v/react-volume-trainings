import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState, WithChildren } from "../../store";
import { UsersModel } from "../../store/types";
import { selectUsers } from "../../store/selectors";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./users.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const Users = (props: WithChildren<Props>) => {

  console.log("Users called before useSelector");

  const users = useSelector<RootState, UsersModel>(selectUsers);

  console.log("Users called after useSelector", users);

  if (Object.keys(users).length === 0) {
    return (
      <div>We have not found any users. Please create one.</div>
    );
  }

  return (
    <div>Users ! {JSON.stringify(users)}</div>
  );
}

export { Users };