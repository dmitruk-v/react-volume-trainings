import { TrainingModel } from "..";
import { ActionCreator } from ".";

type AddTrainingAction = {
  type: "trainings/add",
  payload: {
    addedTraining: TrainingModel
  }
};

type UpdateTrainingAction = {
  type: "trainings/update",
  payload: {
    updatedTraining: TrainingModel
  }
};

type RemoveTrainingAction = {
  type: "trainings/remove",
  payload: {
    removedTraining: TrainingModel
  }
};

type TrainingActions = AddTrainingAction | UpdateTrainingAction | RemoveTrainingAction;

const addTrainingAction = (addedTraining: TrainingModel): ActionCreator<AddTrainingAction> => {
  return (dispatch) => {
    return {
      type: "trainings/add",
      payload: { addedTraining }
    }
  }
}

const updateTrainingAction = (updatedTraining: TrainingModel): ActionCreator<UpdateTrainingAction> => {
  return (dispatch) => {
    return {
      type: "trainings/update",
      payload: { updatedTraining }
    }
  }
}

const removeTrainingAction = (removedTraining: TrainingModel): ActionCreator<RemoveTrainingAction> => {
  return (dispatch) => {
    return {
      type: "trainings/remove",
      payload: { removedTraining }
    }
  }
}

export type { TrainingActions };
export { addTrainingAction, updateTrainingAction, removeTrainingAction };