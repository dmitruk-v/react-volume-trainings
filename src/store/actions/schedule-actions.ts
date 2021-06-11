import { WeekScheduleModel } from "..";
import { ActionCreator } from ".";

type LoadWeekScheduleAction = {
  type: "schedule/load",
  payload: {
    schedule: WeekScheduleModel
  }
};

type WeekScheduleActions = LoadWeekScheduleAction;

const loadScheduleAction = (schedule: WeekScheduleModel): ActionCreator<LoadWeekScheduleAction> => {
  return (dispatch) => {
    return {
      type: "schedule/load",
      payload: { schedule }
    }
  }
}

export type { WeekScheduleActions };
export { loadScheduleAction };