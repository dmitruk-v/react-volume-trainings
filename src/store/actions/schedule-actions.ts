import { TrainingYearModel, WeekDay, ExSetModel, ExerciseModel, TrainingModel, TrainingDayModel, TrainingWeekModel, ScheduleModel } from "../types";

const scheduleCreateAction = (schedule: ScheduleModel) => {
  return {
    type: "schedule/create",
    payload: { schedule }
  } as const;
}

const scheduleLoadAction = () => {
  return {
    type: "schedule/load",
    payload: {}
  } as const;
}

const scheduleLoadSucceededAction = (schedule: ScheduleModel) => {
  return {
    type: "schedule/loadSucceeded",
    payload: { schedule }
  } as const;
}

const scheduleLoadFailedAction = (error: string) => {
  return {
    type: "schedule/loadFailed",
    payload: { error }
  } as const;
}

// --------------------------------------------------------------------------------
// SETS
// --------------------------------------------------------------------------------
const scheduleAddSetAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, addedSet: ExSetModel
) => {
  return {
    type: "schedule/addSet",
    payload: { year, weekId, day, trainingId, exerciseId, addedSet }
  } as const
}

const scheduleUpdateSetAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, updatedSet: ExSetModel
) => {
  return {
    type: "schedule/updateSet",
    payload: { year, weekId, day, trainingId, exerciseId, updatedSet }
  } as const
}

const scheduleUpdateSetWithSpreadAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, updatedSet: ExSetModel
) => {
  return {
    type: "schedule/updateSetWithSpread",
    payload: { year, weekId, day, trainingId, exerciseId, updatedSet }
  } as const
}

const scheduleRemoveSetAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, removedSet: ExSetModel
) => {
  return {
    type: "schedule/removeSet",
    payload: { year, weekId, day, trainingId, exerciseId, removedSet }
  } as const
}

// --------------------------------------------------------------------------------
// EXRCISES
// --------------------------------------------------------------------------------
const scheduleAddExerciseAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, addedExercise: ExerciseModel
) => {
  return {
    type: "schedule/addExercise",
    payload: { year, weekId, day, trainingId, addedExercise }
  } as const
}

const scheduleUpdateExerciseAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, updatedExercise: ExerciseModel
) => {
  return {
    type: "schedule/updateExercise",
    payload: { year, weekId, day, trainingId, updatedExercise }
  } as const
}

const scheduleRemoveExerciseAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, removedExercise: ExerciseModel
) => {
  return {
    type: "schedule/removeExercise",
    payload: { year, weekId, day, trainingId, removedExercise }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING
// --------------------------------------------------------------------------------
const scheduleAddTrainingAction = (
  year: string, weekId: string, day: WeekDay, addedTraining: TrainingModel
) => {
  return {
    type: "schedule/addTraining",
    payload: { year, weekId, day, addedTraining }
  } as const
}

const scheduleUpdateTrainingAction = (
  year: string, weekId: string, day: WeekDay, updatedTraining: TrainingModel
) => {
  return {
    type: "schedule/updateTraining",
    payload: { year, weekId, day, updatedTraining }
  } as const
}

const scheduleRemoveTrainingAction = (
  year: string, weekId: string, day: WeekDay, removedTraining: TrainingModel
) => {
  return {
    type: "schedule/removeTraining",
    payload: { year, weekId, day, removedTraining }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING-DAY
// --------------------------------------------------------------------------------
const scheduleUpdateTrainingDayAction = (
  year: string, weekId: string, updatedTrainingDay: TrainingDayModel
) => {
  return {
    type: "schedule/updateTrainingDay",
    payload: { year, weekId, updatedTrainingDay }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING-WEEK
// --------------------------------------------------------------------------------
const scheduleUpdateTrainingWeekAction = (
  year: string, updatedTrainingWeek: TrainingWeekModel
) => {
  return {
    type: "schedule/updateTrainingWeek",
    payload: { year, updatedTrainingWeek }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING-YEAR
// --------------------------------------------------------------------------------
const scheduleUpdateTrainingYearAction = (
  year: string, updatedTrainingYear: TrainingYearModel
) => {
  return {
    type: "schedule/updateTrainingYear",
    payload: { year, updatedTrainingYear }
  } as const
}


type ScheduleActions =
  | ReturnType<typeof scheduleCreateAction>
  | ReturnType<typeof scheduleLoadAction>
  | ReturnType<typeof scheduleLoadSucceededAction>
  | ReturnType<typeof scheduleLoadFailedAction>
  // sets
  | ReturnType<typeof scheduleAddSetAction>
  | ReturnType<typeof scheduleUpdateSetAction>
  | ReturnType<typeof scheduleUpdateSetWithSpreadAction>
  | ReturnType<typeof scheduleRemoveSetAction>
  // exercises
  | ReturnType<typeof scheduleAddExerciseAction>
  | ReturnType<typeof scheduleUpdateExerciseAction>
  | ReturnType<typeof scheduleRemoveExerciseAction>
  // training
  | ReturnType<typeof scheduleAddTrainingAction>
  | ReturnType<typeof scheduleUpdateTrainingAction>
  | ReturnType<typeof scheduleRemoveTrainingAction>
  // training-day
  | ReturnType<typeof scheduleUpdateTrainingDayAction>
  // training-week
  | ReturnType<typeof scheduleUpdateTrainingWeekAction>
  // training-year
  | ReturnType<typeof scheduleUpdateTrainingYearAction>;

export type { ScheduleActions };
export {
  scheduleCreateAction,
  scheduleLoadAction, scheduleLoadSucceededAction, scheduleLoadFailedAction,
  scheduleAddSetAction, scheduleUpdateSetAction, scheduleUpdateSetWithSpreadAction, scheduleRemoveSetAction,
  scheduleAddExerciseAction, scheduleUpdateExerciseAction, scheduleRemoveExerciseAction,
  scheduleAddTrainingAction, scheduleUpdateTrainingAction, scheduleRemoveTrainingAction,
  scheduleUpdateTrainingDayAction,
  scheduleUpdateTrainingWeekAction,
  scheduleUpdateTrainingYearAction,
}