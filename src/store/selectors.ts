import { getWeekStartDate } from "../utils/date-utils";
import { RootState } from "./";
import { ScheduleModel } from "./types";

// TODO schedule selectors
// ---------------------------------------------------------------------------
const selectSchedule = (state: RootState): ScheduleModel => state.schedule.data;

const selectTrainingYear = (state: RootState, year: string) => {
  return state.schedule.data.years[year];
}

const selectTrainingWeekById = (state: RootState, year: string, weekId: string) => {
  const trainingYear = state.schedule.data.years[year];
  if (trainingYear === undefined) return undefined;
  return trainingYear.weeks.find(
    week => week.weekId === weekId
  );
}

const selectTrainingWeekByDate = (state: RootState, date: Date) => {
  const trainingYear = state.schedule.data.years[date.getFullYear()];
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

// TODO users selectors
// ---------------------------------------------------------------------------
const selectUsers = (state: RootState) => {
  return state.users.data;
}

const selectUserById = (state: RootState, userId: string) => {
  return state.users.data[userId];
}


export {
  selectSchedule,
  selectTrainingYear,
  selectTrainingWeekById, selectTrainingWeekByDate,

  selectOptions, selectScheduleOptions, selectUIOptions,

  selectUsers, selectUserById,
}