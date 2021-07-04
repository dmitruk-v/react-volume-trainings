import { WeekScheduleModel } from "..";

const loadWeekScheduleAction = () => (dispatch: any) => {
  return {
    type: "schedule/load"
  } as const
}

const loadWeekScheduleSuccessAction = (schedule: WeekScheduleModel) => {
  return {
    type: "schedule/load-success",
    payload: { schedule }
  } as const
}

const loadWeekScheduleFailedAction = (error: string | Error) => {
  return {
    type: "schedule/load-error",
    payload: { error }
  } as const
}

type WeekScheduleActions =
  ReturnType<ReturnType<typeof loadWeekScheduleAction>>
  | ReturnType<typeof loadWeekScheduleSuccessAction>
  | ReturnType<typeof loadWeekScheduleFailedAction>;

export type { WeekScheduleActions };
export { loadWeekScheduleAction, loadWeekScheduleSuccessAction, loadWeekScheduleFailedAction };