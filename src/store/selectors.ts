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

// TODO options selectors
// ---------------------------------------------------------------------------
const selectOptions = (state: RootState): AppOptionsModel => {
  return state.options.data;
}

const selectScheduleOptions = (state: RootState): AppOptionsModel["schedule"] => {
  return state.options.data.schedule;
}

const selectUIOptions = (state: RootState): AppOptionsModel["ui"] => {
  return state.options.data.ui;
}

// TODO users selectors
// ---------------------------------------------------------------------------
const selectUsers = (state: RootState): UsersModel => {
  return state.users.data;
}

const selectUserById = (state: RootState, userId: string): UserModel | undefined => {
  return state.users.data[userId];
}

// TODO complex selectors
// ---------------------------------------------------------------------------
const selectScheduleByUserId = (state: RootState, userId: string): ScheduleModel | undefined => {
  const selectedUser = selectUserById(state, userId);
  if (selectedUser === undefined) return;
  return selectScheduleById(state, selectedUser.scheduleId);
}
// ---------------------------------------------------------------------------

export {
  selectAllSchedules,
  selectScheduleById,
  selectTrainingYear,
  selectTrainingWeekById, selectTrainingWeekByDate,

  selectOptions, selectScheduleOptions, selectUIOptions,

  selectUsers, selectUserById,

  selectScheduleByUserId,
}