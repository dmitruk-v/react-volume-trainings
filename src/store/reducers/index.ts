import { combineReducers } from "redux";

import { scheduleReducer } from "./schedule-reducer";
import { appOptionsReducer } from "./app-options-reducer";
import { usersReducer } from "./users-reducer";

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  options: appOptionsReducer,
  users: usersReducer,
});

export * from "./reducers-utils";
export default rootReducer;