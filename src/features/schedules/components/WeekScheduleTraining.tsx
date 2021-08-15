import { PropsWithChildren, useState } from "react";
import { WeekDay } from "../../../shared/types";
import { TrainingModel } from "../schedules-types";
import { useTraining } from "../hooks/useTraining";

// ASSETS ------------------------------------------
import icoMenu from "../../../assets/svg/menu_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./WeekScheduleTraining.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Stats } from "./Stats";
import { Dropdown } from "../../../shared/components/Dropdown";
// -------------------------------------------------

type Props = {
  scheduleId: string,
  year: string,
  weekId: string,
  day: WeekDay,
  initialTraining: TrainingModel,
  trainingNumber: number,
};

const WeekScheduleTraining = (props: PropsWithChildren<Props>) => {

  const {
    trainingStats,
    cloneTraining, resetTraining, removeTraining
  } = useTraining(props.scheduleId, props.year, props.weekId, props.day, props.initialTraining);

  const [menuOpened, setMenuOpened] = useState(false);
  const [opened, setOpened] = useState(props.trainingNumber === 1);

  const toggleOpenTraining = (evt: React.MouseEvent<HTMLDivElement>) => {
    if ((evt.target as HTMLDivElement).classList.contains("wsch-training__head")) {
      setOpened(!opened);
    }
  }

  return (
    <div className={`wsch-training ${opened ? "wsch-training--opened" : ""}`} onClick={toggleOpenTraining}>
      <div className="wsch-training__head">
        <div className="wsch-training__title">Training {props.trainingNumber}</div>
        <div className="wsch-training__stats">
          <Stats
            statsOptions={{
              modifierClasses: [
                "stats--colored-terms",
                "stats--colored-values",
                "stats--colored-borders",
                "stats--light-bg-items"
              ],
              volumeTerm: "V:",
              intensityTerm: "I:",
              repsTerm: "N:",
            }}
            stats={trainingStats}
          />
        </div>

        <button className="button-type1 wsch-training__menu-btn" onClick={() => setMenuOpened(true)}>
          <img src={icoMenu} alt="" />
        </button>

        <Dropdown
          isOpened={menuOpened}
          classNames="wsch-training__dropdown"
          withCloseBtn
          onClose={() => setMenuOpened(false)}
        >
          <div className="dropdown-title">Training menu</div>
          <div className="dropdown-menu">
            <ul className="dropdown-menu__list">
              <li className="dropdown-menu__item">
                <button className="dropdown-menu__button" title="Reset training" onClick={() => resetTraining()}>Reset training</button>
              </li>
              <li className="dropdown-menu__item">
                <button className="dropdown-menu__button" title="Clone training" onClick={() => cloneTraining()}>Clone training</button>
              </li>
              <li className="dropdown-menu__item">
                <button className="dropdown-menu__button" title="Remove training" onClick={() => removeTraining()}>Remove training</button>
              </li>
            </ul>
          </div>
        </Dropdown>

      </div>

      <div className="wsch-training__body">
        <div className="wsch-training__exercises">{props.children}</div>
      </div>

    </div>
  );
}

export { WeekScheduleTraining };