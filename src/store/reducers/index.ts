import { combineReducers } from "redux";

import { yearScheduleReducer } from "./year-schedule-reducer";
import { appOptionsReducer } from "./app-options-reducer";

const rootReducer = combineReducers({
  yearSchedule: yearScheduleReducer,
  appOptions: appOptionsReducer
});

export * from "./reducers-utils";
export default rootReducer;