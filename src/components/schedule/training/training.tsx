import { useMemo, useState } from "react";
import { calculateTrainingStats, TrainingModel, AppDispatch, addTrainingAction, removeTrainingAction, updateTrainingAction } from "../../../store";
import { useDispatch } from "react-redux";
import { createClonedTraining, createResetedTraining } from "../../../utils/schedule-utils";
import { WeekDay } from "../../../constants";

// COMPONENTS --------------------------------------
import Stats from "../stats/stats";
// -------------------------------------------------

// ASSETS ------------------------------------------
import menuIcon from "../../../assets/svg/menu_black_24dp.svg";
import closeMenuIcon from "../../../assets/svg/close_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training.css";
// -------------------------------------------------

type Props = {
  day: WeekDay,
  initialTraining: TrainingModel,
  trainingNumber: number,
};

const Training: React.FC<Props> = (props) => {

  const dispatch = useDispatch<AppDispatch>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isOpened, setIsOpened] = useState(props.trainingNumber === 1);

  const trainingStats = useMemo(
    () => calculateTrainingStats(props.initialTraining),
    [props.initialTraining]
  );

  const toggleTraining = (evt: React.MouseEvent<HTMLDivElement>) => {
    if ((evt.target as HTMLDivElement).classList.contains("training__head")) {
      setIsOpened(!isOpened);
    }
  }

  const cloneTraining = () => {
    dispatch(
      addTrainingAction(props.day, createClonedTraining(props.initialTraining))
    );
  }

  const removeTraining = () => {
    dispatch(
      removeTrainingAction(props.day, props.initialTraining)
    );
  }

  const resetTraining = () => {
    dispatch(
      updateTrainingAction(props.day, createResetedTraining(props.initialTraining))
    );
  }

  return (
    <div className={`training ${isOpened ? "training--opened" : ""}`} onClick={toggleTraining}>
      <div className="training__head">
        <div className="training__title">
          <div className="training-title">
            <div className="training-title__name">Training</div>
            <div className="training-title__number">{props.trainingNumber}</div>
          </div>
        </div>
        <div className="training__stats">
          <Stats
            statsOptions={{
              modifierClasses: [
                "stats--colored-terms",
                "stats--colored-values",
                "stats--colored-borders",
              ],
              volumeTerm: "V:",
              intensityTerm: "I:",
              repsTerm: "N:",
            }}
            stats={trainingStats}
          />
        </div>

        <button className="button-type1 training__menu-btn" onClick={() => setIsMenuVisible(true)}>
          <img src={menuIcon} alt="" />
        </button>

        <div className={`dropdown ${isMenuVisible ? "dropdown--visible" : ""} training__dropdown`}>
          <div className="dropdown__inner">
            <div className="dropdown-menu">
              <ul className="dropdown-menu__list">
                <li className="dropdown-menu__item">
                  <button className="dropdown-menu__button" title="Reset training" onClick={() => resetTraining()}>Reset training</button>
                </li>
                <li className="dropdown-menu__item">
                  <button className="dropdown-menu__button" title="Clone training" onClick={() => cloneTraining()}>Clone training</button>
                </li>
                <li className="dropdown-menu__item">
                  <button className="dropdown-menu__button" title="Remove training" onClick={() => removeTraining()}>Remove training</button>
                </li>
              </ul>
            </div>
          </div>

          <button className="button-type1 dropdown__close-btn" onClick={() => setIsMenuVisible(false)}>
            <img src={closeMenuIcon} alt="" />
          </button>
        </div>

      </div>
      <div className="training__body">
        <div className="training__exercises">{props.children}</div>
      </div>
    </div>
  );
}

export default Training;