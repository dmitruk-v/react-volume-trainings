import React from "react";

// ASSETS ------------------------------------------------------------
import svgPendulum from "../../../assets/svg-loaders/loader-pendulum.svg";
// import svgBallsLine from "../../../assets/svg-loaders/loader-balls-line.svg";
import gifBallsLine from "../../../assets/svg-loaders/294.gif";
import gifIphoneLoader1 from "../../../assets/svg-loaders/1488.gif";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./LoadingIndicatorLocal.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  text: string,
  type: IndicatorType
};

type IndicatorType = keyof typeof indicators;

const indicators = {
  "pendulum": svgPendulum,
  "balls-line": gifBallsLine,
  "iphone1": gifIphoneLoader1,
}

const LoadingIndicatorLocal: React.FC<Props> = (props) => {
  return (
    <div className="local-loading-indicator">
      <div className="local-loading-indicator__img">
        <img src={indicators[props.type]} alt="indicator-img" />
      </div>
      <div className="local-loading-indicator__text">{props.text}</div>
    </div>
  );
}

export { LoadingIndicatorLocal };