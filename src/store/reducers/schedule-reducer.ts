import { createExerciseWithSpreadedSet } from "../../utils/schedule-utils";
import { Actions } from "../actions"
import { DataLoadingStatus } from "..";
import { ScheduleModel } from "../types"

type ScheduleState = {
  status: DataLoadingStatus,
  error: string | null,
  data: ScheduleModel,
};

const initialState: ScheduleState = {
  status: "idle",
  error: null,
  data: {
    scheduleId: "",
    years: {}
  }
};

const scheduleReducer = (oldState: ScheduleState = initialState, action: Actions): ScheduleState => {
  switch (action.type) {

    case "schedule/create": {
      return {
        ...oldState,
        status: "succeeded",
        error: null,
        data: action.payload.schedule
      };
    }

    case "schedule/load": {
      return {
        ...oldState,
        status: "loading",
        error: null,
      }
    }

    case "schedule/loadSucceeded": {
      return {
        ...oldState,
        status: "succeeded",
        error: null,
        data: action.payload.schedule
      };
    }

    case "schedule/loadFailed": {
      return {
        ...oldState,
        status: "failed",
        error: action.payload.error
      };
    }

    // -------------------------------------------------------------------------------------
    // SETS
    // -------------------------------------------------------------------------------------
    case "schedule/addSet": {
      const { year, weekId, day, trainingId, exerciseId, addedSet } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    case "schedule/updateSet": {
      const { year, weekId, day, trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    case "schedule/updateSetWithSpread": {
      const { year, weekId, day, trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    case "schedule/removeSet": {
      const { year, weekId, day, trainingId, exerciseId, removedSet } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    // -------------------------------------------------------------------------------------
    // EXERCISES
    // -------------------------------------------------------------------------------------
    case "schedule/addExercise": {
      const { year, weekId, day, trainingId, addedExercise } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    case "schedule/updateExercise": {
      const { year, weekId, day, trainingId, updatedExercise } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    case "schedule/removeExercise": {
      const { year, weekId, day, trainingId, removedExercise } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    // -------------------------------------------------------------------------------------
    // TRAININGS
    // -------------------------------------------------------------------------------------
    case "schedule/addTraining": {
      const { year, weekId, day, addedTraining } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    case "schedule/updateTraining": {
      const { year, weekId, day, updatedTraining } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    case "schedule/removeTraining": {
      const { year, weekId, day, removedTraining } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
                week => week.weekId === weekId
                  ? {
                    ...week,
                    days: {
                      ...week.days,
                      [day]: {
                        ...week.days[day],
                        trainings: week.days[day].trainings.filter(
                          tr => tr.trainingId !== removedTraining.trainingId
                        )
                      }
                    }
                  }
                  : week
              )
            }
          }
        }
      }
    }

    // -------------------------------------------------------------------------------------
    // TRAINING-DAYS
    // -------------------------------------------------------------------------------------
    case "schedule/updateTrainingDay": {
      const { year, weekId, updatedTrainingDay } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
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
        }
      }
    }

    // -------------------------------------------------------------------------------------
    // TRAINING-WEEKS
    // -------------------------------------------------------------------------------------
    case "schedule/updateTrainingWeek": {
      const { year, updatedTrainingWeek } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: {
              ...oldState.data.years[year],
              weeks: oldState.data.years[year].weeks.map(
                week => week.weekId === updatedTrainingWeek.weekId
                  ? updatedTrainingWeek
                  : week
              )
            }
          }
        }
      }
    }

    // -------------------------------------------------------------------------------------
    // TRAINING-YEARS
    // -------------------------------------------------------------------------------------
    case "schedule/updateTrainingYear": {
      const { year, updatedTrainingYear } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          years: {
            ...oldState.data.years,
            [year]: updatedTrainingYear,
          }
        }
      }
    }

    default:
      return oldState;
  }
}

export type { ScheduleState };
export { scheduleReducer };