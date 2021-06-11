import { createIdGenerator } from "../utils/generate-id";
import { ExSetModel, ExerciseModel, TrainingModel, TrainingDayModel, WeekScheduleModel, Day } from ".";
import { DAYS_OF_WEEK } from "../constants";

type TrainingDayOptions = {
  day: Day,
  trainingsCount: number,
  exercisesCount: number,
  setsCount: number,
  exerciseName: string,
  reps: number,
  weight: number
}


const defaultTrainingDayOptions: TrainingDayOptions = {
  day: "Monday",
  trainingsCount: 1,
  exercisesCount: 6,
  setsCount: 4,
  exerciseName: "Exercise",
  reps: 8,
  weight: 30
}

const createTrainingId = createIdGenerator({ prefix: "tr-" });
const createExerciseId = createIdGenerator({ prefix: "ex-" });
const createSetId = createIdGenerator({ prefix: "s-" });

const createSet = (options: TrainingDayOptions = defaultTrainingDayOptions, setNumber?: number): ExSetModel => {
  const opts = { ...defaultTrainingDayOptions, ...options };
  return {
    setId: createSetId(),
    reps: opts.reps,
    weight: opts.weight
  };
}

const createExercise = (options: TrainingDayOptions = defaultTrainingDayOptions, exerciseNumber?: number): ExerciseModel => {
  const opts = { ...defaultTrainingDayOptions, ...options };
  return {
    exerciseId: createExerciseId(),
    name: `${opts.exerciseName}`,
    sets: Array.from(
      { length: opts.setsCount },
      () => createSet(opts)
    )
  };
}

const createTraining = (options: Partial<TrainingDayOptions> = defaultTrainingDayOptions): TrainingModel => {
  const opts = { ...defaultTrainingDayOptions, ...options };
  return {
    trainingId: createTrainingId(),
    exercises: Array.from(
      { length: opts.exercisesCount },
      (_, i) => createExercise(opts, i + 1))
  };
}

const createTrainingDay = (options: Partial<TrainingDayOptions> = defaultTrainingDayOptions): TrainingDayModel => {
  const opts = { ...defaultTrainingDayOptions, ...options };
  return {
    day: opts.day,
    trainings: Array.from({ length: opts.trainingsCount }, () => createTraining(opts))
  };
}

const createSchedule = (options: Partial<TrainingDayOptions> = defaultTrainingDayOptions): WeekScheduleModel => {
  const opts = { ...defaultTrainingDayOptions, ...options };
  return DAYS_OF_WEEK.reduce((schedule, item) => {
    schedule[item] = createTrainingDay({ ...opts, day: item });
    return schedule;
  }, {} as WeekScheduleModel);
}

export {
  createTrainingId,
  createExerciseId,
  createSetId,

  createSchedule,
  createTrainingDay,
  createTraining,
  createExercise,
  createSet
};