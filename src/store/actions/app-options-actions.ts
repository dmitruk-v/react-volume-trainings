import { ActionCreator, AppOptionsModel } from "../../store";

type ChangeViewGridColsAction = {
  type: "appOptions/ui/viewGridCols",
  payload: {
    value: number
  };
}

const changeViewGridCols = (optionValue: AppOptionsModel["ui"]["viewGridCols"]): ActionCreator<ChangeViewGridColsAction> => {
  return (dispatch) => {
    return {
      type: "appOptions/ui/viewGridCols",
      payload: {
        value: optionValue
      }
    }
  }