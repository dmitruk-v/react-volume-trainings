import { removeEntryByKey } from "../../store/utils/reducer-utils";
import { DataLoadingStatus } from "../../store";
import { AppOptionsActions } from "./options-actions";
import { AppOptionsModel } from "./options-types";

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

const optionsReducer = (oldState: AppOptionsState = initialState, action: AppOptionsActions) => {
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

export { optionsReducer };