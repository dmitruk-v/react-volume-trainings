import { AppOptionsActions } from "./app-options-actions";
import { ScheduleActions } from "./schedule-actions";
import { UsersActions } from "./users-actions";

type Actions =
  | ScheduleActions
  | AppOptionsActions
  | UsersActions;

export * from "./app-options-actions";
export * from "./schedule-actions";
export * from "./users-actions";

export type { Actions };