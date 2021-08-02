import { combineReducers } from "redux";

import { schedulesReducer } from "./schedules-reducer";
import { appOptionsReducer } from "./app-options-reducer";
import { usersReducer } from "./users-reducer";
import { selectedUserReducer } from "./selected-user-reducer";
import { copyModeReducer } from "./copy-mode-reducer";

const rootReducer = combineReducers({
  schedules: schedulesReducer,
  options: appOptionsReducer,
  users: usersReducer,
  selectedUser: selectedUserReducer,
  copyMode: copyModeReducer
});

export * from "./reducers-utils";
export default rootReducer;