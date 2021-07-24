import { useMemo, useRef, useState } from "react";
import { CYCLES } from "../../constants/schedule";
import { AppDispatch, calculateTrainingDayStats, calculateTrainingWeekStats, RootState } from "../../store";
import { schedulesUpdateTrainingWeekAction } from "../../store/actions";
import { Cycle, TrainingWeekModel, WeekDay, ScheduleModel } from "../../store/types";
import { getClasses } from "../../utils/css-utils";
import { useDispatch, useSelector } from "react-redux";
import { createClonedWeek } from "../../utils/schedule-utils";
import { selectScheduleById } from "../../store/selectors";

// ASSETS ------------------------------------------
import icoCycle from "../../assets/svg/settings_backup_restore_black_24dp.svg";
import icoCopy from "../../assets/svg/content_copy_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./year-week.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Dropdown } from "../common/dropdown/dropdown";
import { YearDay } from "../year-day/year-day";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  todayWeekStartDate: Date,
  trainingWeek: TrainingWeekModel,
  weekNum: number,
};

const YearWeek: React.FC<Props> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [cycleMenuOpened, setCycleMenuOpened] = useState(false);
  const [copyMenuOpened, setCopyMenuOpened] = useState(false);
  const schedule = useSelector<RootState, ScheduleModel | undefined>(state => selectScheduleById(state, props.scheduleId));
  const weekDivRef = useRef<HTMLDivElement>(null);

  const handleCycleChange = (cycle: Cycle) => {
    dispatch(
      schedulesUpdateTrainingWeekAction(props.scheduleId, props.year, {
        ...props.trainingWeek, cycle
      })
    );
    setCycleMenuOpened(false);
  }

  const handleWeekCopy = (fromWeekId: string) => {
    if (schedule === undefined) return;
    const fromWeek = schedule.years[props.year].weeks.find(week => week.weekId === fromWeekId);
    if (fromWeek === undefined) return;
    dispatch(
      schedulesUpdateTrainingWeekAction(props.scheduleId, props.year, createClonedWeek(fromWeek, props.trainingWeek))
    );
    setCopyMenuOpened(false);
  }

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

  return (
    <div ref={weekDivRef} className={`t-year-week ${weekClasses}`}>
      <div className="t-year-week__header">
        <div className="t-year-week__number">{props.weekNum}</div>
        <button className="button-type1 t-year-week__menu-button" onClick={() => setCopyMenuOpened(true)}>
          <img src={icoCopy} alt="ico-menu" />
        </button>
        <button className="button-type1 t-year-week__menu-button" onClick={() => setCycleMenuOpened(true)}>
          <img src={icoCycle} alt="ico-cycle" />
        </button>
      </div>
      <div className="t-year-week__body">
        <div className="t-year-week__days">
          {/* {Object.keys(props.trainingWeek.days).map((day, idx) => {
            const dayStats = calculateTrainingDayStats(props.trainingWeek.days[day as WeekDay]);
            const dayDate = new Date(
              props.trainingWeek.weekStartDate.getFullYear(),
              props.trainingWeek.weekStartDate.getMonth(),
              props.trainingWeek.weekStartDate.getDate() + idx
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
                />
              </div>
            );
          })} */}
          {props.children}
        </div>
        <div className="t-year-week__stats">
          V: {trainingWeekStats.volume.toFixed(2)} t,
          I: {trainingWeekStats.intensity.toFixed(1)} kg
        </div>
      </div>

      <Dropdown
        isOpened={copyMenuOpened}
        classNames={"t-year-week__dropdown"}
        withCloseBtn
        onClose={() => setCopyMenuOpened(false)}
      >
        <div className="dropdown-title">Copy from:</div>
        <div className="dropdown-form">
          <div className="control-select">
            <select onChange={(evt) => handleWeekCopy(evt.target.value)} className="control-select__native">
              <option key={-1} value="">Select week</option>
              {schedule && schedule.years[props.year].weeks.map((week, idx) => (
                <option key={idx} value={week.weekId}>{idx + 1}</option>
              ))}
            </select>
          </div>
        </div>
      </Dropdown>

      <Dropdown
        isOpened={cycleMenuOpened}
        classNames={"t-year-week__dropdown"}
        withCloseBtn
        onClose={() => setCycleMenuOpened(false)}
      >
        <div className="dropdown-title">Cycle type:</div>
        <div className="dropdown-menu">
          <ul className="dropdown-menu__list">
            {CYCLES.map(cycle => (
              <li key={cycle} className="dropdown-menu__item">
                <button
                  className={`dropdown-menu__button ${cycle === props.trainingWeek.cycle ? "dropdown-menu__button--active" : ""}`}
                  onClick={() => handleCycleChange(cycle)}
                >{cycle}</button>
              </li>
            ))}
          </ul>
        </div>
      </Dropdown>

    </div>
  );
}

export { YearWeek };