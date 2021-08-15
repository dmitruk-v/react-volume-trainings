import React, { PropsWithChildren, useMemo } from "react";
import { WeekDay } from "../../../shared/types";
import { getClasses } from "../../../shared/utils/css-utils";
import { TrainingWeekModel } from "../schedules-types";
import { calculateTrainingDayStats, calculateTrainingWeekStats } from "../utils";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./YearsScheduleWeek.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { YearsScheduleWeekDay } from "./YearsScheduleWeekDay";
import { YearsScheduleWeekHeader } from "./YearsScheduleWeekHeader";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  trainingWeek: TrainingWeekModel,
  weekNum: number,
  todayWeekStartDate: Date,
  todayStartDate: Date,
};

const YearsScheduleWeek = (props: PropsWithChildren<Props>) => {

  const weekClasses = getClasses(
    "ysch-week--cycle_" + props.trainingWeek.cycle,
    {
      "ysch-week--current": props.todayWeekStartDate.getTime() === props.trainingWeek.weekStartDate.getTime(),
    }
  );

  const trainingWeekStats = useMemo(
    () => calculateTrainingWeekStats(props.trainingWeek),
    [props.trainingWeek]
  );

  return (
    <div className={`ysch-week ${weekClasses}`}>
      <YearsScheduleWeekHeader
        scheduleId={props.scheduleId}
        year={props.year}
        weekId={props.trainingWeek.weekId}
        weekNum={props.weekNum}
        trainingWeek={props.trainingWeek}
        onCycleChange={() => { }}
      />
      <div className="ysch-week__body">
        <div className="ysch-week__days">
          {Object.keys(props.trainingWeek.days).map((dayName, dayIdx) => {
            const dayStats = calculateTrainingDayStats(props.trainingWeek.days[dayName as WeekDay]);
            const dayDate = getWeekDayDateByIndex(props.trainingWeek.weekStartDate, dayIdx);
            return (
              <div key={dayName} className="ysch-week__day">
                <YearsScheduleWeekDay
                  isUsed={dayStats.volume > 0}
                  scheduleId={props.scheduleId}
                  year={props.year}
                  weekId={props.trainingWeek.weekId}
                  dayName={dayName as WeekDay}
                  dayDate={dayDate}
                  todayStartDate={props.todayStartDate}
                />
              </div>
            );
          })}
        </div>
        <div className="ysch-week__stats">
          V: {trainingWeekStats.volume.toFixed(2)} t,
          I: {trainingWeekStats.intensity.toFixed(1)} kg
        </div>
      </div>

    </div>
  );
};

const getWeekDayDateByIndex = (weekStartDate: Date, dayIndex: number): Date => {
  return new Date(
    weekStartDate.getFullYear(),
    weekStartDate.getMonth(),
    weekStartDate.getDate() + dayIndex
  );
}

const YearsScheduleWeekMemoized = React.memo(YearsScheduleWeek);
export { YearsScheduleWeek, YearsScheduleWeekMemoized }