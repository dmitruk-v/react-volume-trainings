import { useMemo } from "react";
import { useAppDispatch } from "../../../shared/hooks";
import { WeekDay } from "../../../shared/types";
import { schedulesAddTrainingAction, schedulesRemoveTrainingAction, schedulesUpdateTrainingAction } from "../schedules-actions";
import { TrainingModel } from "../schedules-types"
import { calculateTrainingStats, createClonedTraining, createResetedTraining } from "../utils";

const useTraining = (
  scheduleId: string,
  year: string,
  weekId: string,
  day: WeekDay,
  initialTraining: TrainingModel
) => {

  const dispatch = useAppDispatch();

  const trainingStats = useMemo(
    () => calculateTrainingStats(initialTraining), [initialTraining]
  );

  const cloneTraining = () => {
    dispatch(
      schedulesAddTrainingAction(scheduleId, year, weekId, day, createClonedTraining(initialTraining))
    );
  }

  const removeTraining = () => {
    dispatch(
      schedulesRemoveTrainingAction(scheduleId, year, weekId, day, initialTraining)
    );
  }

  const resetTraining = () => {
    dispatch(
      schedulesUpdateTrainingAction(scheduleId, year, weekId, day, createResetedTraining(initialTraining))
    );
  }

  return {
    trainingStats,
    cloneTraining,
    resetTraining,
    removeTraining,
  }
}

export { useTraining }