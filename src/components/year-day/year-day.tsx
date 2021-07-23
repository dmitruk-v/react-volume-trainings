import React from "react";
import { NavLink } from "react-router-dom";
import { WithChildren } from "../../store";
import { WeekDay } from "../../store/types";
import { getDayName, getMonthName } from "../../utils/date-utils";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./year-day.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type Props = {
  isUsed: boolean,
  scheduleId: string,
  year: string,
  weekId: string,
  day: WeekDay,
  currDayDate: Date
};

const YearDay = (props: WithChildren<Props>) => {
  return (
    <NavLink
      className={`t-year-day ${props.isUsed ? "t-year-day--used" : ""}`}
      to={`/week-schedule/${props.scheduleId}/${props.year}/${props.weekId}/${props.day}`}
    >
      <div className="t-year-day__weekday">{formatWeekday(props.currDayDate)}</div>
      <div className="t-year-day__month">{formatMonth(props.currDayDate)}</div>
      <div className="t-year-day__date">{props.currDayDate.getDate()}</div>
    </NavLink>
  );
}

const formatMonth = (date: Date): string => {
  return getMonthName(date.getMonth()).slice(0, 3);
};

const formatWeekday = (weekday: Date): string => {
  return getDayName(weekday.getDay()).slice(0, 3);
};

export { YearDay };