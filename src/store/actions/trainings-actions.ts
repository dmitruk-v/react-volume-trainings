import { TrainingModel, Day } from "..";
import { ActionCreator } from ".";

type AddTrainingAction = {
  type: "trainings/add",
  payload: {
    day: Day,
    addedTraining: TrainingModel
  }
};

type CloneTrainingAction = {
  type: "trainings/clone",
  payload: {
    day: Day,
    clonedTraining: TrainingModel
  }
};

type UpdateTrainingAction = {
  type: "trainings/update",
  payload: {
    day: Day,
    updatedTraining: TrainingModel
  }
};

type RemoveTrainingAction = {
  type: "trainings/remove",
  payload: {
    day: Day,
    removedTraining: TrainingModel
  }
};

type TrainingActions = AddTrainingAction | CloneTrainingAction | UpdateTrainingAction | RemoveTrainingAction;

const addTrainingAction: ActionCreator<AddTrainingAction> = (
  day: Day,
  addedTraining: TrainingModel
) => {
  return (dispatch) => {
    return {
      type: "trainings/add",
      payload: { day, addedTraining }
    }
  }
}

const cloneTrainingAction: ActionCreator<CloneTrainingAction> = (
  day: Day,
  clonedTraining: TrainingModel
) => {
  return (dispatch) => {
    return {
      type: "trainings/clone",
      payload: { day, clonedTraining }
    }
  }
}

const updateTrainingAction: ActionCreator<UpdateTrainingAction> = (
  day: Day,
  updatedTraining: TrainingModel
) => {
  return (dispatch) => {
    return {
      type: "trainings/update",
      payload: { day, updatedTraining }
    }
  }
}

const removeTrainingAction: ActionCreator<RemoveTrainingAction> = (
  day: Day,
  removedTraining: TrainingModel
) => {
  return (dispatch) => {
    return {
      type: "trainings/remove",
      payload: { day, removedTraining }
    }
  }
}

export type { TrainingActions };
export { addTrainingAction, cloneTrainingAction, updateTrainingAction, removeTrainingAction };