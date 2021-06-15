import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, ExSetModel, Day, AppDispatch, updateSetWithSpreadAction, updateSetAction } from "../../../store";

// STYLES ------------------------------------------
import "./ex-set.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {
  day: Day,
  trainingId: string,
  exerciseId: string,
  setNumber: number,
  initialSet: ExSetModel,
}

const ExSet: React.FC<Props> = (props) => {

  console.log("ExSet called");

  const dispatch = useDispatch<AppDispatch>();

  const scheduleOptions = useSelector((state: RootState) => state.appOptions.schedule);

  const [isRepsFocused, setIsRepsFocused] = useState(false);
  const [isWeightFocused, setIsWeightFocused] = useState(false);

  const handleRepsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const reps = Number(evt.target.value);
    let actionCreator = null;

    if (isNaN(reps)) return;

    if (scheduleOptions.spreadReps === true) {
      actionCreator = updateSetWithSpreadAction;
    } else {
      actionCreator = updateSetAction;
    }

    const action = actionCreator(
      props.day,
      props.trainingId,
      props.exerciseId,
      {
        setId: props.initialSet.setId,
        reps: reps,
        weight: props.initialSet.weight
      }
    )(dispatch);

    dispatch(action);
  }

  const handleWeightChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(evt.target.value);
    let actionCreator = null;

    if (isNaN(weight)) return;

    if (scheduleOptions.spreadWeight === true) {
      actionCreator = updateSetWithSpreadAction;
    } else {
      actionCreator = updateSetAction;
    }

    const action = actionCreator(
      props.day,
      props.trainingId,
      props.exerciseId,
      {
        setId: props.initialSet.setId,
        reps: props.initialSet.reps,
        weight: weight
      }
    )(dispatch);

    dispatch(action);
  }

  const getFocusedClass = useMemo(
    () => (isRepsFocused || isWeightFocused) ? "ex-set--focused" : "",
    [isRepsFocused, isWeightFocused]
  );

  return (
    <div className={`ex-set ${getFocusedClass}`}>
      <div className="ex-set__number">{props.setNumber}</div>
      <div className="ex-set__layout">
        <div className="ex-set__reps">
          <input type="text" name="reps" className="ex-set__input" placeholder="reps"
            autoComplete="off"
            maxLength={3}
            value={props.initialSet.reps === 0 ? "" : props.initialSet.reps}
            onChange={handleRepsChange}
            onFocus={() => setIsRepsFocused(true)}
            onBlur={() => setIsRepsFocused(false)}
          />
        </div>
        <div className="ex-set__weight">
          <input type="text" name="weight" className="ex-set__input" placeholder="weight"
            autoComplete="off"
            maxLength={3}
            value={props.initialSet.weight === 0 ? "" : props.initialSet.weight}
            onChange={handleWeightChange}
            onFocus={() => setIsWeightFocused(true)}
            onBlur={() => setIsWeightFocused(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default ExSet;