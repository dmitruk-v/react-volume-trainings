import { RootState } from "../../store";
import { UserModel, UsersModel } from "./users-types";

const selectAllUsers = (state: RootState): UsersModel => {
  return state.users.data;
}

const selectUserById = (state: RootState, userId: string): UserModel | undefined => {
  return state.users.data[userId];
}

export { selectAllUsers, selectUserById }