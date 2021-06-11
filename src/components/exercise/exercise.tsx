import { useMemo, useState } from "react";
import ExSet from "../ex-set/ex-set";
import { ExerciseModel, calculateExerciseStats, Day, } from "../../store";
import "./exercise.css";

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
  // const dispatch = useDispatch<AppDispatch>();

  const exerciseStats = useMemo(
    () => calculateExerciseStats(props.initialExercise),
    [props.initialExercise]
  );

  const handleChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(evt.target.value);
  }

  const addSet = () => {
    // const lastSet = props.initialExercise.sets[props.initialExercise.sets.length - 1];
  }

  const removeSet = () => {
    if (props.initialExercise.sets.length <= 1) return;
    // const lastSet = props.initialExercise.sets[props.initialExercise.sets.length - 1];
  }

  return (
    <div className="exercise">
      <div className="exercise__layout">
        <div className="exercise__name">
          <div className="exercise-name">
            <div className="exercise-name__number">{props.exerciseNumber}.</div>
            <div className="exercise-name__title">{props.initialExercise.name}</div>
          </div>
        </div>
        <div className="exercise__sets-wrapper">
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
        <div className="exercise__stats">
          <div className="stats">
            <div className="stats__item">
              <div className="stats-item stats-item--volume">
                <div className="stats-item__term">V</div>
                <div className="stats-item__value">{exerciseStats.volume.toFixed(2)} <span className="stats-item__units">t</span></div>
              </div>
            </div>
            <div className="stats__item">
              <div className="stats-item stats-item--intensity">
                <div className="stats-item__term">I</div>
                <div className="stats-item__value">{exerciseStats.intensity.toFixed(1)} <span className="stats-item__units">kg</span></div>
              </div>
            </div>
            <div className="stats__item">
              <div className="stats-item stats-item--reps">
                <div className="stats-item__term">N</div>
                <div className="stats-item__value">{exerciseStats.reps} <span className="stats-item__units">reps</span></div>
              </div>
            </div>
          </div>
        </div>

        <button className="exercise-button exercise__menu-btn" onClick={() => setIsMenuVisible(true)}></button>

        <div className={`exercise__menu ${isMenuVisible ? "exercise__menu--visible" : ""}`}>
          <ul className="exercise-menu">
            <li className="exercise-menu__item">
              <button className="" onClick={() => {
                setIsNameEditable(true);
                setIsMenuVisible(false);
              }}>Change name</button>
            </li>
            <li className="exercise-menu__item">
              <button className="" onClick={() => addSet()}>Add set</button>
            </li>
            <li className="exercise-menu__item">
              <button className="" onClick={() => removeSet()}>Remove set</button>
            </li>
            <li className="exercise-menu__item">
              <button className="" onClick={() => { }}>Clone exercise</button>
            </li>
            <li className="exercise-menu__item">
              <button className="" onClick={() => { }}>Remove exercise</button>
            </li>
          </ul>
          <button className="exercise-button exercise__menu-close-btn" onClick={() => setIsMenuVisible(false)}></button>
        </div>

        {isNameEditable
          ?
          <div className="exercise__overlay">
            <div className="exercise-name__edit">
              <input type="text" className="exercise-name__input"
                value={exerciseName}
                onChange={handleChangeName}
              />
              <button className="exercise-button exercise-name__done-btn" onClick={() => setIsNameEditable(false)}></button>
            </div>
          </div>
          : ""}
      </div>
    </div>
  );
}

export default Exercise;