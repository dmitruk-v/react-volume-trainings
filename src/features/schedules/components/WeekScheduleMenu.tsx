import React, { PropsWithChildren } from "react";
import { TrainingWeekModel } from "../schedules-types";
import { useDaysMenu } from "../hooks/useDaysMenu";

// STYLES ------------------------------------------
import "./WeekScheduleMenu.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { WeekScheduleMenuDay } from "./WeekScheduleMenuDay";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  trainingWeek: TrainingWeekModel,
};

const WeekScheduleMenu = (props: PropsWithChildren<Props>) => {

  const { copyDay } = useDaysMenu(props.scheduleId, props.year, props.trainingWeek);
  const scheduleDays = Object.keys(props.trainingWeek.days) as (keyof typeof props.trainingWeek.days)[];

  return (
    <div className="wsch-menu-days">
      <div className="wsch-menu-days__items">
        {scheduleDays.map(day => (
          <div key={day} className="wsch-menu-days__item" >
            <WeekScheduleMenuDay
              trainingDay={props.trainingWeek.days[day]}
              onCopyDay={copyDay}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const WeekScheduleMenuMemoized = React.memo(WeekScheduleMenu);
export { WeekScheduleMenu, WeekScheduleMenuMemoized };