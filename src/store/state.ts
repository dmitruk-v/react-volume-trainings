import { ReactNode } from "react";
import { applyMiddleware, compose, createStore, Middleware } from "redux";
import rootReducer from "./reducers";

// import { debounce } from "lodash";

// ---------------------------------------------------------------------------
// preload data and create store
// ---------------------------------------------------------------------------

const loggingMiddleware: Middleware = storeAPI => next => action => {
  console.log("LOG ACTION:", action);
  return next(action);
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(loggingMiddleware));

const store = createStore(rootReducer, enhancer);

type WithChildren<T> = T & { children?: ReactNode };
type DataLoadingStatus = "idle" | "loading" | "succeeded" | "failed";
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch, DataLoadingStatus, WithChildren };
export { store };

