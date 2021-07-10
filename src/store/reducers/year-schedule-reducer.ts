import { createExerciseWithSpreadedSet } from "../../utils/schedule-utils";
import { Actions } from "../actions"
import { YearScheduleModel } from "../types"

const initialSchedule: YearScheduleModel = {};

const yearScheduleReducer = (oldYearSchedule: YearScheduleModel = initialSchedule, action: Actions): YearScheduleModel => {
  switch (action.type) {

    case "yearSchedule/load": {
      return action.payload.yearSchedule;
    }

    // -------------------------------------------------------------------------------------
    // SETS
    // -------------------------------------------------------------------------------------

    case "yearSchedule/addSet": {
      const { year, weekId, day, trainingId, exerciseId, addedSet } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.map(
                    tr => tr.trainingId === trainingId
                      ? {
                        ...tr,
                        exercises: tr.exercises.map(
                          ex => ex.exerciseId === exerciseId
                            ? {
                              ...ex,
                              sets: [...ex.sets, addedSet]
                            }
                            : ex
                        )
                      }
                      : tr
                  )
                }
              }
            }
            : week
        )
      }
    }

    case "yearSchedule/updateSet": {
      const { year, weekId, day, trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.map(
                    tr => tr.trainingId === trainingId
                      ? {
                        ...tr,
                        exercises: tr.exercises.map(
                          ex => ex.exerciseId === exerciseId
                            ? {
                              ...ex,
                              sets: ex.sets.map(
                                s => s.setId === updatedSet.setId
                                  ? updatedSet
                                  : s
                              )
                            }
                            : ex
                        )
                      }
                      : tr
                  )
                }
              }
            }
            : week
        )
      }
    }

    case "yearSchedule/updateSetWithSpread": {
      const { year, weekId, day, trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.map(
                    tr => tr.trainingId === trainingId
                      ? {
                        ...tr,
                        exercises: tr.exercises.map(
                          ex => ex.exerciseId === exerciseId
                            ? createExerciseWithSpreadedSet(ex, updatedSet)
                            : ex
                        )
                      }
                      : tr
                  )
                }
              }
            }
            : week
        )
      }
    }

    case "yearSchedule/removeSet": {
      const { year, weekId, day, trainingId, exerciseId, removedSet } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.map(
                    tr => tr.trainingId === trainingId
                      ? {
                        ...tr,
                        exercises: tr.exercises.map(
                          ex => ex.exerciseId === exerciseId
                            ? {
                              ...ex,
                              sets: ex.sets.length > 1
                                ? ex.sets.filter(s => s.setId !== removedSet.setId)
                                : ex.sets
                            }
                            : ex
                        )
                      }
                      : tr
                  )
                }
              }
            }
            : week
        )
      }
    }

    // -------------------------------------------------------------------------------------
    // EXERCISES
    // -------------------------------------------------------------------------------------

    case "yearSchedule/addExercise": {
      const { year, weekId, day, trainingId, addedExercise } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.map(
                    tr => tr.trainingId === trainingId
                      ? {
                        ...tr,
                        exercises: [...tr.exercises, addedExercise]
                      }
                      : tr
                  )
                }
              }
            }
            : week
        )
      }
    }

    case "yearSchedule/updateExercise": {
      const { year, weekId, day, trainingId, updatedExercise } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.map(
                    tr => tr.trainingId === trainingId
                      ? {
                        ...tr,
                        exercises: tr.exercises.map(
                          ex => ex.exerciseId === updatedExercise.exerciseId
                            ? updatedExercise
                            : ex
                        )
                      }
                      : tr
                  )
                }
              }
            }
            : week
        )
      }
    }

    case "yearSchedule/removeExercise": {
      const { year, weekId, day, trainingId, removedExercise } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.map(
                    tr => tr.trainingId === trainingId
                      ? {
                        ...tr,
                        exercises: tr.exercises.length > 1
                          ? tr.exercises.filter(ex => ex.exerciseId !== removedExercise.exerciseId)
                          : tr.exercises
                      }
                      : tr
                  )
                }
              }
            }
            : week
        )
      }
    }

    // -------------------------------------------------------------------------------------
    // TRAININGS
    // -------------------------------------------------------------------------------------

    case "yearSchedule/addTraining": {
      const { year, weekId, day, addedTraining } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: [...week.days[day].trainings, addedTraining]
                }
              }
            }
            : week
        )
      }
    }

    case "yearSchedule/updateTraining": {
      const { year, weekId, day, updatedTraining } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.map(
                    tr => tr.trainingId === updatedTraining.trainingId
                      ? updatedTraining
                      : tr
                  )
                }
              }
            }
            : week
        )
      }
    }

    case "yearSchedule/removeTraining": {
      const { year, weekId, day, removedTraining } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [day]: {
                  ...week.days[day],
                  trainings: week.days[day].trainings.length > 1
                    ? week.days[day].trainings.filter(tr => tr.trainingId !== removedTraining.trainingId)
                    : week.days[day].trainings
                }
              }
            }
            : week
        )
      }
    }

    // -------------------------------------------------------------------------------------
    // TRAINING-DAYS
    // -------------------------------------------------------------------------------------

    case "yearSchedule/updateTrainingDay": {
      const { year, weekId, updatedTrainingDay } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === weekId
            ? {
              ...week,
              days: {
                ...week.days,
                [updatedTrainingDay.day]: updatedTrainingDay
              }
            }
            : week
        )
      }
    }

    // -------------------------------------------------------------------------------------
    // TRAINING-WEEKS
    // -------------------------------------------------------------------------------------

    case "yearSchedule/updateTrainingWeek": {
      const { year, updatedTrainingWeek } = action.payload;
      return {
        ...oldYearSchedule,
        [year]: oldYearSchedule[year].map(
          week => week.weekId === updatedTrainingWeek.weekId
            ? updatedTrainingWeek
            : week
        )
      }
    }

    // case "yearSchedule/updateWeek": {
    //   const { year, updatedWeek } = action.payload;
    //   return {
    //     ...oldYearSchedule,
    //     [year]: [
    //       ...oldYearSchedule[year].map(
    //         week => week.weekId === updatedWeek.weekId
    //           ? updatedWeek
    //           : week
    //       )
    //     ]
    //   }
    // }
    default:
      return oldYearSchedule;
  }
}

export type { YearScheduleModel };
export { yearScheduleReducer };