import { PropsWithChildren, useCallback, useMemo, useRef } from "react";
import { getDayStartDate, getWeekStartDate } from "../../utils/date-utils";
import { TrainingWeekModel, TrainingYearModel } from "../../store/types";
import { useScrollIntoView } from "../../hooks/useScrollIntoView";
import { useAppDispatch, useCancelOnEscape } from "../../hooks";
import { copyModeDisableAction } from "../../store/actions";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training-year.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { YearWeek } from "../year-week/year-week";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  trainingYear: TrainingYearModel,
}

let isScrolled = false;

const TrainingYear = (props: PropsWithChildren<Props>) => {

  const dispatch = useAppDispatch();

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

  useScrollIntoView<HTMLDivElement>(currWeekRef, [!isScrolled], scrollDone);
  useCancelOnEscape(() => {
    dispatch(copyModeDisableAction());
  });

  // if (trainingYear === undefined) {
  //   return <div>Training year ({scheduleId}, {year}) not found.</div>;
  // }

  return (
    <div className="training-year">
      <div className="training-year__weeks">
        {props.trainingYear.weeks.map((week, weekIdx) => (
          <div ref={getRef(week)} key={week.weekId} className="training-year__week">
            <YearWeek
              scheduleId={props.scheduleId}
              year={props.year}
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