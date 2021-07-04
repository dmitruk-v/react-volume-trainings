import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, ExSetModel, AppDispatch, updateSetWithSpreadAction, updateSetAction } from "../../../store";
import { WeekDay } from "../../../constants";

// STYLES ------------------------------------------
import "./ex-set.css";
// -------------------------------------------------

type UpdateSetActionCreator = typeof updateSetWithSpreadAction | typeof updateSetAction;

type Props = {
  day: WeekDay,
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
    if (isNaN(reps)) return;

    let actionCreator: UpdateSetActionCreator = updateSetAction;
    const updatedSet = { ...props.initialSet, reps };
    if (scheduleOptions.spreadReps === true) {
      actionCreator = updateSetWithSpreadAction;
    }
    dispatch(
      actionCreator(props.day, props.trainingId, props.exerciseId, updatedSet)
    );
  }

  const handleWeightChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(evt.target.value);
    if (isNaN(weight)) return;

    let actionCreator: UpdateSetActionCreator = updateSetAction;
    const updatedSet = { ...props.initialSet, weight };
    if (scheduleOptions.spreadWeight === true) {
      actionCreator = updateSetWithSpreadAction;
    }
    dispatch(
      actionCreator(props.day, props.trainingId, props.exerciseId, updatedSet)
    );
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