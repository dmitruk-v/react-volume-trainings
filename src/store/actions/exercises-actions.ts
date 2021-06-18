import { ExerciseModel, Day } from "..";
import { ActionCreator } from ".";

type CommonExerciseActionPayload = {
  payload: {
    day: Day,
    trainingId: string
  }
}

type AddExerciseAction = CommonExerciseActionPayload & {
  type: "exercises/add",
  payload: {
    addedExercise: ExerciseModel
  }
};

type CloneExerciseAction = CommonExerciseActionPayload & {
  type: "exercises/clone",
  payload: {
    clonedExercise: ExerciseModel
  }
};

type UpdateExerciseAction = CommonExerciseActionPayload & {
  type: "exercises/update",
  payload: {
    updatedExercise: ExerciseModel
  }
};

type RemoveExerciseAction = CommonExerciseActionPayload & {
  type: "exercises/remove",
  payload: {
    removedExercise: ExerciseModel
  }
};

type ExerciseActions = AddExerciseAction | CloneExerciseAction | UpdateExerciseAction | RemoveExerciseAction;

const addExerciseAction: ActionCreator<AddExerciseAction> = (
  day: Day,
  trainingId: string,
  addedExercise: ExerciseModel
) => {
  return (dispatch) => {
    return {
      type: "exercises/add",
      payload: { day, trainingId, addedExercise }
    }
  }
}

const cloneExerciseAction: ActionCreator<CloneExerciseAction> = (
  day: Day,
  trainingId: string,
  clonedExercise: ExerciseModel
) => {
  return (dispatch) => {
    return {
      type: "exercises/clone",
      payload: { day, trainingId, clonedExercise }
    }
  }
}

const updateExerciseAction: ActionCreator<UpdateExerciseAction> = (
  day: Day,
  trainingId: string,
  updatedExercise: ExerciseModel
) => {
  return (dispatch) => {
    return {
      type: "exercises/update",
      payload: { day, trainingId, updatedExercise }
    }
  }
}

const removeExerciseAction: ActionCreator<RemoveExerciseAction> = (
  day: Day,
  trainingId: string,
  removedExercise: ExerciseModel
) => {
  return (dispatch) => {
    return {
      type: "exercises/remove",
      payload: { day, trainingId, removedExercise }
    }
  }
}

export type { ExerciseActions };
export { addExerciseAction, cloneExerciseAction, updateExerciseAction, removeExerciseAction };