import { useMemo } from "react";
import { useAppDispatch } from "../../../shared/hooks";
import { WeekDay } from "../../../shared/types"
import { schedulesAddExerciseAction, schedulesAddSetAction, schedulesRemoveExerciseAction, schedulesRemoveSetAction, schedulesUpdateExerciseAction } from "../schedules-actions";
import { ExerciseModel } from "../schedules-types"
import { calculateExerciseStats, createClonedExercise, createClonedSet, createResetedExercise } from "../utils";

const useExercise = (
  scheduleId: string,
  year: string,
  weekId: string,
  day: WeekDay,
  trainingId: string,
  initialExercise: ExerciseModel
) => {

  const dispatch = useAppDispatch();

  const exerciseStats = useMemo(
    () => calculateExerciseStats(initialExercise), [initialExercise]
  );

  const updateExerciseName = (updatedName: string) => {
    if (updatedName === initialExercise.name) return;
    dispatch(
      schedulesUpdateExerciseAction(scheduleId, year, weekId, day, trainingId, { ...initialExercise, name: updatedName })
    );
  }

  const cloneLastSet = () => {
    const lastSet = initialExercise.sets[initialExercise.sets.length - 1];
    dispatch(
      schedulesAddSetAction(scheduleId, year, weekId, day, trainingId, initialExercise.exerciseId, createClonedSet(lastSet))
    );
  }

  const removeLastSet = () => {
    const lastSet = initialExercise.sets[initialExercise.sets.length - 1];
    dispatch(
      schedulesRemoveSetAction(scheduleId, year, weekId, day, trainingId, initialExercise.exerciseId, lastSet)
    );
  }

  const cloneExercise = () => {
    dispatch(
      schedulesAddExerciseAction(scheduleId, year, weekId, day, trainingId, createClonedExercise(initialExercise))
    );
  }

  const resetExercise = () => {
    dispatch(
      schedulesUpdateExerciseAction(scheduleId, year, weekId, day, trainingId, createResetedExercise(initialExercise))
    );
  }

  const removeExercise = () => {
    dispatch(
      schedulesRemoveExerciseAction(scheduleId, year, weekId, day, trainingId, initialExercise)
    );
  }

  return {
    updateExerciseName,
    cloneExercise,
    resetExercise,
    removeExercise,
    cloneLastSet,
    removeLastSet,
    exerciseStats,
  }

}

export { useExercise }