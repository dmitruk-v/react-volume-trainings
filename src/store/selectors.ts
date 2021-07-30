import { getWeekStartDate } from "../utils/date-utils";
import { RootState } from "./";
import { AppOptionsModel, ScheduleModel, SchedulesModel, TrainingWeekModel, TrainingYearModel, UserModel, UsersModel } from "./types";

// TODO schedule selectors
// ---------------------------------------------------------------------------
const selectAllSchedules = (state: RootState): SchedulesModel => {
  return state.schedules.data;
};

const selectScheduleById = (state: RootState, scheduleId: string): ScheduleModel | undefined => {
  return state.schedules.data[scheduleId];
};

const selectScheduleByUserId = (state: RootState, userId: string): ScheduleModel | undefined => {
  const selectedUser = selectUserById(state, userId);
  if (selectedUser === undefined) return;
  return selectScheduleById(state, selectedUser.scheduleId);
}

const selectTrainingYear = (state: RootState, scheduleId: string, year: string): TrainingYearModel | undefined => {
  const selectedSchedule = selectScheduleById(state, scheduleId);
  if (selectedSchedule === undefined) return;
  return selectedSchedule.years[year];
}

const selectTrainingWeekById = (state: RootState, scheduleId: string, year: string, weekId: string): TrainingWeekModel | undefined => {
  const selectedYear = selectTrainingYear(state, scheduleId, year);
  if (selectedYear === undefined) return;
  return selectedYear.weeks.find(
    week => week.weekId === weekId
  );
}

const selectTrainingWeekByDate = (state: RootState, scheduleId: string, date: Date): TrainingWeekModel | undefined => {
  const selectedYear = selectTrainingYear(state, scheduleId, date.getFullYear().toString());
  if (selectedYear === undefined) return;
  return selectedYear.weeks.find(
    week => week.weekStartDate.getTime() === getWeekStartDate(date).getTime()
  );
}

const selectWeeksCount = (state: RootState, scheduleId: string, year: string): number | undefined => {
  const selectedYear = selectTrainingYear(state, scheduleId, year);
  if (selectedYear === undefined) return;
  return selectedYear.weeks.length;
}

// TODO options selectors
// ---------------------------------------------------------------------------
const selectAllOptions = (state: RootState): { [optionsId: string]: AppOptionsModel } => {
  return state.options.data;
}

const selectOptionsById = (state: RootState, optionsId: string): AppOptionsModel | undefined => {
  return state.options.data[optionsId];
}

const selectOptionsByUserId = (state: RootState, userId: string): AppOptionsModel | undefined => {
  const selectedUser = selectUserById(state, userId);
  if (selectedUser === undefined) return;
  return state.options.data[selectedUser.optionsId];
}

// TODO users selectors
// ---------------------------------------------------------------------------
const selectAllUsers = (state: RootState): UsersModel => {
  return state.users.data;
}

const selectUserById = (state: RootState, userId: string): UserModel | undefined => {
  return state.users.data[userId];
}

// TODO complex selectors
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

export {
  selectAllSchedules,
  selectScheduleById,
  selectScheduleByUserId,
  selectTrainingYear,
  selectTrainingWeekById, selectTrainingWeekByDate,
  selectWeeksCount,

  selectAllOptions,
  selectOptionsById,
  selectOptionsByUserId,

  selectAllUsers,
  selectUserById,
}