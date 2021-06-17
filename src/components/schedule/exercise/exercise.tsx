import { useMemo, useState } from "react";
import { ExerciseModel, calculateExerciseStats, Day, AppDispatch, addSetAction, createSetId, updateExerciseAction } from "../../../store";
import { useDispatch } from "react-redux";

// COMPONENTS --------------------------------------
import ExSet from "../ex-set/ex-set";
// -------------------------------------------------

// ASSETS ------------------------------------------
import openMenuIcon from "../../../assets/svg/menu_black_24dp.svg";
import closeMenuIcon from "../../../assets/svg/close_black_24dp.svg";
// import cloneExerciseIcon from "../../../assets/svg/content_copy_black_24dp.svg";
// import removeExerciseIcon from "../../../assets/svg/delete_outline_black_24dp-red.svg";
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

  const addSet = () => {
    const { day, trainingId, initialExercise } = props;
    const lastSet = initialExercise.sets[initialExercise.sets.length - 1];
    dispatch(
      addSetAction(day, trainingId, initialExercise.exerciseId, { ...lastSet, setId: createSetId() })(dispatch)
    );
  }

  const removeSet = () => {
    if (props.initialExercise.sets.length <= 1) return;
    // const lastSet = props.initialExercise.sets[props.initialExercise.sets.length - 1];
  }

  return (
    <div className="exercise">
      <div className="exercise__layout">

        <div className="exercise__col exercise__name">
          <div className="exercise-name">
            <div className="exercise-name__number">Exercise {props.exerciseNumber}</div>
            <div className="exercise-name__title">{props.initialExercise.name}</div>
          </div>
        </div>

        <div className="exercise__col exercise__stats">
          <div className="exercise-stats">
            <div className="exercise-stats__item exercise-stats__item--volume">
              <span className="exercise-stats__term">Volume:</span>
              <span className="exercise-stats__value">{exerciseStats.volume.toFixed(2)} <span className="exercise-stats__units">t</span></span>
            </div>
            <div className="exercise-stats__item exercise-stats__item--intensity">
              <span className="exercise-stats__term">Intensity:</span>
              <span className="exercise-stats__value">{exerciseStats.intensity.toFixed(1)} <span className="exercise-stats__units">kg</span></span>
            </div>
            <div className="exercise-stats__item exercise-stats__item--reps">
              <span className="exercise-stats__term">Reps:</span>
              <span className="exercise-stats__value">{exerciseStats.reps} <span className="exercise-stats__units">reps</span></span>
            </div>
          </div>
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

      <div className={`exercise__menu ${isMenuVisible ? "exercise__menu--visible" : ""}`}>
        <div className="exercise-menu">
          <ul className="exercise-menu__list">
            <li className="exercise-menu__item">
              <button className="button-type2" onClick={() => editName()}>Change name</button>
            </li>
            <li className="exercise-menu__item">
              <button className="button-type2" title="Add set" onClick={() => addSet()}>Add set</button>
            </li>
            <li className="exercise-menu__item">
              <button className="button-type2" title="Remove last set" onClick={() => removeSet()}>Remove last set</button>
            </li>
            <li className="exercise-menu__item">
              <button className="button-type2" title="Clone this exercise" onClick={() => { }}>Clone</button>
            </li>
            <li className="exercise-menu__item">
              <button className="button-type2" title="Remove last exercise" onClick={() => { }}>Remove</button>
            </li>
          </ul>
        </div>

        <button className="button-type1 exercise__menu-close-btn" onClick={() => setIsMenuVisible(false)}>
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