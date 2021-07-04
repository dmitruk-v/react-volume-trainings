import { AppOptionsModel } from "../../store";

const changeOptionViewGridCols = (optionValue: AppOptionsModel["ui"]["viewGridCols"]) => {
  return {
    type: "appOptions/ui/viewGridCols",
    payload: {
      value: optionValue
    }
  } as const
}

const changeOptionScheduleSpreadReps = (optionValue: AppOptionsModel["schedule"]["spreadReps"]) => {
  return {
    type: "appOptions/schedule/spreadReps",
    payload: {
      value: optionValue
    }
  } as const
}

const changeOptionScheduleSpreadWeight = (optionValue: AppOptionsModel["schedule"]["spreadWeight"]) => {
  return {
    type: "appOptions/schedule/spreadWeight",
    payload: {
      value: optionValue
    }
  } as const
}

const changeOptionScheduleActiveDay = (optionValue: AppOptionsModel["schedule"]["activeDay"]) => {
  return {
    type: "appOptions/schedule/activeDay",
    payload: {
      value: optionValue
    }
  } as const
}

type AppOptionsActions =
  ReturnType<typeof changeOptionViewGridCols>
  | ReturnType<typeof changeOptionScheduleSpreadReps>
  | ReturnType<typeof changeOptionScheduleSpreadWeight>
  | ReturnType<typeof changeOptionScheduleActiveDay>;

export type { AppOptionsActions };
export { changeOptionViewGridCols, changeOptionScheduleSpreadReps, changeOptionScheduleSpreadWeight, changeOptionScheduleActiveDay };