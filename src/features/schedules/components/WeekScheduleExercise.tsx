import React, { PropsWithChildren, useState } from "react";
import { ExerciseModel } from "../schedules-types";
import { WeekDay } from "../../../shared/types";
import { useFocusWhen } from "../../../shared/hooks/useFocusWhen";
import { useExercise } from "../hooks/useExercise";

// ASSETS ------------------------------------------
import icoMenu from "../../../assets/svg/menu_black_24dp.svg";
import icoDone from "../../../assets/svg/done_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./WeekScheduleExercise.css";
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
  trainingId: string,
  initialExercise: ExerciseModel,
  exerciseNumber: number,
}

const WeekScheduleExercise = (props: PropsWithChildren<Props>) => {

  const {
    cloneExercise, resetExercise, removeExercise, cloneLastSet, removeLastSet, updateExerciseName, exerciseStats
  } = useExercise(props.scheduleId, props.year, props.weekId, props.day, props.trainingId, props.initialExercise);

  const [nameEditable, setNameEditable] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState(props.initialExercise.name);
  const nameFocusRef = useFocusWhen(nameEditable);

  const editName = () => {
    setNameEditable(true);
    setMenuVisible(false);
  }

  const handleSubmitName = (evt: React.FormEvent) => {
    evt.preventDefault();
    updateExerciseName(exerciseName);
    setNameEditable(false);
  }

  return (
    <div className="wsch-exercise">
      <div className="wsch-exercise__layout">

        <div className="wsch-exercise__head">
          <div className="wsch-exercise__number">Exercise {props.exerciseNumber}</div>
          <div className="wsch-exercise__name">{props.initialExercise.name}</div>
        </div>

        <div className="wsch-exercise__stats">
          <Stats
            statsOptions={{
              modifierClasses: [
                "stats--vertical",
                "stats--strong-terms",
                "stats--colored-terms",
                "stats--colored-values"
              ],
              volumeTerm: "V:",
              intensityTerm: "I:",
              repsTerm: "N:",
            }}
            stats={exerciseStats}
          />
        </div>

        <div className="wsch-exercise__col wsch-exercise__sets-wrapper">
          <div className="wsch-exercise__sets">{props.children}</div>
        </div>

      </div>

      <button className="button-type1 wsch-exercise__menu-btn" onClick={() => setMenuVisible(true)}>
        <img src={icoMenu} alt="" />
      </button>

      <Dropdown
        isOpened={menuVisible}
        classNames={"wsch-exercise__dropdown"}
        withCloseBtn
        onClose={() => setMenuVisible(false)}
      >
        <div className="dropdown-title">Exercise menu</div>
        <div className="dropdown-menu">
          <ul className="dropdown-menu__list">
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button" title="Change exercise name" onClick={() => editName()}>Change name</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button" title="Reset exercise sets" onClick={() => resetExercise()}>Reset exercise</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button" title="Add set" onClick={() => cloneLastSet()}>Clone last set</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button" title="Remove last set" onClick={() => removeLastSet()}>Remove last set</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button" title="Clone this exercise" onClick={() => cloneExercise()}>Clone exercise</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="dropdown-menu__button" title="Remove last exercise" onClick={() => removeExercise()}>Remove exercise</button>
            </li>
          </ul>
        </div>
      </Dropdown>

      {nameEditable ? (
        <div className="wsch-exercise__overlay">
          <form className="wsch-exercise-name-editor" onSubmit={handleSubmitName}>
            <input
              type="text"
              className="wsch-exercise-name-editor__input"
              ref={nameFocusRef}
              value={exerciseName}
              onChange={evt => setExerciseName(evt.target.value)}
            />
            <button className="button-type1 button-type1--lg wsch-exercise-name-editor__done-btn">
              <img src={icoDone} alt="" />
            </button>
          </form>
        </div>
      ) : ""}

    </div>
  );
}

export { WeekScheduleExercise };