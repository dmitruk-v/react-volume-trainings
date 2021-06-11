import { ExSetModel, Day } from "..";
import { ActionCreator } from ".";

type CommonSetPayload = {
  payload: {
    day: Day,
    trainingId: string,
    exerciseId: string,
  }
}

type AddSetAction = CommonSetPayload & {
  type: "sets/add",
  payload: {
    addedSet: ExSetModel
  }
};

type UpdateSetAction = CommonSetPayload & {
  type: "sets/update",
  payload: {
    updatedSet: ExSetModel
  }
};

type UpdateSetWithSpreadAction = CommonSetPayload & {
  type: "sets/updateSpread",
  payload: {
    updatedSet: ExSetModel
  }
};

type RemoveSetAction = CommonSetPayload & {
  type: "sets/remove",
  payload: {
    removedSet: ExSetModel
  }
};

type SetActions = AddSetAction | UpdateSetAction | UpdateSetWithSpreadAction | RemoveSetAction;

const addSetAction = (day: Day, trainingId: string, exerciseId: string, addedSet: ExSetModel): ActionCreator<AddSetAction> => {
  return (dispatch) => {
    return {
      type: "sets/add",
      payload: { day, trainingId, exerciseId, addedSet }
    }
  }
}

const updateSetAction = (day: Day, trainingId: string, exerciseId: string, updatedSet: ExSetModel): ActionCreator<UpdateSetAction> => {
  return (dispatch) => {
    return {
      type: "sets/update",
      payload: { day, trainingId, exerciseId, updatedSet }
    }
  }
}

const updateSetWithSpreadAction = (day: Day, trainingId: string, exerciseId: string, updatedSet: ExSetModel): ActionCreator<UpdateSetWithSpreadAction> => {
  return (dispatch) => {
    return {
      type: "sets/updateSpread",
      payload: { day, trainingId, exerciseId, updatedSet }
    }
  }
}

const removeSetAction = (day: Day, trainingId: string, exerciseId: string, removedSet: ExSetModel): ActionCreator<RemoveSetAction> => {
  return (dispatch) => {
    return {
      type: "sets/remove",
      payload: { day, trainingId, exerciseId, removedSet }
    }
  }
}

export type { SetActions };
export { addSetAction, updateSetAction, updateSetWithSpreadAction, removeSetAction };