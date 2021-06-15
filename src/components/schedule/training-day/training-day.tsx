import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TrainingDayModel, calculateDayStats, AppDispatch, cloneTrainingAction, createTraining } from "../../../store";

// COMPONENTS --------------------------------------
import Training from "../training/training"
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training-day.css";
// -------------------------------------------------

type Props = {
  initialTrainingDay: TrainingDayModel
}

const TrainingDay: React.FC<Props> = (props) => {

  const dispatch = useDispatch<AppDispatch>();
  const dayStats = useMemo(
    () => calculateDayStats(props.initialTrainingDay),
    [props.initialTrainingDay]
  );

  const cloneTraining = () => {
    dispatch(
      cloneTrainingAction(
        props.initialTrainingDay.day,
        createTraining()
      )(dispatch)
    );
  }

  return (
    <div className="training-day">
      <div className="training-day__head">
        <div className="training-day__title">{props.initialTrainingDay.trainings.length} trainings</div>
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
      </div>
      <div className="training-day__body">
        {/* <div className="training-day__create-training">
          <button
            className="button training-day__button"
            onClick={() => { addTraining(); }}
          >Create Training</button>
        </div> */}

        <div className="training-day__trainings">
          {props.initialTrainingDay.trainings.map((tr, idx) => {
            return (
              <div key={tr.trainingId} className="training-day__training">
                <Training
                  day={props.initialTrainingDay.day}
                  initialTraining={tr}
                  trainingNumber={idx + 1}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default TrainingDay;