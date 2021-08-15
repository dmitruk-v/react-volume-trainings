import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { WeekDay } from "../../../shared/types";
import { getClasses } from "../../../shared/utils/css-utils";
import { getDayName, getMonthName } from "../../../shared/utils/date-utils";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./YearsScheduleWeekDay.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  isUsed: boolean,
  scheduleId: string,
  year: string,
  weekId: string,
  dayName: WeekDay,
  dayDate: Date,
  todayStartDate: Date
};

const YearsScheduleWeekDay = (props: PropsWithChildren<Props>) => {

  const dayClasses = getClasses({
    "ysch-day--used": props.isUsed,
    "ysch-day--current": props.dayDate.getTime() === props.todayStartDate.getTime()
  });

  return (
    <Link
      className={`ysch-day ${dayClasses}`}
      to={`/week-schedule/${props.scheduleId}/${props.year}/${props.weekId}/${props.dayName}`}
    >
      <div className="ysch-day__weekday">{formatWeekday(props.dayDate)}</div>
      <div className="ysch-day__month">{formatMonth(props.dayDate)}</div>
      <div className="ysch-day__date">{props.dayDate.getDate()}</div>
    </Link>
  );
};

const formatMonth = (date: Date): string => {
  return getMonthName(date.getMonth()).slice(0, 3);
};

const formatWeekday = (weekday: Date): string => {
  return getDayName(weekday.getDay()).slice(0, 3);
};

export { YearsScheduleWeekDay };