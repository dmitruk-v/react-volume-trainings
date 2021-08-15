import { WeekDay } from "../../shared/types";

type AppOptionsModel = {
  optionsId: string,
  options: {
    ui: {
      viewGridCols: number,
    },
    schedule: {
      trainingsCount: 0,
      exercisesCount: 1,
      setsCount: 3,
      exerciseName: "Exercise",
      reps: 0,
      weight: 0
      activeDay: WeekDay,
      spreadReps: boolean,
      spreadWeight: boolean,
    }
  }
};

export type { AppOptionsModel };