import { PropsWithChildren, useCallback, useMemo, useRef } from "react";
import { getDayStartDate, getWeekStartDate } from "../../utils/date-utils";
import { RootState } from "../../store";
import { TrainingWeekModel, TrainingYearModel } from "../../store/types";
import { useSelector } from "react-redux";
import { selectTrainingYear } from "../../store/selectors";
import { useScrollIntoView } from "../../hooks/useScrollIntoView";
import { useRouteMatch } from "react-router-dom";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training-year.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { YearWeek } from "../year-week/year-week";
// -------------------------------------------------

type Props = {}

type RouteParams = {
  scheduleId: string,
  year: string,
};

let isScrolled = false;

const TrainingYear = (props: PropsWithChildren<Props>) => {

  const match = useRouteMatch<RouteParams>();
  const { scheduleId, year } = match.params;

  const trainingYear = useSelector<RootState, TrainingYearModel | undefined>(
    state => selectTrainingYear(state, scheduleId, year)
  );

  const today = useMemo(() => {
    const now = new Date();
    return {
      startDate: getDayStartDate(now),
      weekStartDate: getWeekStartDate(now)
    }
  }, []);

  const currWeekRef = useRef<HTMLDivElement>(null);
  const getRef = (week: TrainingWeekModel) => week.weekStartDate.getTime() === today.weekStartDate.getTime() ? currWeekRef : null;
  const scrollDone = useCallback(() => isScrolled = true, []);

  // useScrollIntoView<HTMLDivElement>(currWeekRef, [!isScrolled], scrollDone);

  if (trainingYear === undefined) {
    return <div>Training year ({scheduleId}, {year}) not found.</div>;
  }

  return (
    <div className="training-year">
      <div className="training-year__weeks">
        {trainingYear.weeks.map((week, weekIdx) => (
          <div ref={getRef(week)} key={week.weekId} className="training-year__week">
            <YearWeek
              scheduleId={scheduleId}
              year={year}
              weekNum={weekIdx + 1}
              trainingWeek={week}
              todayWeekStartDate={today.weekStartDate}
              todayStartDate={today.startDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { TrainingYear };