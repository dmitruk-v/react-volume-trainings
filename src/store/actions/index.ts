import { AppOptionsActions } from "./app-options-actions";
import { SchedulesActions } from "./schedule-actions";
import { UsersActions } from "./users-actions";
import { SelectedUserActions } from "./selected-user-actions";

type Actions =
  | SchedulesActions
  | AppOptionsActions
  | UsersActions
  | SelectedUserActions;

export * from "./app-options-actions";
export * from "./schedule-actions";
export * from "./users-actions";
export * from "./selected-user-actions";

export type { Actions };