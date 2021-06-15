import { ExerciseModel } from "..";
import { ActionCreator } from ".";

type CommonExerciseActionPayload = {
  payload: {
    trainingId: string
  }
}

type AddExerciseAction = CommonExerciseActionPayload & {
  type: "exercises/add",
  payload: {
    addedExercise: ExerciseModel
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

type ExerciseActions = AddExerciseAction | UpdateExerciseAction | RemoveExerciseAction;

const addExerciseAction: ActionCreator<AddExerciseAction> = (
  trainingId: string,
  addedExercise: ExerciseModel
) => {
  return (dispatch) => {
    return {
      type: "exercises/add",
      payload: { trainingId, addedExercise }
    }
  }
}

const updateExerciseAction: ActionCreator<UpdateExerciseAction> = (
  trainingId: string,
  updatedExercise: ExerciseModel
) => {
  return (dispatch) => {
    return {
      type: "exercises/update",
      payload: { trainingId, updatedExercise }
    }
  }
}

const removeExerciseAction: ActionCreator<RemoveExerciseAction> = (
  trainingId: string,
  removedExercise: ExerciseModel
) => {
  return (dispatch) => {
    return {
      type: "exercises/remove",
      payload: { trainingId, removedExercise }
    }
  }
}

export type { ExerciseActions };
export { addExerciseAction, updateExerciseAction, removeExerciseAction };