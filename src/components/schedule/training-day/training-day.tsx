import { TrainingDayModel } from "../../../store";

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
  return (
    <div className="training-day">
      <div className="training-day__body">
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