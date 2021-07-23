import { combineReducers } from "redux";

import { schedulesReducer } from "./schedules-reducer";
import { appOptionsReducer } from "./app-options-reducer";
import { usersReducer } from "./users-reducer";
import { selectedUserReducer } from "./selected-user-reducer";

const rootReducer = combineReducers({
  schedules: schedulesReducer,
  options: appOptionsReducer,
  users: usersReducer,
  selectedUser: selectedUserReducer,
});

export * from "./reducers-utils";
export default rootReducer;