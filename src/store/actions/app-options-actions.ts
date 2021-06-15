import { ActionCreator, AppOptionsModel, Day } from "../../store";

type ChangeOptionViewGridColsAction = {
  type: "appOptions/ui/viewGridCols",
  payload: {
    value: number
  };
}

type ChangeOptionScheduleSpreadRepsAction = {
  type: "appOptions/schedule/spreadReps",
  payload: {
    value: boolean
  };
}

type ChangeOptionScheduleSpreadWeightAction = {
  type: "appOptions/schedule/spreadWeight",
  payload: {
    value: boolean
  };
}

type ChangeOptionScheduleActiveDayAction = {
  type: "appOptions/schedule/activeDay",
  payload: {
    value: Day
  };
}

type AppOptionsActions = ChangeOptionViewGridColsAction
  | ChangeOptionScheduleSpreadRepsAction
  | ChangeOptionScheduleSpreadWeightAction
  | ChangeOptionScheduleActiveDayAction;

const changeViewGridCols: ActionCreator<ChangeOptionViewGridColsAction> = (
  optionValue: AppOptionsModel["ui"]["viewGridCols"]
) => {
  return (dispatch) => {
    return {
      type: "appOptions/ui/viewGridCols",
      payload: {
        value: optionValue
      }
    }
  }
}

const changeScheduleSpreadReps: ActionCreator<ChangeOptionScheduleSpreadRepsAction> = (
  optionValue: AppOptionsModel["schedule"]["spreadReps"]
) => {
  return (dispatch) => {
    return {
      type: "appOptions/schedule/spreadReps",
      payload: {
        value: optionValue
      }
    }
  }
}

const changeScheduleSpreadWeight: ActionCreator<ChangeOptionScheduleSpreadWeightAction> = (
  optionValue: AppOptionsModel["schedule"]["spreadWeight"]
) => {
  return (dispatch) => {
    return {
      type: "appOptions/schedule/spreadWeight",
      payload: {
        value: optionValue
      }
    }
  }
}

const changeScheduleActiveDay: ActionCreator<ChangeOptionScheduleActiveDayAction> = (
  optionValue: AppOptionsModel["schedule"]["activeDay"]
) => {
  return (dispatch) => {
    return {
      type: "appOptions/schedule/activeDay",
      payload: {
        value: optionValue
      }
    }
  }
}

export type { AppOptionsActions };
export { changeViewGridCols, changeScheduleSpreadReps, changeScheduleSpreadWeight, changeScheduleActiveDay };