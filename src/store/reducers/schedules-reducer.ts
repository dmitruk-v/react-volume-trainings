import { createExerciseWithSpreadedSet } from "../../utils/schedule-utils";
import { Actions } from "../actions"
import { DataLoadingStatus } from "..";
import { SchedulesModel } from "../types"
import { removeEntryByKey } from "./reducers-utils";

type SchedulesState = {
  status: DataLoadingStatus,
  error: string | null,
  data: SchedulesModel,
};

const initialState: SchedulesState = {
  status: "idle",
  error: null,
  data: {}
};

const schedulesReducer = (oldState: SchedulesState = initialState, action: Actions): SchedulesState => {
  switch (action.type) {

    case "schedules/load": {
      return {
        ...oldState,
        status: "loading",
        error: null,
      }
    }

    case "schedules/loadSucceeded": {
      return {
        ...oldState,
        status: "succeeded",
        error: null,
        data: action.payload.schedules
      };
    }

    case "schedules/loadFailed": {
      return {
        ...oldState,
        status: "failed",
        error: action.payload.error
      };
    }

    // -------------------------------------------------------------------------------------
    // SETS
    // -------------------------------------------------------------------------------------
    case "schedules/addSet": {
      const { scheduleId, year, weekId, day, trainingId, exerciseId, addedSet } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    case "schedules/updateSet": {
      const { scheduleId, year, weekId, day, trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    case "schedules/updateSetWithSpread": {
      const { scheduleId, year, weekId, day, trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    case "schedules/removeSet": {
      const { scheduleId, year, weekId, day, trainingId, exerciseId, removedSet } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    // -------------------------------------------------------------------------------------
    // EXERCISES
    // -------------------------------------------------------------------------------------
    case "schedules/addExercise": {
      const { scheduleId, year, weekId, day, trainingId, addedExercise } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    case "schedules/updateExercise": {
      const { scheduleId, year, weekId, day, trainingId, updatedExercise } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    case "schedules/removeExercise": {
      const { scheduleId, year, weekId, day, trainingId, removedExercise } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    // -------------------------------------------------------------------------------------
    // TRAININGS
    // -------------------------------------------------------------------------------------
    case "schedules/addTraining": {
      const { scheduleId, year, weekId, day, addedTraining } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    case "schedules/updateTraining": {
      const { scheduleId, year, weekId, day, updatedTraining } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    case "schedules/removeTraining": {
      const { scheduleId, year, weekId, day, removedTraining } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    // -------------------------------------------------------------------------------------
    // TRAINING-DAYS
    // -------------------------------------------------------------------------------------
    case "schedules/updateTrainingDay": {
      const { scheduleId, year, weekId, updatedTrainingDay } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
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
    }

    // -------------------------------------------------------------------------------------
    // TRAINING-WEEKS
    // -------------------------------------------------------------------------------------
    case "schedules/updateTrainingWeek": {
      const { scheduleId, year, updatedTrainingWeek } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
                  week => week.weekId === updatedTrainingWeek.weekId
                    ? updatedTrainingWeek
                    : week
                )
              }
            }
          }
        }
      }
    }

    case "schedules/copyTrainingWeek": {
      const { scheduleId, year, fromWeekId, toWeekId } = action.payload;
      const fromWeek = oldState.data[scheduleId].years[year].weeks.find(w => w.weekId === fromWeekId);
      if (fromWeek === undefined) return oldState;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: {
                ...oldState.data[scheduleId].years[year],
                weeks: oldState.data[scheduleId].years[year].weeks.map(
                  week => week.weekId === toWeekId
                    ? {
                      ...fromWeek,
                      weekId: week.weekId,
                    }
                    : week
                )
              }
            }
          }
        }
      }
    }

    // -------------------------------------------------------------------------------------
    // TRAINING-YEARS
    // -------------------------------------------------------------------------------------
    case "schedules/updateTrainingYear": {
      const { scheduleId, year, updatedTrainingYear } = action.payload;
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [scheduleId]: {
            ...oldState.data[scheduleId],
            years: {
              ...oldState.data[scheduleId].years,
              [year]: updatedTrainingYear,
            }
          }
        }
      }
    }

    // -------------------------------------------------------------------------------------
    // SCHEDULE
    // -------------------------------------------------------------------------------------
    case "schedules/create": {
      const { schedule } = action.payload;
      return {
        ...oldState,
        status: "succeeded",
        error: null,
        data: {
          ...oldState.data,
          [schedule.scheduleId]: schedule
        }
      };
    }

    case "schedules/remove": {
      const { removedScheduleId } = action.payload;
      return {
        ...oldState,
        data: removeEntryByKey(oldState.data, removedScheduleId),
      };
    }

    // // -------------------------------------------------------------------------------------
    // // USER REMOVE
    // // -------------------------------------------------------------------------------------
    // case "users/remove": {
    //   const { removedUser } = action.payload;
    //   return {
    //     ...oldState,
    //     data: removeEntry(oldState.data, removedUser.scheduleId),
    //   };
    // }

    default:
      return oldState;
  }
}

export { schedulesReducer };