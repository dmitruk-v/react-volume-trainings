import { TrainingDayModel } from "../../../store";

// COMPONENTS --------------------------------------
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
        <div className="training-day__trainings">{props.children}</div>
      </div>
    </div>
  );
}

export default TrainingDay;