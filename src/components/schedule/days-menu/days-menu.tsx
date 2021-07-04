import { WeekScheduleModel } from "../../../store";

// STYLES ------------------------------------------
import "./days-menu.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import MenuDay from "../menu-day/menu-day";
// -------------------------------------------------

type Props = {
  schedule: WeekScheduleModel,
};

const DaysMenu: React.FC<Props> = (props) => {

  const scheduleDays = Object.keys(props.schedule) as (keyof typeof props.schedule)[];

  return (
    <div className="days-menu">
      <div className="days-menu__items">
        {scheduleDays.map(day => (
          <div key={day} className="days-menu__item" >
            <MenuDay trainingDay={props.schedule[day]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaysMenu;