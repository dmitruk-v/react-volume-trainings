// ASSETS ------------------------------------------------------------
import svgPendulum from "../../assets/svg-loaders/loader-pendulum.svg";
import svgBallsLine from "../../assets/svg-loaders/loader-balls-line.svg";
import gifBallsLine from "../../assets/svg-loaders/294.gif";
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./global-loading-indicator.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  text: string,
  type: IndicatorType,
};

type IndicatorType = keyof typeof indicators;

const indicators = {
  "pendulum": svgPendulum,
  "balls-line": gifBallsLine
}

const GlobalLoadingIndicator: React.FC<Props> = (props) => {
  return (
    <div className="loader">
      <div className="loader__body">
        <div className="loader__text">{props.text}</div>
        <div className="loader__img">
          <img src={indicators[props.type]} alt="loader" />
        </div>
      </div>
    </div>
  );
}

export { GlobalLoadingIndicator };