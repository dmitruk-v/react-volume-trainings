// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import { useAppSelector } from "../../../shared/hooks";
import { selectScheduleById } from "../schedules-selectors";
import { ScheduleModel } from "../schedules-types";
import "./YearsScheduleUserButton.css"
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  scheduleId: string
};

const YearsScheduleUserButton = (props: Props) => {
  const schedule = useAppSelector<ScheduleModel | undefined>(state => selectScheduleById(state, props.scheduleId));

  return (
    <div>YearsScheduleUserButton !</div>
  );
}

export { YearsScheduleUserButton };