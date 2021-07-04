import { SetActions } from "./sets-actions";
import { ExerciseActions } from "./exercises-actions";
import { TrainingActions } from "./trainings-actions";
import { TrainingDayActions } from "./days-actions";
import { WeekScheduleActions } from "./schedule-actions";
import { AppOptionsActions } from "./app-options-actions";
import { YearScheduleActions } from "./year-schedule-actions";

type Actions =
  SetActions
  | ExerciseActions
  | TrainingActions
  | TrainingDayActions
  | WeekScheduleActions
  | YearScheduleActions
  | AppOptionsActions;

export * from "./sets-actions";
export * from "./exercises-actions";
export * from "./trainings-actions";
export * from "./days-actions";
export * from "./schedule-actions";
export * from "./app-options-actions";
export * from "./year-schedule-actions";

export type { Actions };