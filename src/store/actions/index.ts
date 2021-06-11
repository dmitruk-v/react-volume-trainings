import { SetActions } from "./sets-actions";
import { ExerciseActions } from "./exercises-actions";
import { TrainingActions } from "./trainings-actions";
import { WeekScheduleActions } from "./schedule-actions";

export * from "./sets-actions";
export * from "./exercises-actions";
export * from "./trainings-actions";
export * from "./schedule-actions";

type Actions = SetActions | ExerciseActions | TrainingActions | WeekScheduleActions;

type ActionCreator<T extends Actions> = (dispatch: any) => T;

export type { Actions, ActionCreator };