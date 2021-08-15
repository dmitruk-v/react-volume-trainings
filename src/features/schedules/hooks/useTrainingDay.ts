import { useAppDispatch } from "../../../shared/hooks";
import { schedulesAddTrainingAction } from "../schedules-actions";
import { TrainingDayModel } from "../schedules-types"
import { createTraining } from "../utils";

const useTrainingDay = (
  scheduleId: string,
  year: string,
  weekId: string,
  initialTrainingDay: TrainingDayModel
) => {

  const dispatch = useAppDispatch();

  const addTraining = () => {
    dispatch(
      schedulesAddTrainingAction(scheduleId, year, weekId, initialTrainingDay.day, createTraining())
    )
  }

  return {
    addTraining
  }

}

export { useTrainingDay }