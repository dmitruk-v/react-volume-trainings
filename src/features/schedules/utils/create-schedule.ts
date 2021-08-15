import { WEEK_DAYS } from "../../../shared/constants";
import { WeekDay } from "../../../shared/types";
import { getWeekdayDates } from "../../../shared/utils/date-utils";
import { createIdGenerator } from "../../../shared/utils/generate-id";
import { ExerciseModel, ExSetModel, ScheduleModel, TrainingDayModel, TrainingModel, TrainingWeekModel, TrainingYearModel } from "../schedules-types";

const defaultScheduleOptions = {
  startDay: "monday",
  trainingsCount: 0,
  exercisesCount: 1,
  setsCount: 3,
  exerciseName: "Exercise",
  reps: 0,
  weight: 0
}

type ScheduleOptions = typeof defaultScheduleOptions;

const createScheduleId = createIdGenerator({ prefix: "sch-" });
const createWeekId = createIdGenerator({ prefix: "w-" });
const createTrainingId = createIdGenerator({ prefix: "tr-" });
const createExerciseId = createIdGenerator({ prefix: "ex-" });
const createSetId = createIdGenerator({ prefix: "s-" });

const createSet = (options: ScheduleOptions = defaultScheduleOptions, setNumber?: number): ExSetModel => {
  const opts = { ...defaultScheduleOptions, ...options };
  return {
    setId: createSetId(),
    reps: opts.reps,
    weight: opts.weight
  };
}

const createExercise = (options: ScheduleOptions = defaultScheduleOptions, exerciseNumber?: number): ExerciseModel => {
  const opts = { ...defaultScheduleOptions, ...options };
  return {
    exerciseId: createExerciseId(),
    name: `${opts.exerciseName}`,
    sets: Array.from({ length: opts.setsCount }, () => createSet(opts))
  };
}

const createTraining = (options: Partial<ScheduleOptions> = defaultScheduleOptions): TrainingModel => {
  const opts = { ...defaultScheduleOptions, ...options };
  return {
    trainingId: createTrainingId(),
    exercises: Array.from({ length: opts.exercisesCount }, (_, i) => createExercise(opts, i + 1))
  };
}

const createTrainingDay = (day: WeekDay, options: Partial<ScheduleOptions> = defaultScheduleOptions): TrainingDayModel => {
  const opts = { ...defaultScheduleOptions, ...options };
  return {
    day,
    trainings: Array.from({ length: opts.trainingsCount }, () => createTraining(opts))
  };
}

const createTrainingWeekDays = (options: Partial<ScheduleOptions> = defaultScheduleOptions): TrainingWeekModel["days"] => {
  const opts = { ...defaultScheduleOptions, ...options };
  return WEEK_DAYS.reduce((weekSchedule, day) => {
    weekSchedule[day] = createTrainingDay(day, opts);
    return weekSchedule;
  }, {} as TrainingWeekModel["days"]);
}

const createTrainingWeek = (startDate: Date, options: Partial<ScheduleOptions> = defaultScheduleOptions): TrainingWeekModel => {
  const opts = { ...defaultScheduleOptions, ...options };
  return {
    weekId: createWeekId(),
    weekStartDate: startDate,
    cycle: "none",
    days: createTrainingWeekDays(opts)
  }
}

// ------------------------------------------------------------------------------
const createTrainingYear = (year: number, options: Partial<ScheduleOptions> = defaultScheduleOptions): TrainingYearModel => {
  const opts = { ...defaultScheduleOptions, ...options };
  const mondays = getWeekdayDates(year, 1);
  return {
    year: year.toString(),
    weeks: mondays.map(mondayDate => createTrainingWeek(mondayDate, opts))
  };
}
// ------------------------------------------------------------------------------
// const createRandomizedSchedule = (years: number[], options: Partial<ScheduleOptions> = defaultScheduleOptions): TrainingYearModel => {
//   const randCycle = (): Cycle => CYCLES[Math.floor(Math.random() * CYCLES.length)];
//   const randReps = (): number => Math.floor(4 + Math.random() * 6);
//   const randWeight = (): number => Math.floor(20 + Math.random() * 40);
// }
// ------------------------------------------------------------------------------
const createSchedule = (years: number[], options: Partial<ScheduleOptions> = defaultScheduleOptions): ScheduleModel => {
  const opts = { ...defaultScheduleOptions, ...options };
  const schedule: ScheduleModel = {
    scheduleId: createScheduleId(),
    years: {}
  };
  return years.reduce((schedule, year) => {
    schedule.years[year] = createTrainingYear(year, opts);
    return schedule;
  }, schedule as ScheduleModel);
}



export {
  createScheduleId,
  createWeekId,
  createTrainingId,
  createExerciseId,
  createSetId,

  createSchedule,
  createTrainingYear,
  createTrainingWeekDays,
  createTrainingWeek,
  createTrainingDay,
  createTraining,
  createExercise,
  createSet
};