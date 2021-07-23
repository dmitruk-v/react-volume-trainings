import { useEffect, useMemo, useRef, useState } from "react";
import { calculateExerciseStats, AppDispatch } from "../../store";
import { schedulesAddSetAction, schedulesRemoveSetAction, schedulesAddExerciseAction, schedulesUpdateExerciseAction, schedulesRemoveExerciseAction } from "../../store/actions";
import { ExerciseModel, WeekDay } from "../../store/types";
import { useDispatch } from "react-redux";
import { createClonedExercise, createResetedExercise, createClonedSet } from "../../utils/schedule-utils";

// ASSETS ------------------------------------------
import icoMenu from "../../assets/svg/menu_black_24dp.svg";
import icoDone from "../../assets/svg/done_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./exercise.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { Stats } from "../stats/stats";
import { Dropdown } from "../common/dropdown/dropdown";
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

const Exercise: React.FC<Props> = (props) => {

  const nameRef = useRef<HTMLInputElement>(null);
  const [exerciseName, setExerciseName] = useState(props.initialExercise.name);
  const [nameEditable, setNameEditable] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const nameField = nameRef.current;
    nameField?.focus();
    nameField?.select();
  }, [nameEditable, nameRef]);

  const exerciseStats = useMemo(
    () => calculateExerciseStats(props.initialExercise),
    [props.initialExercise]
  );

  const handleSubmitName = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      schedulesUpdateExerciseAction(
        props.scheduleId, props.year, props.weekId, props.day, props.trainingId, { ...props.initialExercise, name: exerciseName }
      )
    );
    setNameEditable(false);
  }

  const editName = () => {
    setNameEditable(true);
    setMenuVisible(false);
  }

  const cloneLastSet = () => {
    const lastSet = props.initialExercise.sets[props.initialExercise.sets.length - 1];
    dispatch(
      schedulesAddSetAction(
        props.scheduleId, props.year, props.weekId, props.day, props.trainingId, props.initialExercise.exerciseId, createClonedSet(lastSet)
      )
    );
  }

  const removeSet = () => {
    const lastSet = props.initialExercise.sets[props.initialExercise.sets.length - 1];
    dispatch(
      schedulesRemoveSetAction(
        props.scheduleId, props.year, props.weekId, props.day, props.trainingId, props.initialExercise.exerciseId, lastSet
      )
    );
  }

  const cloneExercise = () => {
    dispatch(
      schedulesAddExerciseAction(
        props.scheduleId, props.year, props.weekId, props.day, props.trainingId, createClonedExercise(props.initialExercise)
      )
    );
    setMenuVisible(false);
  }

  const resetExercise = () => {
    dispatch(
      schedulesUpdateExerciseAction(
        props.scheduleId, props.year, props.weekId, props.day, props.trainingId, createResetedExercise(props.initialExercise)
      )
    );
    setMenuVisible(false);
  }

  const removeExercise = () => {
    dispatch(
      schedulesRemoveExerciseAction(
        props.scheduleId, props.year, props.weekId, props.day, props.trainingId, props.initialExercise
      )
    );
    setMenuVisible(false);
  }

  return (
    <div className="exercise">
      <div className="exercise__layout">

        <div className="exercise__head">
          <div className="exercise-head">
            <div className="exercise-head__number">Exercise {props.exerciseNumber}</div>
            <div className="exercise-head__name">{props.initialExercise.name}</div>
          </div>
        </div>

        <div className="exercise__stats">
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

        <div className="exercise__col exercise__sets-wrapper">
          <div className="exercise__sets">{props.children}</div>
        </div>

      </div>

      <button className="button-type1 exercise__menu-btn" onClick={() => setMenuVisible(true)}>
        <img src={icoMenu} alt="" />
      </button>

      <Dropdown
        isOpened={menuVisible}
        classNames={"exercise__dropdown"}
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
              <button className="dropdown-menu__button" title="Remove last set" onClick={() => removeSet()}>Remove last set</button>
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
        <div className="exercise__overlay">
          <form className="exercise-name__edit" onSubmit={handleSubmitName}>
            <input
              type="text"
              className="exercise-name__input"
              ref={nameRef}
              value={exerciseName}
              onChange={evt => setExerciseName(evt.target.value)}
            />
            <button className="button-type1 button-type1--lg exercise-name__done-btn">
              <img src={icoDone} alt="" />
            </button>
          </form>
        </div>
      ) : ""}

    </div>
  );
}

export { Exercise };