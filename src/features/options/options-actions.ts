import { AppOptionsModel } from "./options-types";

type UIOptions = AppOptionsModel["options"]["ui"];
type ScheduleOptions = AppOptionsModel["options"]["schedule"];

const appOptionsCreateAppOptionsAction = (createdAppOptions: AppOptionsModel) => {
  return {
    type: "appOptions/create",
    payload: { createdAppOptions }
  } as const;
}

const appOptionsRemoveAppOptionsAction = (removedAppOptions: AppOptionsModel) => {
  return {
    type: "appOptions/remove",
    payload: { removedAppOptions }
  } as const;
}

const changeOptionViewGridCols = (optionsId: string, newValue: UIOptions["viewGridCols"]) => {
  return {
    type: "appOptions/ui/viewGridCols",
    payload: { optionsId, newValue }
  } as const
}

const changeOptionScheduleSpreadReps = (optionsId: string, newValue: ScheduleOptions["spreadReps"]) => {
  return {
    type: "appOptions/schedule/spreadReps",
    payload: { optionsId, newValue }
  } as const
}

const changeOptionScheduleSpreadWeight = (optionsId: string, newValue: ScheduleOptions["spreadWeight"]) => {
  return {
    type: "appOptions/schedule/spreadWeight",
    payload: { optionsId, newValue }
  } as const
}

const changeOptionScheduleActiveDay = (optionsId: string, newValue: ScheduleOptions["activeDay"]) => {
  return {
    type: "appOptions/schedule/activeDay",
    payload: { optionsId, newValue }
  } as const
}

type AppOptionsActions =
  | ReturnType<typeof appOptionsCreateAppOptionsAction>
  | ReturnType<typeof appOptionsRemoveAppOptionsAction>
  | ReturnType<typeof changeOptionViewGridCols>
  | ReturnType<typeof changeOptionScheduleSpreadReps>
  | ReturnType<typeof changeOptionScheduleSpreadWeight>
  | ReturnType<typeof changeOptionScheduleActiveDay>;

export type { AppOptionsActions };

export {
  appOptionsCreateAppOptionsAction,
  appOptionsRemoveAppOptionsAction,

  changeOptionViewGridCols,
  changeOptionScheduleSpreadReps,
  changeOptionScheduleSpreadWeight,
  changeOptionScheduleActiveDay
};