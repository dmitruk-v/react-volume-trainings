import { useMemo, useState } from "react";
import { calculateTrainingStats, TrainingModel, Day, AppDispatch, cloneTrainingAction, removeTrainingAction, createTrainingId } from "../../../store";

// COMPONENTS --------------------------------------
import Exercise from "../exercise/exercise";
// -------------------------------------------------

// ASSETS ------------------------------------------
import cloneTrIcon from "../../../assets/svg/content_copy_black_24dp.svg";
import removeTrIcon from "../../../assets/svg/delete_outline_black_24dp-red.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training.css";
import { useDispatch } from "react-redux";
// -------------------------------------------------

type Props = {
  day: Day,
  initialTraining: TrainingModel,
  trainingNumber: number
};

function Training(props: Props) {

  const dispatch = useDispatch<AppDispatch>();
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
      cloneTrainingAction(props.day, { ...props.initialTraining, trainingId: createTrainingId() })(dispatch)
    );
  }

  const removeTraining = () => {
    dispatch(
      removeTrainingAction(props.day, props.initialTraining)(dispatch)
    );
  }

  return (
    <div
      className={`training ${isOpened ? "training--opened" : ""}`}
      onClick={toggleTraining}
    >
      <div className="training__head">
        <div className="training__title">Training {props.trainingNumber}</div>
        <div className="training__stats">
          <div className="stats">
            <div className="stats__item">
              <div className="stats-item stats-item--volume">
                <div className="stats-item__term">Volume</div>
                <div className="stats-item__value">{trainingStats.volume.toFixed(2)} <span className="stats-item__units">t</span></div>
              </div>
            </div>
            <div className="stats__item">
              <div className="stats-item stats-item--intensity">
                <div className="stats-item__term">Intensity</div>
                <div className="stats-item__value">{trainingStats.intensity.toFixed(1)} <span className="stats-item__units">kg</span></div>
              </div>
            </div>
            <div className="stats__item">
              <div className="stats-item stats-item--reps">
                <div className="stats-item__term">Reps</div>
                <div className="stats-item__value">{trainingStats.reps} <span className="stats-item__units">reps</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="training__buttons">
          <button
            className="button-type1 button-type1--md training__button"
            onClick={() => cloneTraining()}
          >
            <img src={cloneTrIcon} alt="" />
          </button>
          <button
            className="button-type1 button-type1--md training__button"
            onClick={() => removeTraining()}
          >
            <img src={removeTrIcon} alt="" />
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