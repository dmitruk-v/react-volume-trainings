import { WeekDay } from "./date-types";

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

export type { AppOptionsModel };