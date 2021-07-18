import { Actions } from "../actions";
import { AppOptionsModel } from "../types";
import { WEEK_DAYS } from "../../constants";
import { DataLoadingStatus } from "../";

type AppOptionsState = {
  status: DataLoadingStatus,
  error: string | null,
  data: AppOptionsModel
}

const initialState: AppOptionsState = {
  status: "idle",
  error: null,
  data: {
    ui: {
      viewGridCols: 4,
    },
    schedule: {
      activeDay: WEEK_DAYS[0],
      spreadReps: true,
      spreadWeight: true,
    }
  }
}

const appOptionsReducer = (oldState: AppOptionsState = initialState, action: Actions) => {
  switch (action.type) {

    case "appOptions/ui/viewGridCols":
      return {
        ...oldState,
        data: {
          ...oldState.data,
          ui: {
            ...oldState.data.ui,
            viewGridCols: action.payload.value
          }
        }
      };

    case "appOptions/schedule/spreadReps":
      return {
        ...oldState,
        data: {
          ...oldState.data,
          schedule: {
            ...oldState.data.schedule,
            spreadReps: action.payload.value
          }
        }
      };

    case "appOptions/schedule/spreadWeight":
      return {
        ...oldState,
        data: {
          ...oldState.data,
          schedule: {
            ...oldState.data.schedule,
            spreadWeight: action.payload.value
          }
        }
      };

    case "appOptions/schedule/activeDay":
      return {
        ...oldState,
        data: {
          ...oldState.data,
          schedule: {
            ...oldState.data.schedule,
            activeDay: action.payload.value
          }
        }
      };

    default:
      return oldState;
  }
}

export type { AppOptionsModel };
export { appOptionsReducer };