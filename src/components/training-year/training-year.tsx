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
import { useRouteMatch } from "react-router-dom";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
};

let isScrolled = false;

const TrainingYear: React.FC<Props> = (props) => {

  const match = useRouteMatch();
  console.log(match);

  const trainingYear = useSelector<RootState, TrainingYearModel | undefined>(state => selectTrainingYear(state, props.scheduleId, props.year));
  const currWeekStartDate = useMemo(() => getWeekStartDate(new Date()), []);
  const currWeekRef = useRef<HTMLDivElement>(null);

  console.log("--- CURRENT WEEK START DATE ---", currWeekStartDate.getTime());


  const getRef = (week: TrainingWeekModel) => week.weekStartDate.getTime() === currWeekStartDate.getTime() ? currWeekRef : null;
  const scrollDone = useCallback(() => isScrolled = true, []);

  useScrollIntoView<HTMLDivElement>(currWeekRef, [!isScrolled], scrollDone);

  if (trainingYear === undefined) {
    return <div>Training year ({props.scheduleId}, {props.year}) not found.</div>;
  }

  return (
    <div className="training-year">
      <div className="training-year__weeks">
        {/* {trainingYear.weeks.map((week, idx) => (
          <div ref={getRef(week)} key={idx} className="training-year__week">
            <YearWeek
              scheduleId={props.scheduleId}
              year={props.year}
              weekNum={idx + 1}
              trainingWeek={week}
              currWeekStartDate={currWeekStartDate}
              todayStartDate={props.todayStartDate}
            />
          </div>
        ))} */}
        {props.children}
      </div>
    </div>
  );
}

export { TrainingYear };