import { useState } from "react";
import { WeekDays } from "../../../constants";
import { CYCLES } from "../../../constants/schedule";
import { calculateDayStats, WeekScheduleModel2 } from "../../../store";
import { getDayName, getMonthName } from "../../../utils/date-utils";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./year-week.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {
  currWeekStartDate: Date,
  weekSchedule: WeekScheduleModel2,
  weekNum: number
};

const YearWeek: React.FC<Props> = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const getWeekClasses = (): string => {
    const classes = {
      "ysch-week--current": props.currWeekStartDate.getTime() === props.weekSchedule.weekStartDate.getTime(),
      ["ysch-week--cycle_" + props.weekSchedule.cycle]: true,
    };
    return Object.keys(classes)
      .reduce((acc, key) => {
        if (classes[key] === true) acc.push(key);
        return acc;
      }, [] as string[])
      .join(" ");
  }

  return (
    <div className={`ysch-week ${getWeekClasses()}`}>
      <div className="ysch-week__header">
        <div className="ysch-week__number">{props.weekNum}</div>
        <div className="ysch-week__menu-button">
          <button className="button-type1 ysch-week__menu-button" onClick={() => setMenuVisible(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgba(0, 0, 0, 0.25)">
              <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="ysch-week__days">
        {(Object.keys(props.weekSchedule.days) as WeekDays).map((day, idx) => {
          const dayStats = calculateDayStats(props.weekSchedule.days[day]);
          const currDayDate = new Date(
            props.weekSchedule.weekStartDate.getFullYear(),
            props.weekSchedule.weekStartDate.getMonth(),
            props.weekSchedule.weekStartDate.getDate() + idx
          );
          return (
            <div key={day} className="ysch-week__day">
              <div className={`ysch-day ${dayStats.volume > 0 ? "ysch-day--used" : ""}`}>
                <div className="ysch-day__weekday">{formatWeekday(currDayDate)}</div>
                <div className="ysch-day__month">{formatMonth(currDayDate)}</div>
                <div className="ysch-day__date">{currDayDate.getDate()}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`dropdown ${menuVisible ? "dropdown--visible" : ""} dropdown--anim_from-ct dropdown--close_inside-top-right ysch-week__dropdown`}>
        <div className="dropdown__inner">
          <div className="dropdown-title">Cycle type:</div>
          <div className="dropdown-menu">
            <ul className="dropdown-menu__list">
              {CYCLES.map(cycle => (
                <li key={cycle} className="dropdown-menu__item">
                  <button className="dropdown-menu__button" onClick={() => { console.log("set" + cycle) }}>{cycle}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="button-type1 dropdown__close-btn" onClick={() => setMenuVisible(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
        </button>
      </div>

    </div>
  );
}

const formatMonth = (date: Date): string => {
  return getMonthName(date.getMonth()).slice(0, 3);
};

const formatWeekday = (weekday: Date): string => {
  return getDayName(weekday.getDay()).slice(0, 3);
};

export { YearWeek };