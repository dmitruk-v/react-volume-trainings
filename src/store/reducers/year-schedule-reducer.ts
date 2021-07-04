import { Actions } from "../actions"
import { WeekScheduleModel2 } from "../types"

type YearScheduleModel = {
  [year: number]: WeekScheduleModel2[]
}

const initialSchedule: YearScheduleModel = {};

const yearScheduleReducer = (oldSchedule: YearScheduleModel = initialSchedule, action: Actions): YearScheduleModel => {
  switch (action.type) {
    case "year-schedule/load": {
      return action.payload.schedule;
    }

    case "year-schedule/updateWeek": {
      const { year, updatedWeek } = action.payload;
      return {
        ...oldSchedule,
        [year]: [
          ...oldSchedule[year].map(
            week => week.weekStartDate.getTime() === updatedWeek.weekStartDate.getTime()
              ? updatedWeek
              : week
          )
        ]
      }
    }
    default:
      return oldSchedule;
  }
}

export type { YearScheduleModel };
export { yearScheduleReducer };