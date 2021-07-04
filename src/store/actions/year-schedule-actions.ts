import { YearScheduleModel } from "../reducers/year-schedule-reducer";
import { WeekScheduleModel2 } from "../types";

const loadYearScheduleAction = (schedule: YearScheduleModel) => {
  return {
    type: "year-schedule/load",
    payload: { schedule }
  } as const;
}

const updateYearScheduleWeekAction = (year: number, updatedWeek: WeekScheduleModel2) => {
  return {
    type: "year-schedule/updateWeek",
    payload: { year, updatedWeek }
  } as const;
}

type YearScheduleActions =
  ReturnType<typeof updateYearScheduleWeekAction>
  | ReturnType<typeof loadYearScheduleAction>;

export type { YearScheduleActions };
export { loadYearScheduleAction, updateYearScheduleWeekAction }