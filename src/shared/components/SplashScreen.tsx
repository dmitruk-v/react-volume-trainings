import { PropsWithChildren } from "react";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./SplashScreen.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {};

const SplashScreen = (props: PropsWithChildren<Props>) => {
  return (
    <div className="splash-screen">
      <div className="splash-screen__inner">{props.children}</div>
    </div>
  );
}

export { SplashScreen };