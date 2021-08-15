import { UserModel } from "../../features/users/users-types";

const selectedUserActivate = (user: UserModel | null) => {
  return {
    type: "selectedUser/activate",
    payload: { user }
  } as const;
}

type SelectedUserActions = ReturnType<typeof selectedUserActivate>;

export type { SelectedUserActions };
export {
  selectedUserActivate
}