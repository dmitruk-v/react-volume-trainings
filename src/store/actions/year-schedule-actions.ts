import { YearScheduleModel, WeekDay, ExSetModel, ExerciseModel, TrainingModel, TrainingDayModel, TrainingWeekModel } from "../types";

const yearScheduleLoadAction = (yearSchedule: YearScheduleModel) => {
  return {
    type: "yearSchedule/load",
    payload: { yearSchedule }
  } as const;
}

// --------------------------------------------------------------------------------
// SETS
// --------------------------------------------------------------------------------
const yearScheduleAddSetAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, addedSet: ExSetModel
) => {
  return {
    type: "yearSchedule/addSet",
    payload: { year, weekId, day, trainingId, exerciseId, addedSet }
  } as const
}

const yearScheduleUpdateSetAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, updatedSet: ExSetModel
) => {
  return {
    type: "yearSchedule/updateSet",
    payload: { year, weekId, day, trainingId, exerciseId, updatedSet }
  } as const
}

const yearScheduleUpdateSetWithSpreadAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, updatedSet: ExSetModel
) => {
  return {
    type: "yearSchedule/updateSetWithSpread",
    payload: { year, weekId, day, trainingId, exerciseId, updatedSet }
  } as const
}

const yearScheduleRemoveSetAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, exerciseId: string, removedSet: ExSetModel
) => {
  return {
    type: "yearSchedule/removeSet",
    payload: { year, weekId, day, trainingId, exerciseId, removedSet }
  } as const
}

// --------------------------------------------------------------------------------
// EXRCISES
// --------------------------------------------------------------------------------
const yearScheduleAddExerciseAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, addedExercise: ExerciseModel
) => {
  return {
    type: "yearSchedule/addExercise",
    payload: { year, weekId, day, trainingId, addedExercise }
  } as const
}

const yearScheduleUpdateExerciseAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, updatedExercise: ExerciseModel
) => {
  return {
    type: "yearSchedule/updateExercise",
    payload: { year, weekId, day, trainingId, updatedExercise }
  } as const
}

const yearScheduleRemoveExerciseAction = (
  year: string, weekId: string, day: WeekDay, trainingId: string, removedExercise: ExerciseModel
) => {
  return {
    type: "yearSchedule/removeExercise",
    payload: { year, weekId, day, trainingId, removedExercise }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING
// --------------------------------------------------------------------------------
const yearScheduleAddTrainingAction = (
  year: string, weekId: string, day: WeekDay, addedTraining: TrainingModel
) => {
  return {
    type: "yearSchedule/addTraining",
    payload: { year, weekId, day, addedTraining }
  } as const
}

const yearScheduleUpdateTrainingAction = (
  year: string, weekId: string, day: WeekDay, updatedTraining: TrainingModel
) => {
  return {
    type: "yearSchedule/updateTraining",
    payload: { year, weekId, day, updatedTraining }
  } as const
}

const yearScheduleRemoveTrainingAction = (
  year: string, weekId: string, day: WeekDay, removedTraining: TrainingModel
) => {
  return {
    type: "yearSchedule/removeTraining",
    payload: { year, weekId, day, removedTraining }
  } as const
}

// --------------------------------------------------------------------------------
// TRAINING-DAY
// --------------------------------------------------------------------------------
const yearScheduleUpdateTrainingDayAction = (
  year: string, weekId: string, updatedTrainingDay: TrainingDayModel
) => {
  return {
    type: "yearSchedule/updateTrainingDay",
    payload: { year, weekId, updatedTrainingDay }
  } as const
}

// --------------------------------------------------------------------------------
// WEEK-SCHEDULE
// --------------------------------------------------------------------------------
const yearScheduleUpdateTrainingWeekAction = (
  year: string, updatedWeekSchedule: TrainingWeekModel
) => {
  return {
    type: "yearSchedule/updateWeekSchedule",
    payload: { year, updatedWeekSchedule }
  } as const
}


type YearScheduleActions =
  | ReturnType<typeof yearScheduleLoadAction>
  // sets
  | ReturnType<typeof yearScheduleAddSetAction>
  | ReturnType<typeof yearScheduleUpdateSetAction>
  | ReturnType<typeof yearScheduleUpdateSetWithSpreadAction>
  | ReturnType<typeof yearScheduleRemoveSetAction>
  // exercises
  | ReturnType<typeof yearScheduleAddExerciseAction>
  | ReturnType<typeof yearScheduleUpdateExerciseAction>
  | ReturnType<typeof yearScheduleRemoveExerciseAction>
  // training
  | ReturnType<typeof yearScheduleAddTrainingAction>
  | ReturnType<typeof yearScheduleUpdateTrainingAction>
  | ReturnType<typeof yearScheduleRemoveTrainingAction>
  // training-day
  | ReturnType<typeof yearScheduleUpdateTrainingDayAction>
  // training-week
  | ReturnType<typeof yearScheduleUpdateTrainingWeekAction>;

export type { YearScheduleActions };
export {
  yearScheduleLoadAction,
  yearScheduleAddSetAction, yearScheduleUpdateSetAction, yearScheduleUpdateSetWithSpreadAction, yearScheduleRemoveSetAction,
  yearScheduleAddExerciseAction, yearScheduleUpdateExerciseAction, yearScheduleRemoveExerciseAction,
  yearScheduleAddTrainingAction, yearScheduleUpdateTrainingAction, yearScheduleRemoveTrainingAction,
  yearScheduleUpdateTrainingDayAction,
  yearScheduleUpdateTrainingWeekAction
}