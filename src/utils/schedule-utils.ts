import { createSetId, createExerciseId, createTrainingId, } from "../store";
import { ExSetModel, ExerciseModel, TrainingModel, TrainingDayModel, TrainingWeekModel, WeekDay } from "../store/types";
// -------------------------------------------------------------------------
// SCHEDULE CREATION
// -------------------------------------------------------------------------


// -------------------------------------------------------------------------
// RESET
// -------------------------------------------------------------------------
const createResetedSet = (set: ExSetModel): ExSetModel => ({ ...set, reps: 0, weight: 0 });

const createResetedExercise = (exercise: ExerciseModel): ExerciseModel => ({
  ...exercise,
  sets: exercise.sets.map(s => createResetedSet(s))
});

const createResetedTraining = (training: TrainingModel): TrainingModel => ({
  ...training,
  exercises: training.exercises.map(ex => createResetedExercise(ex))
});

// -------------------------------------------------------------------------
// CLONE
// -------------------------------------------------------------------------
const createClonedSet = (fromSet: ExSetModel): ExSetModel => ({
  setId: createSetId(),
  reps: fromSet.reps,
  weight: fromSet.weight,
});

const createClonedExercise = (fromExercise: ExerciseModel): ExerciseModel => ({
  ...fromExercise,
  exerciseId: createExerciseId(),
  sets: fromExercise.sets.map(s => createClonedSet(s)),
});

const createClonedTraining = (fromTraining: TrainingModel): TrainingModel => ({
  ...fromTraining,
  trainingId: createTrainingId(),
  exercises: fromTraining.exercises.map(ex => createClonedExercise(ex)),
});

const createClonedDay = (fromDay: TrainingDayModel): TrainingDayModel => ({
  ...fromDay,
  trainings: fromDay.trainings.map(tr => createClonedTraining(tr)),
});

const createClonedWeek = (fromWeek: TrainingWeekModel, toWeek: TrainingWeekModel): TrainingWeekModel => ({
  ...toWeek,
  cycle: fromWeek.cycle,
  days: Object.keys(toWeek.days).reduce((days, dayKey) => {
    days[dayKey as WeekDay] = createClonedDay(fromWeek.days[dayKey as WeekDay]);
    return days;
  }, {} as TrainingWeekModel["days"])
});

// -------------------------------------------------------------------------
// COPY
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// SPREAD SET IN EXERCISE
// -------------------------------------------------------------------------
const createExerciseWithSpreadedSet = (exercise: ExerciseModel, spreadedSet: ExSetModel): ExerciseModel => {
  let spreadPosition: number;
  return {
    ...exercise,
    sets: exercise.sets.map((s, idx) => {
      if (s.setId === spreadedSet.setId) {
        spreadPosition = idx;
      }
      if (spreadPosition !== undefined) {
        if (idx >= spreadPosition) {
          s.reps = spreadedSet.reps;
          s.weight = spreadedSet.weight;
        }
      }
      return { ...s };
    })
  }
}


export {
  createResetedSet, createResetedExercise, createResetedTraining,
  createClonedSet, createClonedExercise, createClonedTraining, createClonedDay,
  createClonedWeek,
  createExerciseWithSpreadedSet
}