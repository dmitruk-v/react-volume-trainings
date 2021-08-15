import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { selectAllUsers } from "../users-selectors";
import { UsersModel } from "../users-types";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./login-form.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const LoginForm = (props: PropsWithChildren<Props>) => {
  const users = useSelector<RootState, UsersModel>(selectAllUsers);

  return (
    <div className="wrapper">
      {JSON.stringify(users)}
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