import { AppOptionsActions } from "./app-options-actions";
import { YearScheduleActions } from "./year-schedule-actions";

type Actions =
  | YearScheduleActions
  | AppOptionsActions;

export * from "./app-options-actions";
export * from "./year-schedule-actions";

export type { Actions };