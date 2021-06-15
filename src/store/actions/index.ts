import { SetActions } from "./sets-actions";
import { ExerciseActions } from "./exercises-actions";
import { TrainingActions } from "./trainings-actions";
import { WeekScheduleActions } from "./schedule-actions";
import { AppOptionsActions } from "./app-options-actions";

// type AsyncActionCreator<T extends Actions> = (...args: any) => (dispatch: any) => T;
type ActionCreator<T extends Actions> = (...args: any) => (dispatch: any) => T;
// type ActionCreator<T extends Actions> = () => T;

type Actions = SetActions | ExerciseActions | TrainingActions | WeekScheduleActions | AppOptionsActions;

export * from "./sets-actions";
export * from "./exercises-actions";
export * from "./trainings-actions";
export * from "./schedule-actions";
export * from "./app-options-actions";

export type { Actions, ActionCreator };