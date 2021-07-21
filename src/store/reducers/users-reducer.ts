import { Actions } from "../actions"
import { DataLoadingStatus } from "../state";
import { UsersModel } from "../types";

type UsersState = {
  status: DataLoadingStatus,
  error: string | null,
  data: UsersModel
}

const initialState: UsersState = {
  status: "idle",
  error: null,
  data: {}
}

const usersReducer = (oldState: UsersState = initialState, action: Actions): UsersState => {
  switch (action.type) {

    case "users/create":
      return {
        ...oldState,
        data: {
          ...oldState.data,
          [action.payload.createdUser.userId]: action.payload.createdUser
        }
      }

    default:
      return oldState;
  }
}

export type { UsersState };
export { usersReducer };