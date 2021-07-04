import { TrainingModel, WeekDay } from "..";

const addTrainingAction = (day: WeekDay, addedTraining: TrainingModel) => {
  return {
    type: "schedule/trainings/add",
    payload: { day, addedTraining }
  } as const
}

const updateTrainingAction = (day: WeekDay, updatedTraining: TrainingModel) => {
  return {
    type: "schedule/trainings/update",
    payload: { day, updatedTraining }
  } as const
}

const removeTrainingAction = (day: WeekDay, removedTraining: TrainingModel) => {
  return {
    type: "schedule/trainings/remove",
    payload: { day, removedTraining }
  } as const
}

type TrainingActions =
  ReturnType<typeof addTrainingAction>
  | ReturnType<typeof updateTrainingAction>
  | ReturnType<typeof removeTrainingAction>;

export type { TrainingActions };
export { addTrainingAction, updateTrainingAction, removeTrainingAction };