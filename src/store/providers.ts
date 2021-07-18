import { LS_OPTIONS_KEY, LS_SCHEDULE_KEY, LS_USERS_KEY } from "../constants";
import { LocalStorageProvider } from "../providers";
import { AppOptionsModel, ScheduleModel, UsersModel } from "./types";

const scheduleDataProvider = LocalStorageProvider<ScheduleModel>(LS_SCHEDULE_KEY);
const optionsDataProvider = LocalStorageProvider<AppOptionsModel>(LS_OPTIONS_KEY);
const usersDataProvider = LocalStorageProvider<UsersModel>(LS_USERS_KEY);

export { scheduleDataProvider, optionsDataProvider, usersDataProvider }