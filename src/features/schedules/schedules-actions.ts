import { WeekDay } from "../../shared/types";
import { TrainingYearModel, ExSetModel, ExerciseModel, TrainingModel, TrainingDayModel, TrainingWeekModel, ScheduleModel, SchedulesModel } from "./schedules-types";

const schedulesLoadAction = () => {
  return {
    type: "schedules/load",
    payload: {}
  } as const;
}

const schedulesLoadSucceededAction = (schedules: SchedulesModel) => {
  return {
    type: "schedules/loadSucceeded",
    payload: { schedules }
  } as const;
}

const schedulesLoadFailedAction = (error: string) => {
  return {
    type: "schedules/loadFailed",
    payload: { error }
  } as const;
}

// --------------------------------------------------------------------------------
// SETS
// --------------------------------------------------------------------------------
const schedulesAddSetAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, addedSet: ExSetModel
) => {
  return {
    type: "schedules/addSet",
    payload: { scheduleId, year, weekId, day, trainingId, exerciseId, addedSet }
  } as const
}

const schedulesUpdateSetAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, updatedSet: ExSetModel
) => {
  return {
    type: "schedules/updateSet",
    payload: { scheduleId, year, weekId, day, trainingId, exerciseId, updatedSet }
  } as const
}

const schedulesUpdateSetWithSpreadAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, updatedSet: ExSetModel
) => {
  return {
    type: "schedules/updateSetWithSpread",
    payload: { scheduleId, year, weekId, day, trainingId, exerciseId, updatedSet }
  } as const
}

const schedulesRemoveSetAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, removedSet: ExSetModel
) => {
  return {
    type: "schedules/removeSet",
    payload: { scheduleId, year, weekId, day, trainingId, exerciseId, removedSet }
  } as const
}

// --------------------------------------------------------------------------------
// EXRCISES
// --------------------------------------------------------------------------------
const schedulesAddExerciseAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, trainingId: string, addedExercise: ExerciseModel
) => {
  return {
    type: "schedules/addExercise",
    payload: { scheduleId, year, weekId, day, trainingId, addedExercise }
  } as const
}

const schedulesUpdateExerciseAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, trainingId: string, updatedExercise: ExerciseModel
) => {
  return {
    type: "schedules/updateExercise",
    payload: { scheduleId, year, weekId, day, trainingId, updatedExercise }
  } as const
}

const schedulesRemoveExerciseAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, trainingId: string, removedExercise: ExerciseModel
) => {
  return {
    type: "schedules/removeExercise",
    payload: { scheduleId, year, weekId, day, trainingId, removedExercise }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING
// --------------------------------------------------------------------------------
const schedulesAddTrainingAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, addedTraining: TrainingModel
) => {
  return {
    type: "schedules/addTraining",
    payload: { scheduleId, year, weekId, day, addedTraining }
  } as const
}

const schedulesUpdateTrainingAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, updatedTraining: TrainingModel
) => {
  return {
    type: "schedules/updateTraining",
    payload: { scheduleId, year, weekId, day, updatedTraining }
  } as const
}

const schedulesRemoveTrainingAction = (
  scheduleId: string, year: string, weekId: string, day: WeekDay, removedTraining: TrainingModel
) => {
  return {
    type: "schedules/removeTraining",
    payload: { scheduleId, year, weekId, day, removedTraining }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING-DAY
// --------------------------------------------------------------------------------
const schedulesUpdateTrainingDayAction = (
  scheduleId: string, year: string, weekId: string, updatedTrainingDay: TrainingDayModel
) => {
  return {
    type: "schedules/updateTrainingDay",
    payload: { scheduleId, year, weekId, updatedTrainingDay }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING-WEEK
// --------------------------------------------------------------------------------
const schedulesUpdateTrainingWeekAction = (
  scheduleId: string, year: string, updatedTrainingWeek: TrainingWeekModel
) => {
  return {
    type: "schedules/updateTrainingWeek",
    payload: { scheduleId, year, updatedTrainingWeek }
  } as const
}

const schedulesCopyTrainingWeekAction = (
  scheduleId: string, fromWeekYear: string, fromWeekId: string, toWeekYear: string, toWeekId: string
) => {
  return {
    type: "schedules/copyTrainingWeek",
    payload: { scheduleId, fromWeekYear, fromWeekId, toWeekYear, toWeekId }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING-YEAR
// --------------------------------------------------------------------------------
const schedulesUpdateTrainingYearAction = (
  scheduleId: string, year: string, updatedTrainingYear: TrainingYearModel
) => {
  return {
    type: "schedules/updateTrainingYear",
    payload: { scheduleId, year, updatedTrainingYear }
  } as const
}

// --------------------------------------------------------------------------------
// SCHEDULE
// --------------------------------------------------------------------------------
const schedulesCreateScheduleAction = (schedule: ScheduleModel) => {
  return {
    type: "schedules/create",
    payload: { schedule }
  } as const;
}

const schedulesRemoveScheduleAction = (removedScheduleId: string) => {
  return {
    type: "schedules/remove",
    payload: { removedScheduleId }
  } as const;
}


type SchedulesActions =
  | ReturnType<typeof schedulesLoadAction>
  | ReturnType<typeof schedulesLoadSucceededAction>
  | ReturnType<typeof schedulesLoadFailedAction>
  // sets
  | ReturnType<typeof schedulesAddSetAction>
  | ReturnType<typeof schedulesUpdateSetAction>
  | ReturnType<typeof schedulesUpdateSetWithSpreadAction>
  | ReturnType<typeof schedulesRemoveSetAction>
  // exercises
  | ReturnType<typeof schedulesAddExerciseAction>
  | ReturnType<typeof schedulesUpdateExerciseAction>
  | ReturnType<typeof schedulesRemoveExerciseAction>
  // training
  | ReturnType<typeof schedulesAddTrainingAction>
  | ReturnType<typeof schedulesUpdateTrainingAction>
  | ReturnType<typeof schedulesRemoveTrainingAction>
  // training-day
  | ReturnType<typeof schedulesUpdateTrainingDayAction>
  // training-week
  | ReturnType<typeof schedulesUpdateTrainingWeekAction>
  | ReturnType<typeof schedulesCopyTrainingWeekAction>
  // training-year
  | ReturnType<typeof schedulesUpdateTrainingYearAction>
  // schedule
  | ReturnType<typeof schedulesCreateScheduleAction>
  | ReturnType<typeof schedulesRemoveScheduleAction>;

export type { SchedulesActions };
export {
  schedulesLoadAction, schedulesLoadSucceededAction, schedulesLoadFailedAction,
  schedulesAddSetAction, schedulesUpdateSetAction, schedulesUpdateSetWithSpreadAction, schedulesRemoveSetAction,
  schedulesAddExerciseAction, schedulesUpdateExerciseAction, schedulesRemoveExerciseAction,
  schedulesAddTrainingAction, schedulesUpdateTrainingAction, schedulesRemoveTrainingAction,
  schedulesUpdateTrainingDayAction,
  schedulesUpdateTrainingWeekAction, schedulesCopyTrainingWeekAction,
  schedulesUpdateTrainingYearAction,
  schedulesCreateScheduleAction, schedulesRemoveScheduleAction,
}