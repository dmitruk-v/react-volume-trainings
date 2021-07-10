import { useMemo, useState } from "react";
import { calculateTrainingStats, AppDispatch } from "../../store";
import { yearScheduleAddTrainingAction, yearScheduleUpdateTrainingAction, yearScheduleRemoveTrainingAction } from "../../store/actions";
import { WeekDay, TrainingModel } from "../../store/types";
import { useDispatch } from "react-redux";
import { createClonedTraining, createResetedTraining } from "../../utils/schedule-utils";

// ASSETS ------------------------------------------
import icoMenu from "../../assets/svg/menu_black_24dp.svg";
import icoMenuClose from "../../assets/svg/close_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Stats } from "../stats/stats";
// -------------------------------------------------

type Props = {
  year: string,
  weekId: string,
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
      yearScheduleAddTrainingAction(
        props.year, props.weekId, props.day, createClonedTraining(props.initialTraining)
      )
    );
  }

  const removeTraining = () => {
    dispatch(
      yearScheduleRemoveTrainingAction(
        props.year, props.weekId, props.day, props.initialTraining
      )
    );
  }

  const resetTraining = () => {
    dispatch(
      yearScheduleUpdateTrainingAction(
        props.year, props.weekId, props.day, createResetedTraining(props.initialTraining)
      )
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
                "stats--light-bg-items"
              ],
              volumeTerm: "V:",
              intensityTerm: "I:",
              repsTerm: "N:",
            }}
            stats={trainingStats}
          />
        </div>

        <button className="button-type1 training__menu-btn" onClick={() => setIsMenuVisible(true)}>
          <img src={icoMenu} alt="" />
        </button>

        <div className={`dropdown ${isMenuVisible ? "dropdown--visible" : ""} dropdown--anim_from-ct training__dropdown`}>
          <div className="dropdown__inner">
            <div className="dropdown-title">Training menu</div>
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
            <button className="button-type1 dropdown__close-btn" onClick={() => setIsMenuVisible(false)}>
              <img src={icoMenuClose} alt="" />
            </button>
          </div>
        </div>

      </div>
      <div className="training__body">
        <div className="training__exercises">{props.children}</div>
      </div>
    </div>
  );
}

export { Training };