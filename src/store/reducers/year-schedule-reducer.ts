import { createExerciseWithSpreadedSet } from "../../utils/schedule-utils";
import { Actions } from "../actions"
import { YearScheduleModel } from "../types"

const initialSchedule: YearScheduleModel = {};

const yearScheduleReducer = (oldYearSchedule: YearScheduleModel = initialSchedule, action: Actions): YearScheduleModel => {
  switch (action.type) {

    case "yearSchedule/load": {
      return action.payload.yearSchedule;
    }

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