import { getWeekStartDate } from "../utils/date-utils";
import { RootState } from "./";

// TODO schedule selectors
// ---------------------------------------------------------------------------
const selectSchedule = (state: RootState) => state.schedule.data;

const selectTrainingYear = (state: RootState, year: string) => state.schedule.data[year];

const selectTrainingWeekById = (state: RootState, year: string, weekId: string) => {
  const trainingYear = state.schedule.data[year];
  if (trainingYear === undefined) return undefined;
  return trainingYear.weeks.find(
    week => week.weekId === weekId
  );
}

const selectTrainingWeekByDate = (state: RootState, date: Date) => {
  const trainingYear = state.schedule.data[date.getFullYear()];
  if (trainingYear === undefined) return undefined;
  return trainingYear.weeks.find(
    week => week.weekStartDate.getTime() === getWeekStartDate(date).getTime()
  );
}

// TODO options selectors
// ---------------------------------------------------------------------------
const selectOptions = (state: RootState) => {
  return state.options.data;
}

const selectScheduleOptions = (state: RootState) => {
  return state.options.data.schedule;
}

const selectUIOptions = (state: RootState) => {
  return state.options.data.ui;
}


export {
  selectSchedule,
  selectTrainingYear,
  selectTrainingWeekById, selectTrainingWeekByDate,

  selectOptions, selectScheduleOptions, selectUIOptions
}