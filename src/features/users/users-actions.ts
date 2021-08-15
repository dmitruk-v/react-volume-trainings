import { UserModel, UsersModel } from "./users-types";

const usersCreateUserAction = (createdUser: UserModel) => {
  return {
    type: "users/create",
    payload: { createdUser }
  } as const;
}

const usersLoadAction = () => {
  return {
    type: "users/load",
    payload: {}
  } as const;
}

const usersLoadSucceededAction = (loadedUsers: UsersModel) => {
  return {
    type: "users/loadSucceeded",
    payload: { loadedUsers }
  } as const;
}

const usersLoadFailedAction = (error: string) => {
  return {
    type: "users/loadFailed",
    payload: { error }
  } as const;
}

const usersRemoveUserAction = (removedUser: UserModel) => {
  return {
    type: "users/remove",
    payload: { removedUser }
  } as const;
}

type UsersActions =
  | ReturnType<typeof usersCreateUserAction>
  | ReturnType<typeof usersLoadAction>
  | ReturnType<typeof usersLoadSucceededAction>
  | ReturnType<typeof usersLoadFailedAction>
  | ReturnType<typeof usersRemoveUserAction>;

export type { UsersActions };
export {
  usersCreateUserAction,
  usersLoadAction,
  usersLoadSucceededAction,
  usersLoadFailedAction,
  usersRemoveUserAction
}
