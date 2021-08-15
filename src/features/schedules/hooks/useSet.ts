import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { WeekDay } from "../../../shared/types";
import { selectOptionsById } from "../../options/options-selectors";
import { AppOptionsModel } from "../../options/options-types";
import { UserModel } from "../../users/users-types";
import { schedulesUpdateSetAction, schedulesUpdateSetWithSpreadAction } from "../schedules-actions";
import { ExSetModel } from "../schedules-types";

type UpdateSetActionCreator = typeof schedulesUpdateSetWithSpreadAction | typeof schedulesUpdateSetAction;

const useSet = (
  scheduleId: string,
  year: string,
  weekId: string,
  day: WeekDay,
  trainingId: string,
  exerciseId: string,
  initialSet: ExSetModel
) => {

  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector<UserModel | null>(state => state.selectedUser);
  const appOptions = useAppSelector<AppOptionsModel | undefined>(state => selectOptionsById(state, selectedUser?.optionsId || ""));

  const handleChange = (type: "reps" | "weight", value: string) => {
    const val = Number(value);
    if (isNaN(val)) return;
    if (appOptions === undefined) return;

    let updatedSet: ExSetModel = initialSet;
    if (type === "reps") {
      updatedSet = { ...initialSet, reps: val };
    } else if (type === "weight") {
      updatedSet = { ...initialSet, weight: val };
    }
    let actionCreator: UpdateSetActionCreator = schedulesUpdateSetAction;
    if (appOptions.options.schedule.spreadReps === true || appOptions.options.schedule.spreadWeight === true) {
      actionCreator = schedulesUpdateSetWithSpreadAction;
    }

    dispatch(
      actionCreator(scheduleId, year, weekId, day, trainingId, exerciseId, updatedSet)
    );
  }

  const handleRepsChange = (reps: string) => {
    handleChange("reps", reps);
  }

  const handleWeightChange = (weight: string) => {
    handleChange("weight", weight);
  }

  return {
    handleRepsChange, handleWeightChange
  }
}

export { useSet }