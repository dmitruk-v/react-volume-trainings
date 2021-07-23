import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { schedulesUpdateSetWithSpreadAction, schedulesUpdateSetAction } from "../../store/actions";
import { selectScheduleOptions } from "../../store/selectors";
import { WeekDay, ExSetModel } from "../../store/types";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./ex-set.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type UpdateSetActionCreator = typeof schedulesUpdateSetWithSpreadAction | typeof schedulesUpdateSetAction;

type Props = {
  scheduleId: string,
  year: string,
  weekId: string,
  day: WeekDay,
  trainingId: string,
  exerciseId: string,
  setNumber: number,
  initialSet: ExSetModel,
}

const ExSet: React.FC<Props> = (props) => {

  console.log("ExSet called");

  const dispatch = useDispatch<AppDispatch>();
  const scheduleOptions = useSelector(selectScheduleOptions);
  const [isRepsFocused, setIsRepsFocused] = useState(false);
  const [isWeightFocused, setIsWeightFocused] = useState(false);

  const handleChange = (type: "reps" | "weight", value: string) => {
    const val = Number(value);
    if (isNaN(val)) return;

    let updatedSet: ExSetModel = props.initialSet;
    if (type === "reps") {
      updatedSet = { ...props.initialSet, reps: val };
    } else if (type === "weight") {
      updatedSet = { ...props.initialSet, weight: val };
    }

    let actionCreator: UpdateSetActionCreator = schedulesUpdateSetAction;
    if (scheduleOptions.spreadReps === true || scheduleOptions.spreadWeight === true) {
      actionCreator = schedulesUpdateSetWithSpreadAction;
    }

    dispatch(
      actionCreator(props.scheduleId, props.year, props.weekId, props.day, props.trainingId, props.exerciseId, updatedSet)
    );
  }

  const handleRepsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("reps", evt.target.value);
  }

  const handleWeightChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("weight", evt.target.value);
  }

  const focused = useMemo(
    () => isRepsFocused || isWeightFocused,
    [isRepsFocused, isWeightFocused]
  );

  return (
    <div className={`ex-set ${focused ? "ex-set--focused" : ""}`}>
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

export { ExSet };