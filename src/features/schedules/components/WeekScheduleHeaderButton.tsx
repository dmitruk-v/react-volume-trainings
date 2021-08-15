import { Link } from "react-router-dom";
import { useAppSelector } from "../../../shared/hooks";
import { selectTrainingWeekByDate } from "../schedules-selectors";
import { TrainingWeekModel } from "../schedules-types";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./WeekScheduleHeaderButton.css"
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  scheduleId: string
};

const WeekScheduleHeaderButton = (props: Props) => {
  const now = new Date();
  const trainingWeek = useAppSelector<TrainingWeekModel | undefined>(
    state => selectTrainingWeekByDate(state, props.scheduleId, now)
  );

  return (
    <Link to={`/week-schedule/${props.scheduleId}/${now.getFullYear()}/${trainingWeek?.weekId}`}>Link</Link>
  );
}

export { WeekScheduleHeaderButton };