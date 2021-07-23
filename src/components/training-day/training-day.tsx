import { useDispatch } from "react-redux";
import { AppDispatch, createTraining } from "../../store";
import { schedulesAddTrainingAction } from "../../store/actions";
import { TrainingDayModel } from "../../store/types";

// ASSETS ------------------------------------------
import icoPlus from "../../assets/svg/add_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training-day.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  weekId: string,
  initialTrainingDay: TrainingDayModel
}

const TrainingDay: React.FC<Props> = (props) => {

  const dispatch = useDispatch<AppDispatch>();

  const handleAddTraining = () => {
    dispatch(
      schedulesAddTrainingAction(props.scheduleId, props.year, props.weekId, props.initialTrainingDay.day, createTraining())
    )
  }

  return (
    <div className="training-day">
      <div className="training-day__body">
        {props.initialTrainingDay.trainings.length === 0
          ? (
            <button className="button button--primary" onClick={() => handleAddTraining()}>
              <span>Add training</span>
            </button>
          )
          : (
            <div className="training-day__trainings">{props.children}</div>
          )
        }
      </div>
    </div >
  );
}

export { TrainingDay };