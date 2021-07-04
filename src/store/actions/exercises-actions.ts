import { ExerciseModel, WeekDay } from "..";

const addExerciseAction = (day: WeekDay, trainingId: string, addedExercise: ExerciseModel) => {
  return {
    type: "schedule/exercises/add",
    payload: { day, trainingId, addedExercise }
  } as const
}

const updateExerciseAction = (day: WeekDay, trainingId: string, updatedExercise: ExerciseModel) => {
  return {
    type: "schedule/exercises/update",
    payload: { day, trainingId, updatedExercise }
  } as const
}

const removeExerciseAction = (day: WeekDay, trainingId: string, removedExercise: ExerciseModel) => {
  return {
    type: "schedule/exercises/remove",
    payload: { day, trainingId, removedExercise }
  } as const
}

type ExerciseActions =
  ReturnType<typeof addExerciseAction>
  | ReturnType<typeof updateExerciseAction>
  | ReturnType<typeof removeExerciseAction>;

export type { ExerciseActions };
export { addExerciseAction, updateExerciseAction, removeExerciseAction };