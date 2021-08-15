import { applyMiddleware, combineReducers, compose, createStore, Middleware } from "redux";
// import rootReducer from "./reducers";

import { schedulesReducer } from "../features/schedules/schedules-reducer";
import { usersReducer } from "../features/users/users-reducer";
import { optionsReducer } from "../features/options/options-reducer";
import { copyModeReducer, selectedUserReducer } from "./reducers"

import { throttle } from "lodash";
import { LocalStorageService } from "../shared/services/local-storage.service";


// ---------------------------------------------------------------------------
// compose rootReducer
// ---------------------------------------------------------------------------
const rootReducer = combineReducers({
  selectedUser: selectedUserReducer,
  copyMode: copyModeReducer,
  schedules: schedulesReducer,
  users: usersReducer,
  options: optionsReducer
});


// import { debounce } from "lodash";

// ---------------------------------------------------------------------------
// preload data and create store
// ---------------------------------------------------------------------------



// MIDDLEWARE
// ---------------------------------------------------------------------------
const loggingMiddleware: Middleware = storeAPI => next => action => {
  console.log("LOG ACTION:", action);
  return next(action);
}
// ---------------------------------------------------------------------------
const promiseMiddleware: Middleware = storeAPI => next => action => {
  if (action.then && action.catch && action.finally) {
    // (action as Promise<any>)
    //   .then(data => {
    //     next(data.)
    //   })
    //   .catch(err => {

    //   });
    return;
  }
  return next(action);
}
// ---------------------------------------------------------------------------



const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(loggingMiddleware, promiseMiddleware));

// Preload state
// ----------------------------------------------------------------------
const dataProvider = LocalStorageService<ReturnType<typeof rootReducer>>("ROOT_STATE", (key, value) => {
  return key === "weekStartDate" ? new Date(value) : value;
});
const persistedState = dataProvider.load();
// ----------------------------------------------------------------------

const store = createStore(rootReducer, persistedState, enhancer);

// Save state
// ----------------------------------------------------------------------
const saveToLs = () => {
  dataProvider.save(store.getState());
  console.log("saved!");
}
const throttledSave = throttle(saveToLs, 3000);
store.subscribe(throttledSave);
// ----------------------------------------------------------------------

type DataLoadingStatus = "idle" | "loading" | "succeeded" | "failed";
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch, DataLoadingStatus };
export { store };

