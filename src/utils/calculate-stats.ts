import { ExerciseModel, ExSetModel, StatsModel, TrainingModel, TrainingDayModel, TrainingWeekModel } from "../store/types";

/* calculations
------------------------------------------------------------------------- */
const calculateExSetStats = (set: ExSetModel | undefined): StatsModel => {
  const exSetStats = { volume: 0, intensity: 0, reps: 0 };
  if (set === undefined) {
    return exSetStats;
  }
  exSetStats.volume = (set.reps * set.weight) / 1000;
  exSetStats.reps = set.weight > 0 ? set.reps : 0;
  exSetStats.intensity = set.reps > 0 ? set.weight : 0;
  return exSetStats;
}

const calculateExerciseStats = (exercise: ExerciseModel | undefined): StatsModel => {
  const exerciseStats = { volume: 0, intensity: 0, reps: 0 };
  if (exercise === undefined) {
    return exerciseStats;
  }
  exercise.sets.forEach(set => {
    const exSetStats = calculateExSetStats(set);
    exerciseStats.volume += exSetStats.volume;
    exerciseStats.intensity += exSetStats.intensity;
    exerciseStats.reps += exSetStats.reps;
  });
  exerciseStats.intensity = exercise.sets.length > 0
    ? exerciseStats.intensity / exercise.sets.length
    : 0;
  return exerciseStats;
}

const calculateTrainingStats = (training: TrainingModel | undefined): StatsModel => {
  const trainingStats = { volume: 0, intensity: 0, reps: 0 };
  if (training === undefined) {
    return trainingStats;
  }
  training.exercises.forEach(exercise => {
    const exerciseStats = calculateExerciseStats(exercise);
    trainingStats.volume += exerciseStats.volume;
    trainingStats.intensity += exerciseStats.intensity;
    trainingStats.reps += exerciseStats.reps;
  });
  trainingStats.intensity = training.exercises.length > 0
    ? trainingStats.intensity / training.exercises.length
    : 0;
  return trainingStats;
}

const calculateTrainingDayStats = (trainingDay: TrainingDayModel | undefined): StatsModel => {
  const dayStats = { volume: 0, intensity: 0, reps: 0 };
  if (trainingDay === undefined) {
    return dayStats;
  }
  trainingDay.trainings.forEach(training => {
    const trainingStats = calculateTrainingStats(training);
    dayStats.volume += trainingStats.volume;
    dayStats.intensity += trainingStats.intensity;
    dayStats.reps += trainingStats.reps;
  });
  dayStats.intensity = trainingDay.trainings.length > 0
    ? dayStats.intensity / trainingDay.trainings.length
    : 0;
  return dayStats;
}

const calculateTrainingWeekStats = (trainingWeek: TrainingWeekModel | undefined): StatsModel => {
  const weekStats = { volume: 0, intensity: 0, reps: 0 };
  if (trainingWeek === undefined) {
    return weekStats;
  }
  Object.values(trainingWeek.days).forEach(trainingDay => {
    const dayStats = calculateTrainingDayStats(trainingDay);
    weekStats.volume += dayStats.volume;
    weekStats.intensity += dayStats.intensity;
    weekStats.reps += dayStats.reps;
  });

  weekStats.intensity = weekStats.intensity / Object.keys(trainingWeek.days).length;
  return weekStats;
}

export {
  calculateExSetStats,
  calculateExerciseStats,
  calculateTrainingStats,
  calculateTrainingDayStats,
  calculateTrainingWeekStats
};