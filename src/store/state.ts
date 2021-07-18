import { applyMiddleware, compose, createStore, Middleware } from "redux";
import rootReducer from "./reducers";

// import {  } from "./actions";
// import { debounce } from "lodash";

// preload data and create store
// ---------------------------------------------------------------------------
const weekStartDateReviver = (key: string, value: string): Date | string => {
  return key === "weekStartDate" ? new Date(value) : value;
}

const loggingMiddleware: Middleware = storeAPI => next => action => {
  console.log("LOG ACTION:", action);
  return next(action);
}

const preloadScheduleData = () => { }

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(loggingMiddleware));

const store = createStore(rootReducer, enhancer);

// Initial schedule load
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

type DataLoadingStatus = "idle" | "loading" | "succeeded" | "failed";
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch, DataLoadingStatus };
export { store };

