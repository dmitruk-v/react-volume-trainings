import { TrainingDayModel } from "../schedules-types";
import { useTrainingDay } from "../hooks/useTrainingDay";
import { PropsWithChildren } from "react";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./WeekScheduleDay.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  weekId: string,
  initialTrainingDay: TrainingDayModel
}

const WeekScheduleDay = (props: PropsWithChildren<Props>) => {

  const { addTraining } = useTrainingDay(props.scheduleId, props.year, props.weekId, props.initialTrainingDay);
  const hasTrainings = () => props.initialTrainingDay.trainings.length > 0;

  return (
    <div className="wsch-day">
      <div className="wsch-day__body">
        {hasTrainings()
          ? (
            <div className="wsch-day__trainings">{props.children}</div>
          ) : (
            <button className="button button--primary" onClick={() => addTraining()}>
              <span>Add training</span>
            </button>
          )
        }
      </div>
    </div >
  );
}

export { WeekScheduleDay };