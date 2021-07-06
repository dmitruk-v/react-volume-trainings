import { createSetId, createExerciseId, createTrainingId, } from "../store";
import { ExSetModel, ExerciseModel, TrainingModel, TrainingDayModel } from "../store/types";
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
const createClonedSet = (set: ExSetModel): ExSetModel => ({
  setId: createSetId(),
  reps: set.reps,
  weight: set.weight,
});

const createClonedExercise = (exercise: ExerciseModel): ExerciseModel => ({
  ...exercise,
  exerciseId: createExerciseId(),
  sets: exercise.sets.map(s => createClonedSet(s)),
});

const createClonedTraining = (training: TrainingModel): TrainingModel => ({
  ...training,
  trainingId: createTrainingId(),
  exercises: training.exercises.map(ex => createClonedExercise(ex)),
});

const createClonedDay = (trainingDay: TrainingDayModel): TrainingDayModel => ({
  ...trainingDay,
  trainings: trainingDay.trainings.map(tr => createClonedTraining(tr)),
});

// -------------------------------------------------------------------------
// SPREAD SET IN EXERCISE
// -------------------------------------------------------------------------
const createExerciseWithSpreadedSet = (exercise: ExerciseModel, spreadedSet: ExSetModel): ExerciseModel => {
  console.log(spreadedSet);
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
  createExerciseWithSpreadedSet
}