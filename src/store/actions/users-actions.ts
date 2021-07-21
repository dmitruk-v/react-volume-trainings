import { UserModel } from "../types";

const usersCreateAction = (createdUser: UserModel) => {
  return {
    type: "users/create",
    payload: { createdUser }
  } as const;
}

type UsersActions =
  | ReturnType<typeof usersCreateAction>;

export type { UsersActions };
export {
  usersCreateAction
}
