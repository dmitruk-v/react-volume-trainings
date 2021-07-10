import { createIdGenerator } from "./generate-id";
import { ExSetModel, ExerciseModel, TrainingModel, TrainingDayModel, TrainingWeekModel, YearScheduleModel, WeekDay, Cycle } from "../store/types";
import { WEEK_DAYS, CYCLES } from "../constants";
import { getWeekdayDates } from "./date-utils";

type TrainingDayOptions = {
  day: WeekDay,
  trainingsCount: number,
  exercisesCount: number,
  setsCount: number,
  exerciseName: string,
  reps: number,
  weight: number
}

const defaultTrainingDayOptions: TrainingDayOptions = {
  day: "monday",
  trainingsCount: 1,
  exercisesCount: 1,
  setsCount: 3,
  exerciseName: "Exercise",
  reps: 0,
  weight: 0
}

const createWeekId = createIdGenerator({ prefix: "w-" });
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

const createTrainingWeek = (options: Partial<TrainingDayOptions> = defaultTrainingDayOptions): TrainingWeekModel["days"] => {
  const opts = { ...defaultTrainingDayOptions, ...options };
  return WEEK_DAYS.reduce((schedule, item) => {
    schedule[item] = createTrainingDay({ ...opts, day: item });
    return schedule;
  }, {} as TrainingWeekModel["days"])
}

// ------------------------------------------------------------------------------
const createYearSchedule = (years: number[], options: Partial<TrainingDayOptions> = defaultTrainingDayOptions): YearScheduleModel => {
  const yearSchedule: YearScheduleModel = {};
  years.forEach(year => {
    const mondays = getWeekdayDates(year, 1);
    const trainingWeeks = mondays.map(mondayDate => ({
      weekId: createWeekId(),
      weekStartDate: mondayDate,
      cycle: "none",
      days: createTrainingWeek({ reps: 0, weight: 0 })
    } as TrainingWeekModel));
    yearSchedule[year] = trainingWeeks;
  });
  return yearSchedule;
}
// ------------------------------------------------------------------------------
const createRandomizedYearSchedule = (years: number[], options: Partial<TrainingDayOptions> = defaultTrainingDayOptions): YearScheduleModel => {
  const randCycle = (): Cycle => CYCLES[Math.floor(Math.random() * CYCLES.length)];
  const randReps = (): number => Math.floor(4 + Math.random() * 6);
  const randWeight = (): number => Math.floor(20 + Math.random() * 40);

  const yearSchedule: YearScheduleModel = {};
  years.forEach(year => {
    const mondays = getWeekdayDates(year, 1);
    const trainingWeeks = mondays.map(mondayDate => ({
      weekId: createWeekId(),
      weekStartDate: mondayDate,
      cycle: randCycle(),
      days: createTrainingWeek({ reps: randReps(), weight: randWeight() })
    } as TrainingWeekModel));
    yearSchedule[year] = trainingWeeks;
  });
  return yearSchedule;
}
// ------------------------------------------------------------------------------

export {
  createTrainingId,
  createExerciseId,
  createSetId,

  createYearSchedule, createRandomizedYearSchedule,
  createTrainingWeek,
  createTrainingDay,
  createTraining,
  createExercise,
  createSet
};