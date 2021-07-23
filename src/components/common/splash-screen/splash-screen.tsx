import { WithChildren } from "../../../store";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./splash-screen.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const SplashScreen = (props: WithChildren<Props>) => {
  return (
    <div className="splash-screen">
      <div className="splash-screen__inner">{props.children}</div>
    </div>
  );
}

export { SplashScreen };