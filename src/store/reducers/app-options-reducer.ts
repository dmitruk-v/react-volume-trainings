import { Actions } from "..";

type AppOptionsModel = {
  ui: {
    viewGridCols: number,
  },
  schedule: {
    spreadReps: boolean,
    spreadWeight: boolean
  }
};

const defaultAppOptions: AppOptionsModel = {
  ui: {
    viewGridCols: 4,
  },
  schedule: {
    spreadReps: true,
    spreadWeight: true,
  }
}

const appOptionsReducer = (oldOptions: AppOptionsModel = defaultAppOptions, action: Actions) => {
  switch (action.type) {

    case "exercises/add":
      return oldOptions;

    default:
      return oldOptions;
  }
}

export type { AppOptionsModel };
export { appOptionsReducer };