import { WeekDay } from "../../shared/types";
import { CYCLES } from "./schedules-constants";

type SchedulesModel = {
  [scheduleId: string]: ScheduleModel
}

// type SchedulesRootModel = {
//   schedules: {
//     [scheduleId: string]: ScheduleModel
//   },
//   ids: string[]
// }

type ScheduleId = string;
type ScheduleModel = {
  scheduleId: ScheduleId,
  years: {
    [year: string]: TrainingYearModel
  }
}

type TrainingYearModel = {
  year: string,
  weeks: TrainingWeekModel[]
}

type Cycle = typeof CYCLES[number];

type WeekId = string;
type TrainingWeekModel = {
  weekId: WeekId,
  weekStartDate: Date,
  cycle: Cycle,
  days: {
    [key in WeekDay]: TrainingDayModel
  }
}

type TrainingDayModel = {
  day: WeekDay,
  trainings: TrainingModel[]
}

type TrainingId = string;
type TrainingModel = {
  trainingId: TrainingId,
  exercises: ExerciseModel[]
}

type ExerciseId = string;
type ExerciseModel = {
  exerciseId: ExerciseId,
  name: string,
  sets: ExSetModel[]
}

type ExSetId = string;
type ExSetModel = {
  setId: ExSetId,
  reps: number,
  weight: number,
}

type StatsModel = {
  volume: number,
  intensity: number,
  reps: number
}

export type {
  Cycle,
  ExSetId, ExSetModel, ExerciseId, ExerciseModel, TrainingId, TrainingModel, TrainingDayModel,
  WeekId, TrainingWeekModel, TrainingYearModel, ScheduleId, ScheduleModel, SchedulesModel, StatsModel

}