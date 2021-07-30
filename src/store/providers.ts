import { LS_OPTIONS_KEY, LS_SCHEDULES_KEY, LS_USERS_KEY } from "../constants";
import { LocalStorageProvider } from "../providers";
import { AppOptionsModel, SchedulesModel, UsersModel } from "./types";

const schedulesDataProvider = LocalStorageProvider<SchedulesModel>(LS_SCHEDULES_KEY);
const optionsDataProvider = LocalStorageProvider<AppOptionsModel>(LS_OPTIONS_KEY);
const usersDataProvider = LocalStorageProvider<UsersModel>(LS_USERS_KEY);

export { schedulesDataProvider, optionsDataProvider, usersDataProvider }