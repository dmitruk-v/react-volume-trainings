import { useMemo } from "react";
import { getWeekStartDate } from "../../utils/date-utils";
import { RootState } from "../../store";
import { TrainingYearModel } from "../../store/types";
import { useSelector } from "react-redux";
import { selectTrainingYear } from "../../store/selectors";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training-year.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { YearWeek } from "../year-week/year-week";
// -------------------------------------------------

type Props = {
  year: string
};

const TrainingYear: React.FC<Props> = (props) => {
  const trainingYear = useSelector<RootState, TrainingYearModel>(state => selectTrainingYear(state, props.year));
  const currWeekStartDate = useMemo(() => getWeekStartDate(new Date()), []);

  if (trainingYear === undefined) {
    return <div>Training year ({props.year}) not found.</div>;
  }

  return (
    <div className="training-year">
      <div className="training-year__weeks">
        {trainingYear.weeks.map((week, idx) => (
          <div key={idx} className="training-year__week">
            <YearWeek
              year={props.year}
              weekNum={idx + 1}
              trainingWeek={week}
              currWeekStartDate={currWeekStartDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { TrainingYear };