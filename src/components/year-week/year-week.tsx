import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CYCLES } from "../../constants/schedule";
import { AppDispatch, calculateTrainingDayStats, RootState } from "../../store";
import { yearScheduleUpdateTrainingWeekAction } from "../../store/actions";
import { Cycle, TrainingWeekModel, WeekDay, YearScheduleModel } from "../../store/types";
import { getDayName, getMonthName } from "../../utils/date-utils";
import { getClasses } from "../../utils/css-utils";
import { useDispatch, useSelector } from "react-redux";
import { createClonedWeek } from "../../utils/schedule-utils";

// ASSETS ------------------------------------------
import icoClose from "../../assets/svg/close_black_24dp.svg";
import icoCycle from "../../assets/svg/settings_backup_restore_black_24dp.svg";
import icoCopy from "../../assets/svg/content_copy_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./year-week.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {
  year: string,
  currWeekStartDate: Date,
  trainingWeek: TrainingWeekModel,
  weekNum: number
};

const YearWeek: React.FC<Props> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [cycleMenuVisible, setCycleMenuVisible] = useState(false);
  const [copyMenuVisible, setCopyMenuVisible] = useState(false);
  const yearSchedule = useSelector<RootState, YearScheduleModel>(state => state.yearSchedule);

  const handleCycleChange = (cycle: Cycle) => {
    dispatch(
      yearScheduleUpdateTrainingWeekAction(props.year, {
        ...props.trainingWeek, cycle
      })
    );
    setCycleMenuVisible(false);
  }

  const handleWeekCopy = (fromWeekId: string) => {
    const fromWeek = yearSchedule[props.year].find(week => week.weekId === fromWeekId);
    if (fromWeek === undefined) return;
    dispatch(
      yearScheduleUpdateTrainingWeekAction(props.year, createClonedWeek(fromWeek, props.trainingWeek))
    );
    setCopyMenuVisible(false);
  }

  const weekClasses = getClasses({
    "ysch-week--current": props.currWeekStartDate.getTime() === props.trainingWeek.weekStartDate.getTime(),
    ["ysch-week--cycle_" + props.trainingWeek.cycle]: true,
  });

  return (
    <div className={`ysch-week ${weekClasses}`}>
      <div className="ysch-week__header">
        <div className="ysch-week__number">{props.weekNum}</div>
        <button className="button-type1 ysch-week__menu-button" onClick={() => setCopyMenuVisible(true)}>
          <img src={icoCopy} alt="ico-menu" />
        </button>
        <button className="button-type1 ysch-week__menu-button" onClick={() => setCycleMenuVisible(true)}>
          <img src={icoCycle} alt="ico-cycle" />
        </button>
      </div>
      <div className="ysch-week__body">
        <div className="ysch-week__cycle-name">{props.trainingWeek.cycle}</div>
        <div className="ysch-week__days">
          {Object.keys(props.trainingWeek.days).map((day, idx) => {
            const dayStats = calculateTrainingDayStats(props.trainingWeek.days[day as WeekDay]);
            const currDayDate = new Date(
              props.trainingWeek.weekStartDate.getFullYear(),
              props.trainingWeek.weekStartDate.getMonth(),
              props.trainingWeek.weekStartDate.getDate() + idx
            );
            return (
              <div key={day} className="ysch-week__day">
                <NavLink
                  className={`ysch-day ${dayStats.volume > 0 ? "ysch-day--used" : ""}`}
                  to={`/week-schedule/${props.year}/${props.trainingWeek.weekId}/${day}`}
                >
                  <div className="ysch-day__weekday">{formatWeekday(currDayDate)}</div>
                  <div className="ysch-day__month">{formatMonth(currDayDate)}</div>
                  <div className="ysch-day__date">{currDayDate.getDate()}</div>
                </NavLink>
              </div>
            );
          })}
        </div>
        <div className="ysch-week__stats">stats</div>
      </div>

      <div className={`dropdown ${copyMenuVisible ? "dropdown--visible" : ""} ysch-week__dropdown`}>
        <div className="dropdown__inner">
          <div className="dropdown-title">Copy from:</div>
          <div className="dropdown-form">
            <div className="control-select">
              <select onChange={(evt) => handleWeekCopy(evt.target.value)} className="control-select__native">
                <option key={-1} value="">Week number</option>
                {yearSchedule[props.year].map((week, idx) => (
                  <option key={idx} value={week.weekId}>{idx + 1}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="button-type1 dropdown__close-btn" onClick={() => setCopyMenuVisible(false)}>
            <img src={icoClose} alt="ico-close-menu" />
          </button>
        </div>
      </div>

      <div className={`dropdown ${cycleMenuVisible ? "dropdown--visible" : ""} ysch-week__dropdown`}>
        <div className="dropdown__inner">
          <div className="dropdown-title">Cycle type:</div>
          <div className="dropdown-menu">
            <ul className="dropdown-menu__list">
              {CYCLES.map(cycle => (
                <li key={cycle} className="dropdown-menu__item">
                  <button className="dropdown-menu__button" onClick={() => handleCycleChange(cycle)}>{cycle}</button>
                </li>
              ))}
            </ul>
          </div>
          <button className="button-type1 dropdown__close-btn" onClick={() => setCycleMenuVisible(false)}>
            <img src={icoClose} alt="ico-close-menu" />
          </button>
        </div>
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