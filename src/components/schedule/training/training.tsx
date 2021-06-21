import { useMemo, useState } from "react";
import { calculateTrainingStats, TrainingModel, Day, AppDispatch, cloneTrainingAction, removeTrainingAction, createTrainingId, createExerciseId, createSetId } from "../../../store";
import { useDispatch } from "react-redux";

// COMPONENTS --------------------------------------
import Exercise from "../exercise/exercise";
// -------------------------------------------------

// ASSETS ------------------------------------------
import menuIcon from "../../../assets/svg/menu_black_24dp.svg";
import closeMenuIcon from "../../../assets/svg/close_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training.css";
// -------------------------------------------------

type Props = {
  day: Day,
  initialTraining: TrainingModel,
  trainingNumber: number
};

function Training(props: Props) {

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
    const { day, initialTraining } = props;
    const clonedTraining: TrainingModel = {
      ...initialTraining,
      trainingId: createTrainingId(),
      exercises: initialTraining.exercises.map(
        ex => ({
          ...ex,
          exerciseId: createExerciseId(),
          sets: ex.sets.map(
            s => ({ ...s, setId: createSetId() })
          )
        })
      )
    }
    dispatch(
      cloneTrainingAction(day, clonedTraining)(dispatch)
    );
  }

  const removeTraining = () => {
    const { day, initialTraining } = props;
    dispatch(
      removeTrainingAction(day, initialTraining)(dispatch)
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
          <div className="stats">
            <div className="stats__item">
              <div className="stats-item stats-item--volume">
                <div className="stats-item__term">Volume</div>
                <div className="stats-item__value">{trainingStats.volume.toFixed(2)}<span className="stats-item__units">t</span></div>
              </div>
            </div>
            <div className="stats__item">
              <div className="stats-item stats-item--intensity">
                <div className="stats-item__term">Intensity</div>
                <div className="stats-item__value">{trainingStats.intensity.toFixed(1)}<span className="stats-item__units">kg</span></div>
              </div>
            </div>
            <div className="stats__item">
              <div className="stats-item stats-item--reps">
                <div className="stats-item__term">Reps</div>
                <div className="stats-item__value">{trainingStats.reps}<span className="stats-item__units">reps</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="training__menu-btn">
          <button className="button-type1 training__button" onClick={() => setIsMenuVisible(true)}>
            <img src={menuIcon} alt="" />
          </button>
        </div>

        <div className={`dropdown-menu ${isMenuVisible ? "dropdown-menu--visible" : ""} training__dropdown`}>
          <div className="dropdown-menu__inner">
            <ul className="dropdown-menu__list">
              <li className="dropdown-menu__item">
                <button className="button-type2" title="Clone training" onClick={() => cloneTraining()}>Clone</button>
              </li>
              <li className="dropdown-menu__item">
                <button className="button-type2" title="Remove training" onClick={() => removeTraining()}>Remove</button>
              </li>
            </ul>
          </div>

          <button className="button-type1 dropdown-menu__close-btn" onClick={() => setIsMenuVisible(false)}>
            <img src={closeMenuIcon} alt="" />
          </button>
        </div>

      </div>
      <div className="training__body">
        <div className="training__exercises">
          {props.initialTraining.exercises.map((exercise, idx) => {
            return (
              <div key={exercise.exerciseId} className="training__exercise">
                <Exercise
                  day={props.day}
                  trainingId={props.initialTraining.trainingId}
                  initialExercise={exercise}
                  exerciseNumber={idx + 1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Training;