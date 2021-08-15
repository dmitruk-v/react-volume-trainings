import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { WeekDay } from "../../../shared/types";
import { selectOptionsById } from "../../options/options-selectors";
import { AppOptionsModel } from "../../options/options-types";
import { UserModel } from "../../users/users-types";
import { schedulesAddExerciseAction, schedulesAddSetAction, schedulesRemoveExerciseAction, schedulesRemoveSetAction, schedulesUpdateExerciseAction, schedulesUpdateSetAction, schedulesUpdateSetWithSpreadAction } from "../schedules-actions";
import { selectTrainingWeekById } from "../schedules-selectors";
import { ExerciseModel, ExSetModel, TrainingWeekModel } from "../schedules-types"
import { calculateTrainingWeekStats, createClonedExercise, createClonedSet, createResetedExercise } from "../utils";

type UpdateSetActionCreator = typeof schedulesUpdateSetWithSpreadAction | typeof schedulesUpdateSetAction;

const useWeekSchedule = (
  scheduleId: string,
  year: string,
  weekId: string
) => {

  const dispatch = useAppDispatch();
  const trainingWeek = useAppSelector<TrainingWeekModel | undefined>(
    state => selectTrainingWeekById(state, scheduleId, year, weekId)
  );
  const selectedUser = useAppSelector<UserModel | null>(state => state.selectedUser);
  const appOptions = useAppSelector<AppOptionsModel | undefined>(
    state => selectOptionsById(state, selectedUser?.optionsId || "")
  );

  const weekStats = useMemo(() => calculateTrainingWeekStats(trainingWeek), [trainingWeek]);

  const updateSet = (day: WeekDay, trainingId: string, exerciseId: string, initialSet: ExSetModel, type: "reps" | "weight", value: string) => {
    const val = Number(value);
    if (isNaN(val) || appOptions === undefined) return;
    let updatedSet = initialSet;

    if (type === "reps") updatedSet = { ...initialSet, reps: val };
    else if (type === "weight") updatedSet = { ...initialSet, weight: val };
    else console.error("[SET ERROR]. Unknown change type: " + type);

    let actionCreator: UpdateSetActionCreator = schedulesUpdateSetAction;
    if (appOptions.options.schedule.spreadReps === true || appOptions.options.schedule.spreadWeight === true) {
      actionCreator = schedulesUpdateSetWithSpreadAction;
    }
    dispatch(
      actionCreator(scheduleId, year, weekId, day, trainingId, exerciseId, updatedSet)
    );
  }

  const updateSetReps = (day: WeekDay, trainingId: string, exerciseId: string, initialSet: ExSetModel, reps: string) => {
    updateSet(day, trainingId, exerciseId, initialSet, "reps", reps);
  }

  const updateSetWeight = (day: WeekDay, trainingId: string, exerciseId: string, initialSet: ExSetModel, weight: string) => {
    updateSet(day, trainingId, exerciseId, initialSet, "weight", weight);
  }

  const updateExerciseName = (day: WeekDay, trainingId: string, initialExercise: ExerciseModel, updatedName: string) => {
    if (updatedName === initialExercise.name) return;
    dispatch(
      schedulesUpdateExerciseAction(scheduleId, year, weekId, day, trainingId, { ...initialExercise, name: updatedName })
    );
  }

  const cloneLastSet = (day: WeekDay, trainingId: string, initialExercise: ExerciseModel) => {
    const lastSet = initialExercise.sets[initialExercise.sets.length - 1];
    dispatch(
      schedulesAddSetAction(scheduleId, year, weekId, day, trainingId, initialExercise.exerciseId, createClonedSet(lastSet))
    );
  }

  const removeLastSet = (day: WeekDay, trainingId: string, initialExercise: ExerciseModel) => {
    const lastSet = initialExercise.sets[initialExercise.sets.length - 1];
    dispatch(
      schedulesRemoveSetAction(scheduleId, year, weekId, day, trainingId, initialExercise.exerciseId, lastSet)
    );
  }

  const cloneExercise = (day: WeekDay, trainingId: string, initialExercise: ExerciseModel) => {
    dispatch(
      schedulesAddExerciseAction(scheduleId, year, weekId, day, trainingId, createClonedExercise(initialExercise))
    );
  }

  const resetExercise = (day: WeekDay, trainingId: string, initialExercise: ExerciseModel) => {
    dispatch(
      schedulesUpdateExerciseAction(scheduleId, year, weekId, day, trainingId, createResetedExercise(initialExercise))
    );
  }

  const removeExercise = (day: WeekDay, trainingId: string, initialExercise: ExerciseModel) => {
    dispatch(
      schedulesRemoveExerciseAction(scheduleId, year, weekId, day, trainingId, initialExercise)
    );
  }

  const resetTraining = (day: WeekDay, trainingId: string) => { }
  const cloneTraining = (day: WeekDay, trainingId: string) => { }
  const removeTraining = (day: WeekDay, trainingId: string) => { }

  const copyTrainingDay = (fromDay: WeekDay, toDay: WeekDay) => { }

  return {
    updateSetReps, updateSetWeight,
    updateExerciseName, resetExercise, cloneExercise, removeExercise, cloneLastSet, removeLastSet,
    trainingWeek, weekStats
  }

}

export { useWeekSchedule }