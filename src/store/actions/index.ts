import { AppOptionsActions } from "./app-options-actions";
import { ScheduleActions } from "./schedule-actions";

type Actions =
  | ScheduleActions
  | AppOptionsActions;

export * from "./app-options-actions";
export * from "./schedule-actions";

export type { Actions };