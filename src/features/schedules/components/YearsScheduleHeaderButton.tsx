import { Link } from "react-router-dom";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./YearsScheduleHeaderButton.css"
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  scheduleId: string
};

const YearsScheduleHeaderButton = (props: Props) => {
  const now = new Date();

  return (
    <Link to={`/years-schedule/${props.scheduleId}/${now.getFullYear()}`}>Link</Link>
  );
}

export { YearsScheduleHeaderButton };