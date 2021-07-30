import { Actions } from "../actions";
import { AppOptionsModel } from "../types";
import { DataLoadingStatus } from "../";
import { removeEntryByKey } from "./reducers-utils";

type AppOptionsState = {
  status: DataLoadingStatus,
  error: string | null,
  data: {
    [optionsId: string]: AppOptionsModel
  }
}

const initialState: AppOptionsState = {
  status: "idle",
  error: null,
  data: {}
}

const appOptionsReducer = (oldState: AppOptionsState = initialState, action: Actions) => {
  switch (action.type) {

    case "appOptions/create": {
      const { createdAppOptions } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [createdAppOptions.optionsId]: createdAppOptions,
        }
      }
    }

    case "appOptions/remove": {
      const { removedAppOptions } = action.payload;
      return {
        ...oldState,
        data: removeEntryByKey(oldState.data, removedAppOptions.optionsId),
      }
    }

    case "appOptions/ui/viewGridCols": {
      const { optionsId, newValue } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [optionsId]: {
            ...oldState.data[optionsId],
            options: {
              ...oldState.data[optionsId].options,
              ui: {
                ...oldState.data[optionsId].options.ui,
                viewGridCols: newValue,
              }
            }
          }
        }
      };
    }

    case "appOptions/schedule/spreadReps": {
      const { optionsId, newValue } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [optionsId]: {
            ...oldState.data[optionsId],
            options: {
              ...oldState.data[optionsId].options,
              schedule: {
                ...oldState.data[optionsId].options.schedule,
                spreadReps: newValue,
              }
            }
          }
        }
      };
    }


    case "appOptions/schedule/spreadWeight": {
      const { optionsId, newValue } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [optionsId]: {
            ...oldState.data[optionsId],
            options: {
              ...oldState.data[optionsId].options,
              schedule: {
                ...oldState.data[optionsId].options.schedule,
                spreadWeight: newValue,
              }
            }
          }
        }
      };
    }

    case "appOptions/schedule/activeDay": {
      const { optionsId, newValue } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [optionsId]: {
            ...oldState.data[optionsId],
            options: {
              ...oldState.data[optionsId].options,
              schedule: {
                ...oldState.data[optionsId].options.schedule,
                activeDay: newValue,
              }
            }
          }
        }
      };
    }

    default:
      return oldState;
  }
}

export type { AppOptionsModel };
export { appOptionsReducer };