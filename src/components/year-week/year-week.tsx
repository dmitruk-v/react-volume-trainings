import React, { PropsWithChildren, useCallback, useMemo, useRef } from "react";
import { AppDispatch, calculateTrainingDayStats, calculateTrainingWeekStats } from "../../store";
import { schedulesCopyTrainingWeekAction, schedulesUpdateTrainingWeekAction } from "../../store/actions";
import { Cycle, TrainingWeekModel, WeekDay } from "../../store/types";
import { getClasses } from "../../utils/css-utils";
import { useDispatch } from "react-redux";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./year-week.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { YearDay } from "../year-day/year-day";
import { YearWeekHeader } from "./year-week-header/year-week-header";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  trainingWeek: TrainingWeekModel,
  weekNum: number,
  todayWeekStartDate: Date,
  todayStartDate: Date,
};

const YearWeek = React.memo((props: PropsWithChildren<Props>) => {

  const dispatch = useDispatch<AppDispatch>();
  const weekDivRef = useRef<HTMLDivElement>(null);
  const weekClasses = getClasses(
    "t-year-week--cycle_" + props.trainingWeek.cycle,
    {
      "t-year-week--current": props.todayWeekStartDate.getTime() === props.trainingWeek.weekStartDate.getTime(),
    }
  );

  const trainingWeekStats = useMemo(
    () => calculateTrainingWeekStats(props.trainingWeek),
    [props.trainingWeek]
  );

  const handleCycleChange = useCallback((cycle: Cycle) => {
    dispatch(
      schedulesUpdateTrainingWeekAction(props.scheduleId, props.year, { ...props.trainingWeek, cycle })
    );
  }, [dispatch, props.scheduleId, props.year, props.trainingWeek]);

  const handleWeekCopy = useCallback((fromWeekId: string) => {
    dispatch(
      schedulesCopyTrainingWeekAction(props.scheduleId, props.year, fromWeekId, props.trainingWeek.weekId)
    );
  }, [dispatch, props.scheduleId, props.year, props.trainingWeek]);

  return (
    <div ref={weekDivRef} className={`t-year-week ${weekClasses}`}>
      <YearWeekHeader
        weekNum={props.weekNum}
        weekCycle={props.trainingWeek.cycle}
        onCycleChange={handleCycleChange}
        onWeekCopy={handleWeekCopy}
      />
      <div className="t-year-week__body">
        <div className="t-year-week__days">
          {Object.keys(props.trainingWeek.days).map((day, dayIdx) => {
            const dayStats = calculateTrainingDayStats(props.trainingWeek.days[day as WeekDay]);
            const dayDate = new Date(
              props.trainingWeek.weekStartDate.getFullYear(),
              props.trainingWeek.weekStartDate.getMonth(),
              props.trainingWeek.weekStartDate.getDate() + dayIdx
            );
            return (
              <div key={day} className="t-year-week__day">
                <YearDay
                  isUsed={dayStats.volume > 0}
                  scheduleId={props.scheduleId}
                  year={props.year}
                  weekId={props.trainingWeek.weekId}
                  day={day as WeekDay}
                  dayDate={dayDate}
                  todayStartDate={props.todayStartDate}
                />
              </div>
            );
          })}
        </div>
        <div className="t-year-week__stats">
          V: {trainingWeekStats.volume.toFixed(2)} t,
          I: {trainingWeekStats.intensity.toFixed(1)} kg
        </div>
      </div>

    </div>
  );
});

export { YearWeek }