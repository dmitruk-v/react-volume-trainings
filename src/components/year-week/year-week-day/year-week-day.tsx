import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { WeekDay } from "../../../store/types";
import { getClasses } from "../../../utils/css-utils";
import { getDayName, getMonthName } from "../../../utils/date-utils";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./year-week-day.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  isUsed: boolean,
  scheduleId: string,
  year: string,
  weekId: string,
  day: WeekDay,
  dayDate: Date,
  todayStartDate: Date
};

const YearWeekDay = (props: PropsWithChildren<Props>) => {

  const dayClasses = getClasses({
    "t-year-day--used": props.isUsed,
    "t-year-day--current": props.dayDate.getTime() === props.todayStartDate.getTime()
  });

  return (
    <Link
      className={`t-year-day ${dayClasses}`}
      to={`/week-schedule/${props.scheduleId}/${props.year}/${props.weekId}/${props.day}`}
    >
      <div className="t-year-day__weekday">{formatWeekday(props.dayDate)}</div>
      <div className="t-year-day__month">{formatMonth(props.dayDate)}</div>
      <div className="t-year-day__date">{props.dayDate.getDate()}</div>
    </Link>
    // <>Someday</>
  );
};

const formatMonth = (date: Date): string => {
  return getMonthName(date.getMonth()).slice(0, 3);
};

const formatWeekday = (weekday: Date): string => {
  return getDayName(weekday.getDay()).slice(0, 3);
};

export { YearWeekDay };