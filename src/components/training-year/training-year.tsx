import { useCallback, useMemo, useRef } from "react";
import { getWeekStartDate } from "../../utils/date-utils";
import { RootState } from "../../store";
import { TrainingWeekModel, TrainingYearModel } from "../../store/types";
import { useSelector } from "react-redux";
import { selectTrainingYear } from "../../store/selectors";
import { useScrollIntoView } from "../../hooks/useScrollIntoView";

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

let isScrolled = false;

const TrainingYear: React.FC<Props> = (props) => {

  const trainingYear = useSelector<RootState, TrainingYearModel>(state => selectTrainingYear(state, props.year));
  const currWeekStartDate = useMemo(() => getWeekStartDate(new Date()), []);
  const currWeekRef = useRef<HTMLDivElement>(null);

  const getRef = (week: TrainingWeekModel) => week.weekStartDate.getTime() === currWeekStartDate.getTime() ? currWeekRef : null;
  const scrollDone = useCallback(() => isScrolled = true, []);

  useScrollIntoView<HTMLDivElement>(currWeekRef, [!isScrolled], scrollDone);

  if (trainingYear === undefined) {
    return <div>Training year ({props.year}) not found.</div>;
  }

  return (
    <div className="training-year">
      <div className="training-year__weeks">
        {trainingYear.weeks.map((week, idx) => (
          <div ref={getRef(week)} key={idx} className="training-year__week">
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