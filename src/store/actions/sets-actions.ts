import { ExSetModel, Day } from "..";
import { ActionCreator } from ".";

type CommonSetActionPayload = {
  payload: {
    day: Day,
    trainingId: string,
    exerciseId: string,
  }
}

type AddSetAction = CommonSetActionPayload & {
  type: "sets/add",
  payload: {
    addedSet: ExSetModel
  }
};

type UpdateSetAction = CommonSetActionPayload & {
  type: "sets/update",
  payload: {
    updatedSet: ExSetModel
  }
};

type UpdateSetWithSpreadAction = CommonSetActionPayload & {
  type: "sets/updateSpread",
  payload: {
    updatedSet: ExSetModel
  }
};

type RemoveSetAction = CommonSetActionPayload & {
  type: "sets/remove",
  payload: {
    removedSet: ExSetModel
  }
};

type SetActions = AddSetAction | UpdateSetAction | UpdateSetWithSpreadAction | RemoveSetAction;

const addSetAction: ActionCreator<AddSetAction> = (
  day: Day,
  trainingId: string,
  exerciseId: string,
  addedSet: ExSetModel
) => {
  return (dispatch) => {
    return {
      type: "sets/add",
      payload: { day, trainingId, exerciseId, addedSet }
    }
  }
}

const updateSetAction: ActionCreator<UpdateSetAction> = (
  day: Day,
  trainingId: string,
  exerciseId: string,
  updatedSet: ExSetModel
) => {
  return (dispatch) => {
    return {
      type: "sets/update",
      payload: { day, trainingId, exerciseId, updatedSet }
    }
  }
}

const updateSetWithSpreadAction: ActionCreator<UpdateSetWithSpreadAction> = (
  day: Day,
  trainingId: string,
  exerciseId: string,
  updatedSet: ExSetModel
) => {
  return (dispatch) => {
    return {
      type: "sets/updateSpread",
      payload: { day, trainingId, exerciseId, updatedSet }
    }
  }
}

const removeSetAction: ActionCreator<RemoveSetAction> = (
  day: Day,
  trainingId: string,
  exerciseId: string,
  removedSet: ExSetModel
) => {
  return (dispatch) => {
    return {
      type: "sets/remove",
      payload: { day, trainingId, exerciseId, removedSet }
    }
  }
}

export type { SetActions };
export { addSetAction, updateSetAction, updateSetWithSpreadAction, removeSetAction };