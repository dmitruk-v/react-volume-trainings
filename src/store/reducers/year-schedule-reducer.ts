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