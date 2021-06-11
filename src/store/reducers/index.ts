import { combineReducers } from "redux";

import { weekScheduleReducer } from "./week-schedule-reducer";
import { appOptionsReducer } from "./app-options-reducer";

const rootReducer = combineReducers({
  weekSchedule: weekScheduleReducer,
  appOptions: appOptionsReducer
});

export type { AppOptionsModel } from "./app-options-reducer";
export * from "./reducers-utils";
export default rootReducer;