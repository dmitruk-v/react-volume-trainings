import { useMemo, useState } from "react";
import { ExerciseModel, calculateExerciseStats, Day, AppDispatch, addSetAction, createSetId, updateExerciseAction, removeSetAction, removeExerciseAction, addExerciseAction, createExerciseId } from "../../../store";
import { useDispatch } from "react-redux";

// COMPONENTS --------------------------------------
import ExSet from "../ex-set/ex-set";
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
  day: Day,
  trainingId: string,
  initialExercise: ExerciseModel,
  exerciseNumber: number,
}

const Exercise: React.FC<Props> = (props) => {

  const [exerciseName, setExerciseName] = useState(props.initialExercise.name);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const exerciseStats = useMemo(
    () => calculateExerciseStats(props.initialExercise),
    [props.initialExercise]
  );

  const handleSubmitName = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      updateExerciseAction(props.day, props.trainingId, { ...props.initialExercise, name: exerciseName })(dispatch)
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
      addSetAction(day, trainingId, initialExercise.exerciseId, { ...lastSet, setId: createSetId() })(dispatch)
    );
  }

  const removeSet = () => {
    const { day, trainingId, initialExercise } = props;
    const lastSet = initialExercise.sets[initialExercise.sets.length - 1];
    dispatch(
      removeSetAction(day, trainingId, initialExercise.exerciseId, lastSet)(dispatch)
    );
  }

  const cloneExercise = () => {
    const { day, trainingId, initialExercise } = props;
    const clonedExercise: ExerciseModel = {
      ...initialExercise,
      exerciseId: createExerciseId(),
      sets: initialExercise.sets.map(s => ({ ...s, setId: createSetId() }))
    }
    dispatch(
      addExerciseAction(day, trainingId, clonedExercise)(dispatch)
    );
  }

  const removeExercise = () => {
    const { day, trainingId, initialExercise } = props;
    dispatch(
      removeExerciseAction(day, trainingId, initialExercise)(dispatch)
    );
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
          <div className="exercise__sets">
            {props.initialExercise.sets.map((set, idx) => {
              return (
                <div key={set.setId} className="exercise__ex-set">
                  <ExSet
                    day={props.day}
                    trainingId={props.trainingId}
                    exerciseId={props.initialExercise.exerciseId}
                    setNumber={idx + 1}
                    initialSet={set}
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <button className="button-type1 exercise__menu-btn" onClick={() => setIsMenuVisible(true)}>
        <img src={openMenuIcon} alt="" />
      </button>

      <div className={`dropdown-menu ${isMenuVisible ? "dropdown-menu--visible" : ""} exercise__dropdown`}>
        <div className="dropdown-menu__inner">
          <ul className="dropdown-menu__list">
            <li className="dropdown-menu__item">
              <button className="button-type2" onClick={() => editName()}>Change name</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="button-type2" title="Add set" onClick={() => cloneLastSet()}>Clone last set</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="button-type2" title="Remove last set" onClick={() => removeSet()}>Remove last set</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="button-type2" title="Clone this exercise" onClick={() => cloneExercise()}>Clone</button>
            </li>
            <li className="dropdown-menu__item">
              <button className="button-type2" title="Remove last exercise" onClick={() => removeExercise()}>Remove</button>
            </li>
          </ul>
        </div>

        <button className="button-type1 dropdown-menu__close-btn" onClick={() => setIsMenuVisible(false)}>
          <img src={closeMenuIcon} alt="" />
        </button>
      </div>

      {isNameEditable
        ?
        <div className="exercise__overlay">
          <form className="exercise-name__edit" onSubmit={handleSubmitName}>
            <input
              type="text"
              className="exercise-name__input"
              autoFocus
              value={exerciseName}
              onChange={evt => setExerciseName(evt.target.value)}
            />
            <button className="button-type1 button-type1--lg exercise-name__done-btn">
              <img src={doneIcon} alt="" />
            </button>
          </form>
        </div>
        : ""}
    </div>
  );
}

export default Exercise;