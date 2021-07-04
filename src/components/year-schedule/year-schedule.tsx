import { useEffect, useMemo, useState } from "react";
import { getCurrentWeekStartDate } from "../../utils/date-utils";
import { createYearSchedule, YearScheduleModel } from "../../store";

import { yearScheduleReducer } from "../../store/reducers/year-schedule-reducer";
import { loadYearScheduleAction } from "../../store/actions/year-schedule-actions";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./year-schedule.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { YearWeek } from "./year-week/year-week";
// -------------------------------------------------

type Props = {};

const YearSchedule: React.FC<Props> = (props) => {

  const currYear = new Date().getFullYear();
  const [yearSchedule, setYearSchedule] = useState({ [currYear]: [] } as YearScheduleModel);

  useEffect(() => {
    setYearSchedule(createYearSchedule([2019, 2020, currYear]));
  }, [currYear]);

  console.log("global: ", yearSchedule);

  // -----------------------------------------------------------
  // const loadAction = loadYearScheduleAction(yearSchedule);
  // const loaded = yearScheduleReducer({}, loadAction);
  console.log("YearSchedule called!");

  // console.log("global: ", globalSchedule);
  // console.log("loaded: ", loaded);

  // const updatedSchedule =

  // -----------------------------------------------------------

  const currWeekStartDate = useMemo(() => getCurrentWeekStartDate(), []);
  // const [selectedYear, setSelectedYear] = useState(currYear);

  return (
    <div className="year-schedule">
      {/* <div className="year-schedule__year-selector">
        <div className="control-select">
          <select className="control-select__native" onChange={evt => setSelectedYear(Number(evt.target.value))} defaultValue={currYear}>
            {Object.keys(yearSchedule).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div> */}
      <div className="year-schedule__weeks">
        {yearSchedule[2021].map((weekSchedule, idx) => {
          return (
            <div key={weekSchedule.weekStartDate.getTime()} className={`year-schedule__week`}>
              <YearWeek currWeekStartDate={currWeekStartDate} weekSchedule={weekSchedule} weekNum={idx + 1} />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export { YearSchedule };