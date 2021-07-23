import { TrainingWeekModel } from "../../store/types";

// STYLES ------------------------------------------
import "./days-menu.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { MenuDay } from "../menu-day/menu-day";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  trainingWeek: TrainingWeekModel,
};

const DaysMenu: React.FC<Props> = (props) => {

  const scheduleDays = Object.keys(props.trainingWeek.days) as (keyof typeof props.trainingWeek.days)[];

  return (
    <div className="days-menu">
      <div className="days-menu__items">
        {scheduleDays.map(day => (
          <div key={day} className="days-menu__item" >
            <MenuDay
              scheduleId={props.scheduleId}
              year={props.year}
              weekId={props.trainingWeek.weekId}
              trainingDay={props.trainingWeek.days[day]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { DaysMenu };