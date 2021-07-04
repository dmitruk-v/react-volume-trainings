import { useEffect, useMemo, useRef, useState } from "react";
import { ExerciseModel, calculateExerciseStats, AppDispatch, addSetAction, updateExerciseAction, removeSetAction, removeExerciseAction, addExerciseAction } from "../../../store";
import { useDispatch } from "react-redux";
import { createClonedExercise, createResetedExercise, createClonedSet } from "../../../utils/schedule-utils";
import { WeekDay } from "../../../constants";

// COMPONENTS --------------------------------------
import Stats from "../stats/stats";
// -------------------------------------------------

// ASSETS ------------------------------------------
import openMenuIcon from "../../../assets/svg/menu_black_24dp.svg";
import closeMenuIcon from "../../../assets/svg/close_black_24dp.svg";
import doneIcon from "../../../assets/svg/done_black_24dp.svg";
// -------------------------------------------------

// STYLES ------------------------------------------
import "./exercise.css";
// -------------------------------------------------

type Props = {
  day: WeekDay,
  trainingId: string,
  initialExercise: ExerciseModel,
  exerciseNumber: number,
}

const Exercise: React.FC<Props> = (props) => {

  const nameRef = useRef<HTMLInputElement>(null);
  const [exerciseName, setExerciseName] = useState(props.initialExercise.name);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const nameField = nameRef.current;
    nameField?.focus();
    nameField?.select();
  }, [isNameEditable, nameRef]);

  const exerciseStats = useMemo(
    () => calculateExerciseStats(props.initialExercise),
    [props.initialExercise]
  );

  const handleSubmitName = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      updateExerciseAction(props.day, props.trainingId, { ...props.initialExercise, name: exerciseName })
    );
    setIsNameEditable(false);
  }

  const editName = () => {
    setIsNameEditable(true);
    setIsMenuVisible(false);
  }

  const cloneLastSet = () => {
    const { day, trainingId, initialExercise } = props;
    const lastSet = initialExercise.sets[initialExercise.sets.length - 1];
    dispatch(
      addSetAction(day, trainingId, initialExercise.exerciseId, createClonedSet(lastSet))
    );
  }

  const removeSet = () => {
    const { day, trainingId, initialExercise } = props;
    const lastSet = initialExercise.sets[initialExercise.sets.length - 1];
    dispatch(
      removeSetAction(day, trainingId, initialExercise.exerciseId, lastSet)
    );
  }

  const cloneExercise = () => {
    const { day, trainingId, initialExercise } = props;
    dispatch(
      addExerciseAction(day, trainingId, createClonedExercise(initialExercise))
    );
    setIsMenuVisible(false);
  }

  const resetExercise = () => {
    const { day, trainingId, initialExercise } = props;
    dispatch(
      updateExerciseAction(day, trainingId, createResetedExercise(initialExercise))
    );
    setIsMenuVisible(false);
  }

  const removeExercise = () => {
    const { day, trainingId, initialExercise } = props;
    dispatch(
      removeExerciseAction(day, trainingId, initialExercise)
    );
    setIsMenuVisible(false);
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

      <button className="button-type1 exercise__menu-btn" onClick={() => setIsMenuVisible(true)}>
        <img src={openMenuIcon} alt="" />
      </button>

      <div className={`dropdown ${isMenuVisible ? "dropdown--visible" : ""} exercise__dropdown`}>
        <div className="dropdown__inner">
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
        </div>

        <button className="button-type1 dropdown__close-btn" onClick={() => setIsMenuVisible(false)}>
          <img src={closeMenuIcon} alt="" />
        </button>
      </div>

      {isNameEditable ? (
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
              <img src={doneIcon} alt="" />
            </button>
          </form>
        </div>
      ) : ""}

    </div>
  );
}

export default Exercise;