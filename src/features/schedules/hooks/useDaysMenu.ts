import { useCallback } from "react";
import { useAppDispatch } from "../../../shared/hooks";
import { WeekDay } from "../../../shared/types";
import { schedulesUpdateTrainingDayAction } from "../schedules-actions";
import { TrainingDayModel, TrainingWeekModel } from "../schedules-types"
import { createClonedTraining } from "../utils";

const useDaysMenu = (
  scheduleId: string,
  year: string,
  trainingWeek: TrainingWeekModel,
) => {

  const dispatch = useAppDispatch();

  const copyDay = useCallback((fromDay: WeekDay, toDay: WeekDay) => {
    if (trainingWeek === undefined) return;
    const updatedTrainingDay: TrainingDayModel = {
      ...trainingWeek.days[toDay],
      trainings: trainingWeek.days[fromDay].trainings.map(tr => createClonedTraining(tr))
    };
    dispatch(
      schedulesUpdateTrainingDayAction(scheduleId, year, trainingWeek.weekId, updatedTrainingDay)
    );
  }, [scheduleId, year, trainingWeek, dispatch])

  return {
    copyDay
  }

}

export { useDaysMenu }