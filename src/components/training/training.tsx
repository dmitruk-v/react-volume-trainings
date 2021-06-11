import Exercise from "../exercise/exercise";
import "./training.css";
import { useMemo } from "react";
import { calculateTrainingStats, TrainingModel, Day } from "../../store";

type Props = {
  day: Day,
  initialTraining: TrainingModel,
};

function Training(props: Props) {

  const trainingStats = useMemo(
    () => calculateTrainingStats(props.initialTraining),
    [props.initialTraining]
  );

  return (
    <div className="training">
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
  );
}

export default Training;