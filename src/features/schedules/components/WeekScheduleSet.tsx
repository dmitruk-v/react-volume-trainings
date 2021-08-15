import { useMemo, useState } from "react";
import { WeekDay } from "../../../shared/types";
import { useSet } from "../hooks/useSet";
import { ExSetModel } from "../schedules-types";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./WeekScheduleSet.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

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

const WeekScheduleSet = (props: Props) => {

  const {
    handleRepsChange, handleWeightChange
  } = useSet(props.scheduleId, props.year, props.weekId, props.day, props.trainingId, props.exerciseId, props.initialSet);
  const [isRepsFocused, setIsRepsFocused] = useState(false);
  const [isWeightFocused, setIsWeightFocused] = useState(false);
  const focused = useMemo(() => isRepsFocused || isWeightFocused, [isRepsFocused, isWeightFocused]);

  return (
    <div className={`wsch-set ${focused ? "wsch-set--focused" : ""}`}>
      <div className="wsch-set__number">{props.setNumber}</div>
      <div className="wsch-set__layout">
        <div className="wsch-set__reps">
          <input type="text" name="reps" className="wsch-set__input" placeholder="reps"
            autoComplete="off"
            maxLength={3}
            value={props.initialSet.reps === 0 ? "" : props.initialSet.reps}
            onChange={evt => handleRepsChange(evt.target.value)}
            onFocus={() => setIsRepsFocused(true)}
            onBlur={() => setIsRepsFocused(false)}
          />
        </div>
        <div className="wsch-set__weight">
          <input type="text" name="weight" className="wsch-set__input" placeholder="weight"
            autoComplete="off"
            maxLength={3}
            value={props.initialSet.weight === 0 ? "" : props.initialSet.weight}
            onChange={evt => handleWeightChange(evt.target.value)}
            onFocus={() => setIsWeightFocused(true)}
            onBlur={() => setIsWeightFocused(false)}
          />
        </div>
      </div>
    </div>
  );
}

export { WeekScheduleSet }