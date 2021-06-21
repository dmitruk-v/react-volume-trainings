import { createStore } from "redux";
import { loadScheduleAction, createSchedule } from "./";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

const weekSchedule = createSchedule({ trainingsCount: 1, exercisesCount: 3, setsCount: 3, reps: 0, weight: 0 });
store.dispatch(loadScheduleAction(weekSchedule)(store.dispatch));

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { store };