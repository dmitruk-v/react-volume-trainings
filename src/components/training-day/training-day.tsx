import { useMemo } from "react";
import { TrainingDayModel, calculateDayStats } from "../../store";
import Training from "../training/training"
import "./training-day.css";

type Props = {
  initialTrainingDay: TrainingDayModel,
}

const TrainingDay: React.FC<Props> = (props) => {

  const dayStats = useMemo(
    () => calculateDayStats(props.initialTrainingDay),
    [props.initialTrainingDay]
  );

  return (
    <div className="training-day">
      <div className="training-day__title">{props.initialTrainingDay.day}</div>
      <div className="training-day__stats">
        <div className="stats">
          <div className="stats__item">
            <div className="stats-item stats-item--volume">
              <div className="stats-item__term">Volume</div>
              <div className="stats-item__value">{dayStats.volume.toFixed(2)} <span className="stats-item__units">t</span></div>
            </div>
          </div>
          <div className="stats__item">
            <div className="stats-item stats-item--intensity">
              <div className="stats-item__term">Intensity</div>
              <div className="stats-item__value">{dayStats.intensity.toFixed(1)} <span className="stats-item__units">kg</span></div>
            </div>
          </div>
          <div className="stats__item">
            <div className="stats-item stats-item--reps">
              <div className="stats-item__term">Reps</div>
              <div className="stats-item__value">{dayStats.reps} <span className="stats-item__units">reps</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="training-day__trainings">
        {props.initialTrainingDay.trainings.map(tr => {
          return (
            <div key={tr.trainingId} className="training-day__training">
              <Training
                day={props.initialTrainingDay.day}
                initialTraining={tr}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default TrainingDay;