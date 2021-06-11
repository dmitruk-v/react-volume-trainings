import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { ExSetModel, Day, AppDispatch, updateSetWithSpreadAction } from "../../store";
import "./ex-set.css";

type Props = {
  day: Day,
  trainingId: string,
  exerciseId: string,
  setNumber: number,
  initialSet: ExSetModel,
}

const ExSet: React.FC<Props> = (props) => {

  const dispatch = useDispatch<AppDispatch>();

  const [isRepsFocused, setIsRepsFocused] = useState(false);
  const [isWeightFocused, setIsWeightFocused] = useState(false);

  const handleRepsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const action = updateSetWithSpreadAction(
      props.day,
      props.trainingId,
      props.exerciseId,
      {
        setId: props.initialSet.setId,
        reps: Number(evt.target.value),
        weight: props.initialSet.weight
      }
    )(dispatch);
    dispatch(action);
  }

  const handleWeightChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const action = updateSetWithSpreadAction(
      props.day,
      props.trainingId,
      props.exerciseId,
      {
        setId: props.initialSet.setId,
        reps: props.initialSet.reps,
        weight: Number(evt.target.value)
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
            value={props.initialSet.reps === 0 ? "" : props.initialSet.reps}
            onChange={handleRepsChange}
            onFocus={() => setIsRepsFocused(true)}
            onBlur={() => setIsRepsFocused(false)}
          />
        </div>
        <div className="ex-set__weight">
          <input type="text" name="weight" className="ex-set__input" placeholder="weight"
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