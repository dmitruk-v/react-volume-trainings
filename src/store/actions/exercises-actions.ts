import { ExerciseModel } from "..";
import { ActionCreator } from ".";

type CommonExercisePayload = {
  payload: {
    trainingId: string
  }
}

type AddExerciseAction = CommonExercisePayload & {
  type: "exercises/add",
  payload: {
    addedExercise: ExerciseModel
  }
};

type UpdateExerciseAction = CommonExercisePayload & {
  type: "exercises/update",
  payload: {
    updatedExercise: ExerciseModel
  }
};

type RemoveExerciseAction = CommonExercisePayload & {
  type: "exercises/remove",
  payload: {
    removedExercise: ExerciseModel
  }
};

type ExerciseActions = AddExerciseAction | UpdateExerciseAction | RemoveExerciseAction;

const addExerciseAction = (trainingId: string, addedExercise: ExerciseModel): ActionCreator<AddExerciseAction> => {
  return (dispatch) => {
    return {
      type: "exercises/add",
      payload: { trainingId, addedExercise }
    }
  }
}

const updateExerciseAction = (trainingId: string, updatedExercise: ExerciseModel): ActionCreator<UpdateExerciseAction> => {
  return (dispatch) => {
    return {
      type: "exercises/update",
      payload: { trainingId, updatedExercise }
    }
  }
}

const removeExerciseAction = (trainingId: string, removedExercise: ExerciseModel): ActionCreator<RemoveExerciseAction> => {
  return (dispatch) => {
    return {
      type: "exercises/remove",
      payload: { trainingId, removedExercise }
    }
  }
}

export type { ExerciseActions };
export { addExerciseAction, updateExerciseAction, removeExerciseAction };