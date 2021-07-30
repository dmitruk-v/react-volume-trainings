import { useMemo, useState } from "react";
import { calculateTrainingStats, AppDispatch } from "../../store";
import { schedulesAddTrainingAction, schedulesUpdateTrainingAction, schedulesRemoveTrainingAction } from "../../store/actions";
import { WeekDay, TrainingModel } from "../../store/types";
import { useDispatch } from "react-redux";
import { createClonedTraining, createResetedTraining } from "../../utils/schedule-utils";

// ASSETS ------------------------------------------
import icoMenu from "../../assets/svg/menu_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Stats } from "../stats/stats";
import { Dropdown } from "../common/dropdown/dropdown";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  weekId: string,
  day: WeekDay,
  initialTraining: TrainingModel,
  trainingNumber: number,
};

const Training: React.FC<Props> = (props) => {

  const dispatch = useDispatch<AppDispatch>();
  const [menuOpened, setMenuOpened] = useState(false);
  const [opened, setOpened] = useState(props.trainingNumber === 1);

  const trainingStats = useMemo(
    () => calculateTrainingStats(props.initialTraining),
    [props.initialTraining]
  );

  const toggleOpenTraining = (evt: React.MouseEvent<HTMLDivElement>) => {
    if ((evt.target as HTMLDivElement).classList.contains("training__head")) {
      setOpened(!opened);
    }
  }

  const cloneTraining = () => {
    dispatch(
      schedulesAddTrainingAction(
        props.scheduleId, props.year, props.weekId, props.day, createClonedTraining(props.initialTraining)
      )
    );
  }

  const removeTraining = () => {
    dispatch(
      schedulesRemoveTrainingAction(
        props.scheduleId, props.year, props.weekId, props.day, props.initialTraining
      )
    );
  }

  const resetTraining = () => {
    dispatch(
      schedulesUpdateTrainingAction(
        props.scheduleId, props.year, props.weekId, props.day, createResetedTraining(props.initialTraining)
      )
    );
  }

  return (
    <div className={`training ${opened ? "training--opened" : ""}`} onClick={toggleOpenTraining}>
      <div className="training__head">
        <div className="training__title">
          <div className="training-title">
            <div className="training-title__name">Training {props.trainingNumber}</div>
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

        <button className="button-type1 training__menu-btn" onClick={() => setMenuOpened(true)}>
          <img src={icoMenu} alt="" />
        </button>

        <Dropdown
          isOpened={menuOpened}
          classNames="training__dropdown"
          withCloseBtn
          onClose={() => setMenuOpened(false)}
        >
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
        </Dropdown>

      </div>

      <div className="training__body">
        <div className="training__exercises">{props.children}</div>
      </div>

    </div>
  );
}

export { Training };