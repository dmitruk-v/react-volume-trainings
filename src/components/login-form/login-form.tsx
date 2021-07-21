import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState, WithChildren } from "../../store";
import { selectUsers } from "../../store/selectors";
import { UsersModel } from "../../store/types";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./login-form.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const LoginForm = (props: WithChildren<Props>) => {
  const users = useSelector<RootState, UsersModel>(selectUsers);
  const [canRedirect, setCanRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // setCanRedirect(true);
    }, 2000);
  }, []);

  if (canRedirect && Object.keys(users).length === 0) {
    return (
      <Redirect to="/users" />
    );
  }

  return (
    <div className="wrapper">
      <form className="form login-form">
        <h2>Sign in</h2>
        <div className="form__field">
          <input type="text" name="username" className="control-input" placeholder="Username" />
        </div>
        <div className="form__field">
          <input type="password" name="password" className="control-input" placeholder="Password" />
        </div>
        <div className="form__field">
          <button className="button button--primary button--wide" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export { LoginForm };