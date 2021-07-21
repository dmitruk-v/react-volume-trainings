import { WeekDay } from ".";
import { CYCLES } from "../../constants/schedule";

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

type AppOptionsModel = {
  ui: {
    viewGridCols: number,
  },
  schedule: {
    activeDay: WeekDay,
    spreadReps: boolean,
    spreadWeight: boolean
  }
};


export type {
  AppOptionsModel, Cycle,
  ExSetId, ExSetModel, ExerciseId, ExerciseModel, TrainingId, TrainingModel, TrainingDayModel,
  WeekId, TrainingWeekModel, TrainingYearModel, ScheduleId, ScheduleModel, StatsModel

}