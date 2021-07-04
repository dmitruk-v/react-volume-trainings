import { WeekDay } from "../constants";

type YearScheduleModel = {
  [year: number]: WeekScheduleModel2[]
}

type Cycle = "none" | "relax" | "volume" | "volume-strength" | "strength" | "fat-burn";

type WeekScheduleModel2 = {
  weekStartDate: Date,
  cycle: Cycle,
  days: { [key in WeekDay]: TrainingDayModel }
};


type WeekScheduleModel = {
  [key in WeekDay]: TrainingDayModel
};

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
  YearScheduleModel,
  WeekScheduleModel, WeekScheduleModel2, Cycle,
  WeekDay, TrainingDayModel,
  TrainingId, TrainingModel,
  ExerciseId, ExerciseModel,
  ExSetId, ExSetModel,
  StatsModel
}