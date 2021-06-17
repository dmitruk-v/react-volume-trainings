import { ExerciseModel, ExSetModel, StatsModel, TrainingModel, TrainingDayModel, WeekScheduleModel } from ".";

/* calculations
------------------------------------------------------------------------- */
const calculateExSetStats = (set: ExSetModel): StatsModel => {
  const exSetStats = { volume: 0, intensity: 0, reps: 0 };
  exSetStats.volume = (set.reps * set.weight) / 1000;
  exSetStats.reps = (set.weight >= 1) ? set.reps : 0;
  exSetStats.intensity = (set.reps >= 1) ? set.weight : 0;
  return exSetStats;
}

const calculateExerciseStats = (exercise: ExerciseModel): StatsModel => {
  const exerciseStats = { volume: 0, intensity: 0, reps: 0 };
  exercise.sets.forEach(set => {
    const exSetStats = calculateExSetStats(set);
    exerciseStats.volume += exSetStats.volume;
    exerciseStats.intensity += exSetStats.intensity;
    exerciseStats.reps += exSetStats.reps;
  });
  exerciseStats.intensity = exerciseStats.intensity / exercise.sets.length;
  return exerciseStats;
}

const calculateTrainingStats = (training: TrainingModel): StatsModel => {
  const trainingStats = { volume: 0, intensity: 0, reps: 0 };
  training.exercises.forEach(exercise => {
    const exerciseStats = calculateExerciseStats(exercise);
    trainingStats.volume += exerciseStats.volume;
    trainingStats.intensity += exerciseStats.intensity;
    trainingStats.reps += exerciseStats.reps;
  });
  trainingStats.intensity = trainingStats.intensity / training.exercises.length;
  return trainingStats;
}

const calculateDayStats = (trainingDay: TrainingDayModel): StatsModel => {
  const dayStats = { volume: 0, intensity: 0, reps: 0 };
  trainingDay.trainings.forEach(training => {
    const trainingStats = calculateTrainingStats(training);
    dayStats.volume += trainingStats.volume;
    dayStats.intensity += trainingStats.intensity;
    dayStats.reps += trainingStats.reps;
  });
  dayStats.intensity = dayStats.intensity / trainingDay.trainings.length;
  return dayStats;
}

const calculateWeekStats = (schedule: WeekScheduleModel): StatsModel => {
  const weekStats = { volume: 0, intensity: 0, reps: 0 };
  Object.values(schedule).forEach(trainingDay => {
    const dayStats = calculateDayStats(trainingDay);
    weekStats.volume += dayStats.volume;
    weekStats.intensity += dayStats.intensity;
    weekStats.reps += dayStats.reps;
  });

  weekStats.intensity = weekStats.intensity / Object.keys(schedule).length;
  return weekStats;
}

export {
  calculateExSetStats,
  calculateExerciseStats,
  calculateTrainingStats,
  calculateDayStats,
  calculateWeekStats
};