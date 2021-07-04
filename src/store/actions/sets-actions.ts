import { ExSetModel, WeekDay } from "..";

const addSetAction = (day: WeekDay, trainingId: string, exerciseId: string, addedSet: ExSetModel) => {
  return {
    type: "schedule/sets/add",
    payload: { day, trainingId, exerciseId, addedSet }
  } as const;
}

const updateSetAction = (day: WeekDay, trainingId: string, exerciseId: string, updatedSet: ExSetModel) => {
  return {
    type: "schedule/sets/update",
    payload: { day, trainingId, exerciseId, updatedSet }
  } as const;
}

const updateSetWithSpreadAction = (day: WeekDay, trainingId: string, exerciseId: string, spreadedSet: ExSetModel) => {
  return {
    type: "schedule/sets/updateSpread",
    payload: { day, trainingId, exerciseId, spreadedSet }
  } as const;
}

const removeSetAction = (day: WeekDay, trainingId: string, exerciseId: string, removedSet: ExSetModel) => {
  return {
    type: "schedule/sets/remove",
    payload: { day, trainingId, exerciseId, removedSet }
  } as const;
}

type SetActions =
  ReturnType<typeof addSetAction>
  | ReturnType<typeof updateSetAction>
  | ReturnType<typeof updateSetWithSpreadAction>
  | ReturnType<typeof removeSetAction>;

export type { SetActions };
export { addSetAction, updateSetAction, updateSetWithSpreadAction, removeSetAction };