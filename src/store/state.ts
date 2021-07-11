import { applyMiddleware, createStore } from "redux";
import { TrainingDayModel, TrainingWeekModel, WeekDay } from "./types";
import rootReducer from "./reducers";
// import { JsonProvider } from "../providers/json-provider";
import { LocalStorageProvider } from "../providers/local-storage-provider";
import { createYearSchedule, createRandomizedYearSchedule, createTrainingWeek } from "../utils/create-schedule";

// when user loads app we need to load persisted data or create new data
// ---------------------------------------------------------------------------
// next, check if current year is present in data
// ---------------------------------------------------------------------------
// if not, update data with current year
// ---------------------------------------------------------------------------
// if current week is not present, update data with current week
// ---------------------------------------------------------------------------

// initialization
// ---------------------------------------------------------------------------

// const loadGlobalSchedule = (): GlobalSchedule => { return {} }

// preload data and create store
// ---------------------------------------------------------------------------
const dataProvider = LocalStorageProvider<TrainingWeekModel>("schedule");
// const dataProvider = JsonProvider<TrainingWeekModel>("http://localhost:3000/schedule.json");

const loadPersistedScheduleMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  if (action.type === "schedule/load") {
    setTimeout(() => {
      dataProvider.load()
        .then(schedule => {
          if (schedule !== null) {
            return storeAPI.dispatch({ type: "schedule/load-success", payload: { schedule } });
          }
          return storeAPI.dispatch({
            type: "schedule/load-success", payload: {
              schedule: createTrainingWeek()
            }
          });
        })
        .catch(err => {
          storeAPI.dispatch({ type: "schedule/load-failed", payload: { error: err } });
        });

      // ---------------------------------------------------------
      // loadGlobalSchedule();
      // ---------------------------------------------------------

    }, 1000);
    return;
  }
  return next(action);
}

const store = createStore(rootReducer, applyMiddleware(loadPersistedScheduleMiddleware));

const yearSchedule = createRandomizedYearSchedule([2019, 2020, 2021]);
// const yearSchedule = createYearSchedule([2019, 2020, 2021]);
store.dispatch({
  type: "yearSchedule/load",
  payload: { yearSchedule }
});

// store.subscribe(() => {
//   dataProvider.save(store.getState().weekSchedule);
// });

// ---------------------------------------------------------------------------

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { store };

