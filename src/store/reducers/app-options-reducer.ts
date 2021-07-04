import { Actions, WeekDay } from "..";
import { WEEK_DAYS } from "../../constants";

type AppOptionsModel = {
  ui: {
    viewGridCols: number,
  },
  schedule: {
    activeDay: WeekDay,
    spreadReps: boolean,
    spreadWeight: boolean
  }
};

const defaultAppOptions: AppOptionsModel = {
  ui: {
    viewGridCols: 4,
  },
  schedule: {
    activeDay: WEEK_DAYS[0],
    spreadReps: true,
    spreadWeight: true,
  }
}

const appOptionsReducer = (oldOptions: AppOptionsModel = defaultAppOptions, action: Actions) => {
  switch (action.type) {

    case "appOptions/ui/viewGridCols":
      return {
        ...oldOptions,
        ui: {
          ...oldOptions.ui,
          viewGridCols: action.payload.value
        }
      };

    case "appOptions/schedule/spreadReps":
      return {
        ...oldOptions,
        schedule: {
          ...oldOptions.schedule,
          spreadReps: action.payload.value
        }
      };

    case "appOptions/schedule/spreadWeight":
      return {
        ...oldOptions,
        schedule: {
          ...oldOptions.schedule,
          spreadWeight: action.payload.value
        }
      };

    case "appOptions/schedule/activeDay":
      return {
        ...oldOptions,
        schedule: {
          ...oldOptions.schedule,
          activeDay: action.payload.value
        }
      };

    default:
      return oldOptions;
  }
}

export type { AppOptionsModel };
export { appOptionsReducer };