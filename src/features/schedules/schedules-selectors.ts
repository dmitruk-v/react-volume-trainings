import { getWeekStartDate } from "../../shared/utils/date-utils";
import { RootState } from "../../store";
import { ScheduleModel, SchedulesModel, TrainingWeekModel, TrainingYearModel } from "./schedules-types";

const selectAllSchedules = (state: RootState): SchedulesModel => {
  return state.schedules.data;
};

const selectScheduleById = (state: RootState, scheduleId: string): ScheduleModel | undefined => {
  return state.schedules.data[scheduleId];
};

// const selectScheduleByUserId = (state: RootState, userId: string): ScheduleModel | undefined => {
//   const selectedUser = selectUserById(state, userId);
//   if (selectedUser === undefined) return;
//   return selectScheduleById(state, selectedUser.scheduleId);
// }

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

export {
  selectAllSchedules, selectScheduleById, selectTrainingYear, selectTrainingWeekById, selectTrainingWeekByDate,
  selectWeeksCount
}