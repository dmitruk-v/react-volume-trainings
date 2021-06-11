import { DAYS_OF_WEEK } from "../constants";

type Day = typeof DAYS_OF_WEEK[number];

type WeekScheduleModel = {
  [key in Day]: TrainingDayModel
};

type TrainingDayModel = {
  day: Day,
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
  WeekScheduleModel,
  Day, TrainingDayModel,
  TrainingId, TrainingModel,
  ExerciseId, ExerciseModel,
  ExSetId, ExSetModel,
  StatsModel
}