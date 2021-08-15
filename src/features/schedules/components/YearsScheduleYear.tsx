import { PropsWithChildren, useMemo, useRef } from "react";
import { TrainingWeekModel, TrainingYearModel } from "../schedules-types";
import { getDayStartDate, getWeekStartDate } from "../../../shared/utils/date-utils";
import { useScrollIntoView } from "../../../shared/hooks";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./YearsScheduleYear.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { YearsScheduleWeekMemoized } from "./YearsScheduleWeek";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  trainingYear: TrainingYearModel,
}

let isScrolled = false;
const scrollDone = () => isScrolled = true;



const YearsScheduleYear = (props: PropsWithChildren<Props>) => {

  console.log("YearsScheduleYear called");

  const today = useMemo(() => {
    const now = new Date();
    return {
      startDate: getDayStartDate(now),
      weekStartDate: getWeekStartDate(now)
    }
  }, []);

  const currWeekRef = useRef<HTMLDivElement>(null);
  const getRef = (week: TrainingWeekModel) => week.weekStartDate.getTime() === today.weekStartDate.getTime() ? currWeekRef : null;

  useScrollIntoView<HTMLDivElement>(currWeekRef, [!isScrolled], scrollDone);

  return (
    <div className="ysch-year">
      <div className="ysch-year__weeks">
        {props.trainingYear.weeks.map((week, weekIdx) => (
          <div ref={getRef(week)} key={week.weekId} className="ysch-year__week">
            <YearsScheduleWeekMemoized
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

export { YearsScheduleYear };